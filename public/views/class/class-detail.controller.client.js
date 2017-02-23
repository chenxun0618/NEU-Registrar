(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($location, $routeParams, ClassService, ScheduleService) {

        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;

        function init() {
            vm.crn = $routeParams.crn;
            vm.addClass = !vm.crn;
            vm.editClass = !!vm.crn;

            if (vm.editClass) {
                vm.class = ClassService.getClassByCRN(vm.crn); // find in session state instead for now
            } else {
                vm.class = {};
            }

            vm.allSubjectCodes = ClassService.getAllSubjectCodes();
            vm.allCRNs = ClassService.getAllCRNs();
            vm.currentTerm = ClassService.getCurrentTerm();
            vm.allStatuses = ClassService.getAllStatuses();
            vm.allPartOfTerms = ClassService.getAllPartOfTerms();
            vm.allInstructionalMethods = ClassService.getAllInstructionalMethods();
            vm.allMeetingDays = ClassService.getAllMeetingDays();
            vm.allCreditHours = ClassService.getAllCreditHours();
            vm.allCampuses = ClassService.getAllCampuses();
            vm.allSections = ClassService.getAllSections();
            vm.allWaitlist = ClassService.getAllWaitlist();
            vm.allDoNotPublish = ClassService.getAllDoNotPublish();
            vm.allSpecialApprovals = ClassService.getAllSpecialApprovals();

            timesOfDay = [];
            var count = 0;
            for (var x = 0; x < 2400; x += 5) {
                var str = ("000" + x);
                var str2 = str.slice(str.length - 4, str.length - 2) + ":" + str.slice(str.length - 2);
                timesOfDay[count] = str2;
                count++;
            }

            vm.allMeetingStartTimes = timesOfDay;
            vm.allMeetingEndTimes = timesOfDay;
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            // iterate through session state to find thing, or if add mode, append to end
            $location.url("/schedule-submission");
        }

        init();
    }
})();