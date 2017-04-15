(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($location, $window, $routeParams, ClassService, ScheduleService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.extractTargetAttributes = extractTargetAttributes;
        vm.differentFromLastYear = differentFromLastYear;
        vm.changeHonors = changeHonors;
        vm.isEqualMeetingTimes = ClassService.isEqualMeetingTimes;
        vm.getReadableMeetingTime = ClassService.getReadableMeetingTime;
        vm.getReadableMeetingTimes = ClassService.getReadableMeetingTimes;
        vm.getFormattedTime = ClassService.getFormattedTime;
        vm.scheduleViolatesPeakPeriodProperty = ScheduleService.scheduleViolatesPeakPeriodProperty;
        vm.toastMessage = toastMessage;

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

            if (!vm.loggedInUser) {
                $location.url("/login");
            } else {
                vm.schedule = JSON.parse($window.sessionStorage.schedule);
                vm.class = findClassInSessionState($routeParams.unique_id); // find in session state for now until I figure out how to pass the specified course to this controller

                vm.currentTerm = ClassService.getCurrentTerm();
                vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
                vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();
                vm.allStatuses = ClassService.getAllStatuses();

                ClassService.getDropdownValues()
                    .then(
                        function (res) {
                            vm.all = res.data;
                            vm.all.specialApprovals = [{code: '', desc: ''}].concat(vm.all.specialApprovals); // prepend empty option
                        },
                        function (error) {
                            vm.error = error.data ? error.data : error.statusText;
                        }
                    );

                ClassService.getAllInstructors()
                    .then(
                        function (res) {
                            vm.allInstructors = res.data;
                        },
                        function (error) {
                            vm.error = error.data ? error.data : error.statusText;
                        }
                    );
            }
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

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

        function findClassInSessionState(unique_id) {
            for (var x = 0; x < vm.schedule.classes.length; x++) {
                var current = vm.schedule.classes[x];
                if (current.metadata.unique_id === unique_id) {
                    current.sessionStateIndex = x;
                    return current;
                }
            }
        }

        function toastMessage(show) {
            var x = document.getElementById("toast");
            if (show) {
                x.className = "show";
                setTimeout(function () {
                    x.className = "";
                }, 6000);
            } else {
                x.className = "";
            }
        }

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

        function differentFromLastYear(attributes) {
            for (var x = 0; x < attributes.length; x++) {
                var attribute = attributes[x];
                if (vm.class[attribute].constructor === Array) {
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