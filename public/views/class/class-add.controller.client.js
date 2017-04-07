(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    function ClassAddController($location, $window, ClassService, ScheduleService) {
        var vm = this;
        vm.returnToSchedule = returnToSchedule;
        vm.saveAndReturnToSchedule = saveAndReturnToSchedule;
        vm.getCourseDataFromCatalog = getCourseDataFromCatalog;
        vm.isPeakPeriod = isPeakPeriod;
        vm.updateEndingTimes = updateEndingTimes;
        vm.updateOnChangeOfTime = updateOnChangeOfTime;
        vm.toastMessage = toastMessage;

        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

            if (!vm.loggedInUser || vm.loggedInUser.admin) {
                $location.url("/login");
            } else {
                vm.allSubjectCodes = ClassService.getAllSubjectCodes();
                vm.currentTerm = ClassService.getCurrentTerm();
                vm.allStatuses = ClassService.getAllStatuses();
                vm.allPartOfTerms = ClassService.getAllPartOfTerms();
                vm.allInstructionalMethods = ClassService.getAllInstructionalMethods();
                vm.allMeetingDays = ClassService.getAllMeetingDays();
                vm.allCreditHours = ClassService.getAllCreditHours();
                vm.allCampuses = ClassService.getAllCampuses();
                vm.allSections = ClassService.getAllSections();
                vm.allDoNotPublish = ClassService.getAllDoNotPublish();
                vm.allCancel = ClassService.getAllCancel();
                vm.allHonors = ClassService.getAllHonors();
                vm.allSpecialApprovals = ClassService.getAllSpecialApprovals();

                vm.allPrimaryInstructors = ClassService.getAllPrimaryInstructors();
                vm.allSecondaryInstructors = ClassService.getAllSecondaryInstructors();

                vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
                vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();
            }
        }

        function getCourseDataFromCatalog(subjectCode, courseNumber) {
            vm.reloaded = (vm.reloaded === undefined) ? false : true;
            if (!vm.reloaded) {
                vm.class = ClassService.getCourseDataFromCatalog(subjectCode, courseNumber);
                vm.class.old = angular.copy(vm.class);
            } else {
                vm.class = {}; // fix this bug: does not reload select2s
                vm.class = ClassService.getCourseDataFromCatalog(subjectCode, courseNumber);
                vm.class.old = angular.copy(vm.class);
            }
        }

        function returnToSchedule() {
            $location.url("/schedule-submission");
        }

        function saveAndReturnToSchedule() {
            var invalidClassReasons = ClassService.getInvalidClassReasons(vm.class);
            if (invalidClassReasons.length) {
                vm.error = invalidClassReasons.join("\n\n");
                $window.scrollTo(0, 0);
            } else {
                prepareAddedClass(vm.class);
                var schedule = JSON.parse($window.sessionStorage.schedule);
                schedule.push(vm.class);
                $window.sessionStorage.schedule = JSON.stringify(schedule);
                $location.url("/schedule-submission");
            }
        }

        function prepareAddedClass(aClass) {
            aClass.metadata = aClass.metadata || {};
            aClass.metadata.added = true;
            aClass.metadata.modified = ClassService.isClassModified(aClass);
            aClass.metadata.unique_id = ClassService.generateUniqueIdForClass(aClass);
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

        init();
    }
})();