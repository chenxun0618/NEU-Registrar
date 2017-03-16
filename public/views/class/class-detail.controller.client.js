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

            //this will be replaced with data from previous semester
            vm.allMeetingStartTimes = [];
            var count = 0;
            for (var x = 6; x < 22; x += 1) {
                for (var y = 0; y < 60; y += 5) {
                    var hour = ("0" + x).slice(-2);
                    var minute = ("0" + y).slice(-2);
                    vm.allMeetingStartTimes[count] = hour + ":" + minute;
                    count++;
                }
            }

            vm.allMeetingEndTimes = updateEndingTimes();
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

        function isPeakPeriod(time) {
            if (vm.class.meetingDays == "M" || vm.class.meetingDays == "W" || vm.class.meetingDays == "R" ||
                vm.class.meetingDays == "MW" || vm.class.meetingDays == "MWR") {
                if ((time.slice(0, 2) == 15 && time.slice(-2) <= 25) ||
                    (time.slice(0, 2) > 9 && time.slice(0, 2) < 15) ||
                    (time.slice(0, 2) == 9 && time.slice(-2) >= 15)) {
                    return 1;
                }
            }
            if (vm.class.meetingDays == "T" || vm.class.meetingDays == "F" || vm.class.meetingDays == "TF") {
                if ((time.slice(0, 2) == 15 && time.slice(-2) <= 25) ||
                    (time.slice(0, 2) > 9 && time.slice(0, 2) < 15) ||
                    (time.slice(0, 2) == 9 && time.slice(-2) >= 50)) {
                    return 1;
                }
            }
            return 0;
        }

        function updateEndingTimes() {
            var startTimeIdx = vm.allMeetingStartTimes.indexOf(vm.class.meetingStart);
            var classMinDuration = 30;
            var classMaxDuration = 180;
            vm.allMeetingEndTimes = vm.allMeetingStartTimes
                .slice(startTimeIdx + classMinDuration / 5, startTimeIdx + classMaxDuration / 5);
        }

        function updateOnChangeOfTime() {
            updateEndingTimes();
            vm.isPeakPeriod = isPeakPeriod(vm.class.meetingStart) || isPeakPeriod(vm.class.meetingEnd);
        }

        init();
    }
})();
