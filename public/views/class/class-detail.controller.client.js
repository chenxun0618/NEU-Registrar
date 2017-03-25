(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($location, $routeParams, ClassService, ScheduleService, $scope) {

        $scope.data = {
            model: 'myString',
            availableOptions: [
                {value: 'myString', name: 'string'},
                {value: 1, name: 'integer'},
                {value: true, name: 'boolean'},
                {value: {prop: 'value'}, name: 'object'},
                {value: ['a'], name: 'array'}
            ]
        };

        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;

        function init() {
            vm.crn = $routeParams.crn;
            vm.class = findClassInSessionState(vm.crn); // find in session state for now until I figure out how to pass the specified course to this controller

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

            vm.allPrimaryInstructors = ClassService.getAllPrimaryInstructors();
            vm.allSecondaryInstructors = ClassService.getAllSecondaryInstructors();

            vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
            vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            var schedule = JSON.parse(sessionStorage.schedule);
            schedule[vm.class.sessionStateIndex] = vm.class;
            sessionStorage.schedule = JSON.stringify(schedule);
            $location.url("/schedule-submission");
        }

        function findClassInSessionState(crn) {
            var schedule = JSON.parse(sessionStorage.schedule);
            for (var x = 0; x < schedule.length; x++) {
                var current = schedule[x];
                if (current.crn === crn) {
                    current.sessionStateIndex = x;
                    return current;
                }
            }
        }

        init();
    }
})();
