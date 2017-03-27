(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    function ClassAddController($location, ClassService, ScheduleService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.getMostRecentCourseData = getMostRecentCourseData;
        vm.isPeakPeriod = isPeakPeriod;
        vm.updateEndingTimes = updateEndingTimes;
        vm.updateOnChangeOfTime = updateOnChangeOfTime;
        vm.toastMessage = toastMessage;

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
                vm.class.old = angular.copy(vm.class);
            } else {
                vm.class = {}; // fix this bug: does not reload select2s
                vm.class = ClassService.getMostRecentCourseData(subjectCode, courseNumber);
                vm.class.old = angular.copy(vm.class);
            }
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            vm.class.metadata = vm.class.metadata || {};
            vm.class.metadata.added = true;
            vm.class.metadata.modified = ScheduleService.isClassModified(vm.class);
            var schedule = JSON.parse(sessionStorage.schedule);
            schedule.push(vm.class);
            sessionStorage.schedule = JSON.stringify(schedule);
            $location.url("/schedule-submission");
        }

        function toastMessage(show) {
            var x = document.getElementById("toast");
            if (show) {
                x.className = "show";
                setTimeout(function () {
                    x.className = "";
                }, 6000);
            } else {
                x.className = "";
            }
        }

        function isPeakPeriod(time) {
            var isPeakPeriod = 0;
            var x = document.getElementById("toast");
            if (vm.class.meetingDays === "M" || vm.class.meetingDays === "W" || vm.class.meetingDays === "R" ||
                vm.class.meetingDays === "MW" || vm.class.meetingDays === "MWR") {
                if ((time.slice(0, 2) == 15 && time.slice(-2) <= 25) ||
                    (time.slice(0, 2) > 9 && time.slice(0, 2) < 15) ||
                    (time.slice(0, 2) == 9 && time.slice(-2) >= 15)) {
                    isPeakPeriod = 1;
                }
            }
            if (vm.class.meetingDays === "T" || vm.class.meetingDays === "F" || vm.class.meetingDays === "TF") {
                if ((time.slice(0, 2) == 15 && time.slice(-2) <= 25) ||
                    (time.slice(0, 2) > 9 && time.slice(0, 2) < 15) ||
                    (time.slice(0, 2) == 9 && time.slice(-2) >= 50)) {
                    isPeakPeriod = 1;
                }
            }
            if (isPeakPeriod) {
                if (x.className !== "show")
                    toastMessage(1);
            }
            return isPeakPeriod;
        }

        function updateEndingTimes() {
            var startTimeIdx = vm.allMeetingStartTimes.indexOf(vm.class.meetingStart);
            var classMinDuration = 65;
            var classMaxDuration = 210;
            vm.allMeetingEndTimes = vm.allMeetingStartTimes
                .slice(startTimeIdx + classMinDuration / 5, startTimeIdx + classMaxDuration / 5 + 1);
        }

        function updateOnChangeOfTime(isMeetingStart) {
            if (isMeetingStart)
                updateEndingTimes();
            vm.isPeakPeriod = isPeakPeriod(vm.class.meetingStart) || isPeakPeriod(vm.class.meetingEnd);
        }

        init();
    }
})();