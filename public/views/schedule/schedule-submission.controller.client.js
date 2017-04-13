(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($location, $window, ClassService, ScheduleService) {
        var vm = this;

        vm.getScheduleDetail = getScheduleDetail;
        vm.saveSchedule = saveSchedule;
        vm.submitSchedule = submitSchedule;
        vm.rejectSchedule = rejectSchedule;
        vm.approveSchedule = approveSchedule;
        vm.navigateToClassDetail = navigateToClassDetail;
        vm.navigateToAddClass = navigateToAddClass;
        vm.getScheduleSummaryLine = getScheduleSummaryLine;
        vm.getScheduleStatusLine = getScheduleStatusLine;
        vm.getReadableMeetingTime = getReadableMeetingTime;
        vm.logout = logout;

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

            if (!vm.loggedInUser) {
                $location.url("/login/");
            } else {
                vm.allDepartments = vm.loggedInUser.depts;

                if ($window.sessionStorage.selectedDepartment) {
                    vm.selectedDepartment = JSON.parse($window.sessionStorage.selectedDepartment);
                    vm.schedule = JSON.parse($window.sessionStorage.schedule);
                }
            }
        }

        function getScheduleDetail(selectedDepartment) {
            var r = true;
            if (vm.schedule) {
                r = confirm("Are you sure you want to load new schedule? Unsaved progress will be lost.");
            }
            if (r == true || !vm.schedule) {
                ScheduleService.getScheduleDetail(selectedDepartment, vm.loggedInUser)
                    .then(
                        function (res) {
                            vm.schedule = res.data;
                            ScheduleService.preprocessSchedule(vm.schedule);
                        },
                        function (error) {
                            vm.error = error.data ? error.data : error.statusText;
                        }
                    );
            }
        }

        function saveSchedule() {
            if (vm.schedule && vm.schedule.classes) {
                ScheduleService.saveSchedule(vm.schedule);
            } else {
                vm.error = "No schedule found";
                $window.scrollTo(0, 0);
            }
        }

        function submitSchedule() {
            var r = confirm("Are you sure you want to submit this schedule?");
            if (r == true) {
                if (vm.schedule && vm.schedule.classes) {
                    ScheduleService.submitSchedule(vm.schedule);
                    $location.url("/submitted/");
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        function rejectSchedule() {
            var rejection_message = prompt("Enter a reason for the rejection (optional):", "");
            if (rejection_message !== null) {
                if (vm.schedule && vm.schedule.classes) {
                    ScheduleService.rejectSchedule(vm.schedule, rejection_message);
                    $window.sessionStorage.schedule = JSON.stringify(null);
                    $location.url("/schedule-submission/");
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        function approveSchedule() {
            var r = confirm("Are you sure you want to approve this schedule?");
            if (r == true) {
                if (vm.schedule && vm.schedule.classes) {
                    ScheduleService.approveSchedule(vm.schedule);
                    $window.sessionStorage.schedule = JSON.stringify(null);
                    $location.url("/schedule-submission/");
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        function navigateToClassDetail(unique_class_id) {
            $window.sessionStorage.selectedDepartment = JSON.stringify(vm.selectedDepartment);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-detail/" + unique_class_id);
        }

        function navigateToAddClass() {
            $window.sessionStorage.selectedDepartment = JSON.stringify(vm.selectedDepartment);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-add/");
        }

        function getScheduleSummaryLine(schedule) {
            if (!schedule.status) {
                return schedule.departmentCode;
            } else if (schedule.status === 'D') {
                return schedule.departmentCode + " (draft)";
            } else if (schedule.status === 'S') {
                return schedule.departmentCode + " (waiting approval)";
            } else if (schedule.status === 'R') {
                return schedule.departmentCode + " (rejected)";
            }
        }

        function getScheduleStatusLine(dept) {
            if (dept.scheduleStatus === 'D') {
                return "Last saved by " + dept.lastEditedBy + " on " + dept.lastEditTime;
            } else if (schedule.scheduleStatus === 'R') {
                return "Rejected by " + schedule.lastEditedBy + " on " + schedule.lastEditTime + " because: \n\n" + schedule.rejectionMessage;
            } else if (schedule.scheduleStatus === 'S') {
                return "Submitted by " + schedule.lastEditedBy + " on " + schedule.lastEditTime;
            }
        }

        function logout() {
            $window.sessionStorage.clear();
            $location.url("/login/");
        }

        function getReadableMeetingTime(aClass) {
            if (!aClass.meetingDays || !aClass.meetingBeginTime || !aClass.meetingEndTime) {
                return "(not found)";
            } else {
                return aClass.meetingDays + " " + getFormattedTime(aClass.meetingBeginTime) + "–" + getFormattedTime(aClass.meetingEndTime);
            }
        }

        function getFormattedTime(str) {
            var secondToLast = str.length - 2;
            return str.substring(0, secondToLast) + ":" + str.substring(secondToLast, str.length);
        }

        init();
    }
})();