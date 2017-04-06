(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    function ScheduleSubmissionController($location, $window, ClassService, ScheduleService) {
        var vm = this;

        vm.getScheduleForTerm = getScheduleForTerm;
        vm.saveSchedule = saveSchedule;
        vm.submitSchedule = submitSchedule;
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