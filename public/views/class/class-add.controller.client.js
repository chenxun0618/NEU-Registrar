(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    function ClassAddController($location, ClassService, ScheduleService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.getMostRecentCourseData = getMostRecentCourseData;

        function init() {
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
            vm.allCancel = ClassService.getAllCancel();
            vm.allHonors = ClassService.getAllHonors();
            vm.allSpecialApprovals = ClassService.getAllSpecialApprovals();

            vm.allPrimaryInstructors = ClassService.getAllPrimaryInstructors();
            vm.allSecondaryInstructors = ClassService.getAllSecondaryInstructors();

            vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
            vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();
        }

        function getMostRecentCourseData(subjectCode, courseNumber) {
            vm.reloaded = (vm.reloaded === undefined) ? false : true;
            if (!vm.reloaded) {
                vm.class = ClassService.getMostRecentCourseData(subjectCode, courseNumber);
            } else {
                vm.class = {}; // fix this bug: does not reload select2s
                vm.class = ClassService.getMostRecentCourseData(subjectCode, courseNumber);
            }
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            var schedule = JSON.parse(sessionStorage.schedule);
            schedule.push(vm.class);
            sessionStorage.schedule = JSON.stringify(schedule);
            $location.url("/schedule-submission");
        }

        init();
    }
})();
