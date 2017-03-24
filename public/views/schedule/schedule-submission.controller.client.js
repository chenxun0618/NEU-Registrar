(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($location, $routeParams, ClassService, ScheduleService) {
        var vm = this;

        vm.getScheduleForTerm = getScheduleForTerm;
        vm.submitSchedule = submitSchedule;
        vm.navigateToClassDetail = navigateToClassDetail;

        function init() {
            vm.subjectCodes = ClassService.getAllSubjectCodes();
            vm.submittedSchedules = ClassService.getAllSubmittedSchedules();

            if (sessionStorage.selectedTerm) {
                vm.selectedTerm = JSON.parse(sessionStorage.selectedTerm);
                vm.schedule = JSON.parse(sessionStorage.schedule);
            }
        }

        function getScheduleForTerm(term) {
            vm.schedule = ScheduleService.getScheduleByTerm(term);
        }

        function submitSchedule() {
            var r = confirm("Are you sure you want to submit this schedule?");
            if (r == true) {
                ScheduleService.submitSchedule(vm.schedule);
            }
        }

        function navigateToClassDetail(crn) {
            sessionStorage.selectedTerm = JSON.stringify(vm.selectedTerm);
            sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-detail/" + (crn ? crn : "_"));
        }

        init();
    }
})();