(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($location, $window, ClassService, ScheduleService) {
        var vm = this;

        vm.getScheduleForTerm = getScheduleForTerm;
        vm.saveSchedule = saveSchedule;
        vm.submitSchedule = submitSchedule;
        vm.rejectSchedule = rejectSchedule;
        vm.approveSchedule = approveSchedule;
        vm.navigateToClassDetail = navigateToClassDetail;
        vm.navigateToAddClass = navigateToAddClass;

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

            if (!vm.loggedInUser) {
                $location.url("/login");
            } else {
                vm.subjectCodes = ClassService.getAllSubjectCodes();
                vm.schedules = ScheduleService.getAllSchedules();

                if ($window.sessionStorage.selectedTerm) {
                    vm.selectedTerm = JSON.parse($window.sessionStorage.selectedTerm);
                    vm.schedule = JSON.parse($window.sessionStorage.schedule);
                }
            }
        }

        function getScheduleForTerm(term) {
            var r = true;
            if (vm.schedule) {
                r = confirm("Are you sure you want to load new schedule? You will lose your progress.");
            }
            if (r == true || !vm.schedule) {
                vm.schedule = ScheduleService.getScheduleByTerm(term);
            }
        }

        function saveSchedule() {
            ScheduleService.saveSchedule(vm.schedule);
        }

        function submitSchedule() {
            var r = confirm("Are you sure you want to submit this schedule?");
            if (r == true) {
                ScheduleService.submitSchedule(vm.schedule);
                $window.sessionStorage.clear();
                $location.url("/submitted/");
            }
        }

        function rejectSchedule() {
            var rejection_message = prompt("Enter a reason for the rejection (optional):", "");
            if (rejection_message !== null) {
                ScheduleService.rejectSchedule(vm.schedule, rejection_message);
                $window.sessionStorage.schedule = JSON.stringify(null);
                $location.url("/schedule-submission/");
            }
        }

        function approveSchedule() {
            var r = confirm("Are you sure you want to approve this schedule?");
            if (r == true) {
                ScheduleService.approveSchedule(vm.schedule);
                $window.sessionStorage.schedule = JSON.stringify(null);
                $location.url("/schedule-submission/");
            }
        }

        function navigateToClassDetail(unique_class_id) {
            $window.sessionStorage.selectedTerm = JSON.stringify(vm.selectedTerm);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-detail/" + unique_class_id);
        }

        function navigateToAddClass() {
            $window.sessionStorage.selectedTerm = JSON.stringify(vm.selectedTerm);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-add/");
        }

        init();
    }
})();