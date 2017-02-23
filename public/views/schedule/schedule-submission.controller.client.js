(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($routeParams, ClassService, ScheduleService) {
        var vm = this;

        function init() {
            vm.schedule = ScheduleService.getScheduleByTerm();
        }

        init();
    }
})();