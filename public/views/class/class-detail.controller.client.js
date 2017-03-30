(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($location, $routeParams, ClassService, ScheduleService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.isPeakPeriod = isPeakPeriod;
        vm.updateEndingTimes = updateEndingTimes;
        vm.updateOnChangeOfTime = updateOnChangeOfTime;
        vm.toastMessage = toastMessage;
        vm.arraysEqual = arraysEqual;
        vm.instructorNamesFromNuids = instructorNamesFromNuids;

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
            vm.allCancel = ClassService.getAllCancel();
            vm.allHonors = ClassService.getAllHonors();
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
            vm.class.metadata = vm.class.metadata || {};
            vm.class.metadata.modified = ScheduleService.isClassModified(vm.class);
            vm.class.metadata.deleted = (vm.class.cancel === "Y");

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

        function isPeakPeriod(day, time) {
            var isPeakPeriod = 0;
            var x = document.getElementById("toast");
            if (day === "M" || day === "W" || day === "R" ||
                day === "MW" || day === "MWR") {
                if ((time.slice(0, 2) == 15 && time.slice(-2) <= 25) ||
                    (time.slice(0, 2) > 9 && time.slice(0, 2) < 15) ||
                    (time.slice(0, 2) == 9 && time.slice(-2) >= 15)) {
                    isPeakPeriod = 1;
                }
            }
            if (day === "T" || day === "F" || day === "TF") {
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
            vm.isPeakPeriod = isPeakPeriod(vm.class.meetingDays, vm.class.meetingStart) ||
                isPeakPeriod(vm.class.meetingDays, vm.class.meetingEnd);
        }

        function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }

        function instructorNamesFromNuids(instructors, nuids) {
            var names = [];
            for (var x = 0; x < nuids.length; x++) {
                var instructorNuid = nuids[x];
                for (var y = 0; y < instructors.length; y++) {
                    if (instructorNuid === instructors[y].nuid) {
                        names.push(instructors[y].name);
                    }
                }
            }

            if (names.length === 0) {
                return "(none)";
            } else if (names.length == 1) {
                return names[0];
            } else {
                return names;
            }
        }

        init();
    }
})();