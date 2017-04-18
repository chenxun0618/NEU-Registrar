(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    // controller for the "Class Detail" page. When user and schedule are in appropriate state, the page is
    // full of dropdowns and input fields; otherwise the fields are display-only, no edits can be made
    function ClassDetailController($location, $window, $routeParams, ClassService, ScheduleService, UserService) {
        var vm = this;

        // functions used in view
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.extractTargetAttributes = extractTargetAttributes;
        vm.differentFromLastYear = differentFromLastYear;
        vm.isEqualMeetingTimes = ClassService.isEqualMeetingTimes;
        vm.getReadableMeetingTime = ClassService.getReadableMeetingTime;
        vm.getReadableMeetingTimes = ClassService.getReadableMeetingTimes;
        vm.scheduleViolatesPeakPeriodProperty = ScheduleService.scheduleViolatesPeakPeriodProperty;
        vm.toastMessage = toastMessage;

        // load initial data for edit class page
        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser || null);

            if (!vm.loggedInUser) {
                $location.url("/login");
            } else {
                $window.scrollTo(0, 0);
                vm.schedule = JSON.parse($window.sessionStorage.schedule);
                vm.selectedDepartment = JSON.parse($window.sessionStorage.selectedDepartment);
                vm.class = findClassInSessionState($routeParams.unique_id); // find in session state for now TODO set active class in ClassService or UserService
                vm.userCanEditSchedule = UserService.userCanEditSchedule(vm.loggedInUser, vm.selectedDepartment.status);

                ClassService.getDropdownValues()
                    .then(
                        function (res) {
                            vm.all = res.data;
                            vm.all.specialApprovals = [{code: '', desc: ''}].concat(vm.all.specialApprovals); // prepend empty option
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                        }
                    );

                vm.allStatuses = ClassService.getAllStatuses();
            }
        }

        // return to schedule page without saving edits
        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        // save edits and return to schedule
        function saveAndReturnToSchedule() {
            var invalidClassReasons = ClassService.getInvalidClassReasons(vm.class);
            if (invalidClassReasons.length) {
                vm.error = invalidClassReasons.join("\n\n");
                $window.scrollTo(0, 0);
            } else {
                vm.class.metadata = vm.class.metadata || {};
                vm.class.metadata.modified = ClassService.isClassModified(vm.class);
                vm.class.metadata.deleted = (vm.class.status === "C");
                vm.class.metadata.modifiedInSession = true;

                vm.schedule.classes[vm.class.sessionStateIndex] = vm.class;
                $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
                $location.url("/schedule-submission");
            }
        }

        // TODO remove this and keep track of active class in ClassService or UserService
        function findClassInSessionState(unique_id) {
            for (var x = 0; x < vm.schedule.classes.length; x++) {
                var current = vm.schedule.classes[x];
                if (current.metadata.unique_id === unique_id) {
                    current.sessionStateIndex = x;
                    return current;
                }
            }
        }

        // if input is truthy, show peak period toast message at bottom of screen
        function toastMessage(show) {
            var x = document.getElementById("toast");
            if (show) {
                x.classList.add("show");
                setTimeout(function () {
                    x.classList.remove("show");
                }, 6000);
            } else {
                x.classList.remove("show");
            }
        }

        // e.g.
        // targetAttribute: 'desc'
        // sourceAttribute: 'code'
        // allData: [{code: 'A', desc: 'Hello World'}, {code: 'B', desc: 'Goodbye'}, {code: 'C', desc: 'FooBar'}]
        // localData: ['B', 'C']
        // output: ['Goodbye', 'FooBar']
        function extractTargetAttributes(targetAttribute, sourceAttribute, allData, localData) {
            if (!allData || !localData) {
                return null;
            }

            var targetData = [];
            for (var x = 0; x < localData.length; x++) {
                var localDataSourceAttribute = localData[x];
                for (var y = 0; y < allData.length; y++) {
                    if (localDataSourceAttribute === allData[y][sourceAttribute]) {
                        targetData.push(allData[y][targetAttribute]);
                    }
                }
            }

            if (targetData.length === 0) {
                return "(none)";
            } else if (targetData.length == 1) {
                return targetData[0];
            } else {
                return targetData.join(", ");
            }
        }

        // given an array of attribute names, determines whether those attributes in the current class
        // differ from the copy of the original data stored in the 'old' property of the current class
        // if no 'old' property, returns false
        function differentFromLastYear(attributes) {
            for (var x = 0; x < attributes.length; x++) {
                var attribute = attributes[x];
                if (vm.class[attribute] && vm.class[attribute].constructor === Array) {
                    if (vm.class.old && !arraysEqual(vm.class[attribute], vm.class.old[attribute])) {
                        return true;
                    }
                } else {
                    if (vm.class.old && vm.class[attribute] !== vm.class.old[attribute]) {
                        return true;
                    }
                }
            }
            return false;
        }

        init();
    }
})();