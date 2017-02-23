(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($routeParams, ClassService, ScheduleService) {
        var vm = this;

        vm.deleteClass = deleteClass;

        function init() {
            vm.schedule = ScheduleService.getScheduleByTerm();
        }

        function deleteClass(classToDelete) {

            var r = confirm("Are you sure you want to remove this class from this schedule?");
            if (r == true) {
                for (var x = 0; x < vm.schedule.length; x++) {
                    if (vm.schedule[x].crn === classToDelete.crn) {
                        vm.schedule.splice(x, 1);
                        return;
                    }
                }
            }
        }

        init();
    }
})();