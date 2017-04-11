(function () {
    angular
        .module("NEURegistrar")
        .controller("ClassAddController", ClassAddController);

    function ClassAddController($location, $window, ClassService) {
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
                vm.allMeetingDays = ClassService.getAllMeetingDays();
                vm.allMeetingStartTimes = ClassService.getAllTimeIntervals();
                vm.allMeetingEndTimes = ClassService.getAllTimeIntervals();
                vm.allSpecialApprovals = ClassService.getAllSpecialApprovals();
                vm.yesOrNo = ClassService.getYesOrNo();

                ClassService.getDropdownValues()
                    .then(
                        function (res) {
                            vm.all = res.data;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );

                ClassService.getAllInstructors()
                    .then(
                        function (res) {
                            vm.allInstructors = res.data;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function getCourseDataFromCatalog(subjectCode, courseNumber) {
            if (!(/^\d{4}$/.test(courseNumber))) { // 4 digit number
                vm.error = "Invalid course number"
            } else {
                vm.class = ClassService.getCourseDataFromCatalog(subjectCode, courseNumber);
                vm.error = "";
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
            if (!day || !time) {
                return false;
            }
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
            var startTimeIdx = vm.allMeetingStartTimes.indexOf(vm.class.meetingBeginTime);
            var classMinDuration = 65;
            var classMaxDuration = 210;
            vm.allMeetingEndTimes = vm.allMeetingStartTimes
                .slice(startTimeIdx + classMinDuration / 5, startTimeIdx + classMaxDuration / 5 + 1);
        }

        function updateOnChangeOfTime(isMeetingStart) {
            if (isMeetingStart)
                updateEndingTimes();
            vm.isPeakPeriod = isPeakPeriod(vm.class.meetingDays, vm.class.meetingBeginTime) ||
                isPeakPeriod(vm.class.meetingDays, vm.class.meetingEndTime);
        }

        init();
    }
})();