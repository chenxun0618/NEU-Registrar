(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    function ClassAddController($location, $window, ClassService, UserService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.getCourseDataFromCatalog = getCourseDataFromCatalog;
        vm.getReadableMeetingTime = ClassService.getReadableMeetingTime;
        vm.toastMessage = toastMessage;

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser || null);
            vm.selectedDepartment = JSON.parse($window.sessionStorage.selectedDepartment);
            vm.schedule = JSON.parse($window.sessionStorage.schedule);

            if (!UserService.userCanEditSchedule(vm.loggedInUser, vm.selectedDepartment.status)) {
                $location.url("/login");
            } else {
                ClassService.getAllSubjectCodesInDept(vm.selectedDepartment.departmentCode)
                    .then(
                        function (res) {
                            vm.allSubjectCodesInDept = res.data.subjectCodes;
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                        }
                    );
                vm.currentTerm = ClassService.getCurrentTerm();
                vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
                vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();

                ClassService.getDropdownValues()
                    .then(
                        function (res) {
                            vm.all = res.data;
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                        }
                    );

                ClassService.getAllInstructors()
                    .then(
                        function (res) {
                            vm.allInstructors = res.data;
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                        }
                    );
            }
        }

        function getCourseDataFromCatalog(subjectCode, courseNumber) {
            if (!subjectCode) {
                vm.error = "Must supply subject code";
            } else if (!(/^\d{4}$/.test(courseNumber))) { // 4 digit number
                vm.error = "Invalid course number";
            } else {
                vm.error = "";

                ClassService.getCourseDataFromCatalog(subjectCode, courseNumber)
                    .then(
                        function (res) {
                            // server should return better value if no data found... TODO
                            if (res.data === "null") {
                                vm.error = "Class not found";
                            } else {
                                vm.class = {};
                                vm.class.termCode = res.data.termCode;
                                vm.class.subjectCode = res.data.subjectCode;
                                vm.class.courseNumber = res.data.courseNumber;
                                vm.class.courseTitle = res.data.title;
                                ClassService.fillDefaultData(vm.class, vm.schedule);
                            }
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
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
                prepareAddedClass(vm.class);
                vm.schedule.classes.push(vm.class);
                $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
                $location.url("/schedule-submission");
            }
        }

        function prepareAddedClass(aClass) {
            aClass.metadata = aClass.metadata || {};
            aClass.metadata.added = true;
            aClass.metadata.unique_id = ClassService.generateUniqueIdForClass(aClass);
        }

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

        init();
    }
})();