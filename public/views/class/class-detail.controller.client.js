(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($location, $routeParams, ClassService, ScheduleService) {

        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;

        function init() {
            if ($routeParams.crn === "_") {
                $routeParams.crn = "";
            }
            vm.crn = $routeParams.crn;
            vm.addClass = !vm.crn;
            vm.editClass = !!vm.crn;

            if (vm.editClass) {
                vm.class = findClassInSessionState(vm.crn); // find in session state instead for now
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
            vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
            vm.allMeetingEndTimes = vm.allMeetingStartTimes;
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            var schedule = JSON.parse(sessionStorage.schedule);
            if (vm.addClass) {
                vm.class.crn = "" + Math.floor(Math.random() * 10000); // dummy for now
                schedule.push(vm.class);
            } else {
                editOldClass(schedule[vm.class.sessionStateIndex], vm.class);
            }
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

        function editOldClass(oldClass, newClass) {
            oldClass.meetingDays = newClass.meetingDays;
            oldClass.meetingStart = newClass.meetingStart;
            oldClass.meetingEnd = newClass.meetingEnd;
        }

        init();
    }
})();