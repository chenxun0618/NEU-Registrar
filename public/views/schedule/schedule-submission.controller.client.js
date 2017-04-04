(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($location, ClassService, ScheduleService) {
        var vm = this;

        vm.getScheduleForTerm = getScheduleForTerm;
        vm.saveSchedule = saveSchedule;
        vm.submitSchedule = submitSchedule;
        vm.navigateToClassDetail = navigateToClassDetail;
        vm.navigateToAddClass = navigateToAddClass;

        function init() {
            vm.subjectCodes = ClassService.getAllSubjectCodes();
            vm.schedules = ScheduleService.getAllSchedules();

            if (sessionStorage.selectedTerm) {
                vm.selectedTerm = JSON.parse(sessionStorage.selectedTerm);
                vm.schedule = JSON.parse(sessionStorage.schedule);
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
                sessionStorage.clear();
                $location.url("/submitted/");
            }
        }

        function navigateToClassDetail(unique_class_id) {
            sessionStorage.selectedTerm = JSON.stringify(vm.selectedTerm);
            sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-detail/" + unique_class_id);
        }

        function navigateToAddClass() {
            sessionStorage.selectedTerm = JSON.stringify(vm.selectedTerm);
            sessionStorage.schedule = JSON.stringify(vm.schedule);
            $location.url("/class-add/");
        }

        init();
    }
})();