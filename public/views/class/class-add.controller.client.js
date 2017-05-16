(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    // controller for the "Add Class" page, which is only accessible to non-admins
    function ClassAddController($location, $window, ClassService, UserService) {
        var vm = this;

        // functions used in view
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.getCourseDataFromCatalog = getCourseDataFromCatalog;
        vm.getReadableMeetingTime = ClassService.getReadableMeetingTime;
        vm.toastMessage = toastMessage;

        // load initial data for add class page
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
            }
        }

        // load misc. course data, e.g. title, for specified course, if it exists
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
                            // TODO server should return better value if no data found
                            if (!res.data.title) {
                                vm.error = "Class not found";
                            } else {
                                vm.class = {};
                                vm.class.termCode = res.data.termCode;
                                vm.class.collegeCode = res.data.collegeCode;
                                vm.class.departmentCode = res.data.departmentCode;
                                vm.class.subjectCode = res.data.subjectCode;
                                vm.class.courseNumber = res.data.courseNumber;
                                vm.class.courseTitle = res.data.title;
                                vm.class.billingHourHigh = (res.data.billingHourHigh === null) ? null : parseFloat(res.data.billingHourHigh);
                                vm.class.billingHourLow = parseFloat(res.data.billingHourLow);
                                vm.class.billingHours = vm.class.billingHourLow;
                                vm.class.creditHourHigh = (res.data.creditHourHigh === null) ? null : parseFloat(res.data.creditHourHigh);
                                vm.class.creditHourLow = parseFloat(res.data.creditHourLow);
                                vm.class.creditHours = vm.class.creditHourLow;
                                ClassService.fillDefaultData(vm.class, vm.schedule);
                            }
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                        }
                    );
            }
        }

        // return to schedule page without adding class
        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        // add class to schedule and return to schedule page
        function saveAndReturnToSchedule() {
            var invalidClassReasons = ClassService.getInvalidClassReasons(vm.class);
            if (invalidClassReasons.length) {
                vm.error = invalidClassReasons.join("\n\n");
                $window.scrollTo(0, 0);
            } else {
                prepareAddedClass(vm.class);
                for (var i = 0; i < vm.schedule.classes.length; i++) {
                    if (i === vm.schedule.classes.length - 1) {
                        vm.schedule.classes.push(vm.class);
                        break;
                    }
                    else if (vm.schedule.classes[i + 1].courseNumber > vm.class.courseNumber) {
                        vm.schedule.classes.splice(i + 1, 0, vm.class);
                        break;
                    }
                }
                $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
                $location.url("/schedule-submission");
            }
        }

        // add necessary metadata to class before adding it to schedule
        function prepareAddedClass(aClass) {
            aClass.metadata = aClass.metadata || {};
            aClass.metadata.added = true;
            aClass.metadata.unique_id = ClassService.generateUniqueIdForClass(aClass);
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

        init();
    }
})();
