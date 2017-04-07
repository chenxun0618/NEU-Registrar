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

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

            if (!vm.loggedInUser) {
                $location.url("/login");
            } else {
                vm.subjectCodes = ClassService.getAllSubjectCodes();
                vm.schedules = ScheduleService.getAllSchedules();

                if ($window.sessionStorage.selectedSchedule) {
                    vm.selectedSchedule = JSON.parse($window.sessionStorage.selectedSchedule);
                    vm.schedule = JSON.parse($window.sessionStorage.schedule);
                }
            }
        }

        function getScheduleDetail(selectedSchedule) {
            var r = true;
            if (vm.schedule) {
                r = confirm("Are you sure you want to load new schedule? Unsaved progress will be lost.");
            }
            if (r == true || !vm.schedule) {
                vm.schedule = ScheduleService.getScheduleDetail(selectedSchedule);
                vm.error = "";
            }
        }

        function saveSchedule() {
            if (vm.schedule && vm.schedule.length) {
                ScheduleService.saveSchedule(vm.schedule);
            } else {
                vm.error = "No schedule found";
                $window.scrollTo(0, 0);
            }
        }

        function submitSchedule() {
            var r = confirm("Are you sure you want to submit this schedule?");
            if (r == true) {
                if (vm.schedule && vm.schedule.length) {
                    ScheduleService.submitSchedule(vm.schedule);
                    $window.sessionStorage.clear();
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
                if (vm.schedule && vm.schedule.length) {
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
                if (vm.schedule && vm.schedule.length) {
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
            $window.sessionStorage.selectedSchedule = JSON.stringify(vm.selectedSchedule);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-detail/" + unique_class_id);
        }

        function navigateToAddClass() {
            $window.sessionStorage.selectedSchedule = JSON.stringify(vm.selectedSchedule);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-add/");
        }

        function getScheduleSummaryLine(schedule) {
            if (!schedule.status) {
                return schedule.departmentCode + " (" + schedule.term_readable + ")";
            } else if (schedule.status === 'D') {
                return schedule.departmentCode + " (" + schedule.term_readable + ") (draft)";
            } else if (schedule.status === 'S') {
                return schedule.departmentCode + " (" + schedule.term_readable + ") (waiting approval)";
            } else if (schedule.status === 'R') {
                return schedule.departmentCode + " (" + schedule.term_readable + ") (rejected)";
            }
        }

        function getScheduleStatusLine(schedule) {
            if (schedule.status === 'D') {
                return "Last saved by " + schedule.last_modifying_user_name + " on " + schedule.timestamp;
            } else if (schedule.status === 'R') {
                return "Rejected by " + schedule.last_modifying_user_name + " on " + schedule.timestamp + " because: \n\n" + schedule.rejection_message;
            } else if (schedule.status === 'S') {
                return "Submitted by " + schedule.last_modifying_user_name + " on " + schedule.timestamp;
            }
        }

        init();
    }
})();