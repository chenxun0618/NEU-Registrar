(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($routeParams, ClassService, ScheduleService) {

        var vm = this;

        function init() {
            vm.crn = $routeParams.crn;
            vm.addClass = !vm.crn;
            vm.editClass = !!vm.crn;

            if (vm.editClass) {
                vm.class = ClassService.getClassByCRN(vm.crn);
            } else {
                vm.class = {};
            }

            vm.allSubjectCodes = ClassService.getAllSubjectCodes();
            vm.allCRNs = ClassService.getAllCRNs();
            vm.currentTerm = ClassService.getCurrentTerm();
            vm.allStatuses = ClassService.getAllStatuses();
            vm.allPartOfTerms = ClassService.getAllPartOfTerms();
            vm.allInstructionalMethods = ClassService.getAllInstructionalMethods();
            vm.allCreditHours = ClassService.getAllCreditHours();
            vm.campus = ClassService.getCampus();
            vm.allSections = ClassService.getAllSections();
            vm.allWaitlist = ClassService.getAllWaitlist();
            vm.allDoNotPublish = ClassService.getAllDoNotPublish();
            vm.allSpecialApprovals = ClassService.getAllSpecialApprovals();
        }

        init();
    }
})();