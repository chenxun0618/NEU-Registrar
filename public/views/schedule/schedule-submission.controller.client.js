(function () {
    angular
        .module("NEURegistrar")
        .controller("ScheduleSubmissionController", ScheduleSubmissionController);

    // controller for the Schedule Submission page (main page). schedule cannot be saved/submitted/rejected/approved
    // unless user and schedule are in the appropriate states.
    function ScheduleSubmissionController($location, $window, ClassService, ScheduleService, UserService, $timeout) {
        var vm = this;

        // functions used in view
        vm.getScheduleDetail = getScheduleDetail;
        vm.saveSchedule = saveSchedule;
        vm.submitSchedule = submitSchedule;
        vm.rejectSchedule = rejectSchedule;
        vm.approveSchedule = approveSchedule;
        vm.navigateToClassDetail = navigateToClassDetail;
        vm.navigateToAddClass = navigateToAddClass;
        vm.getScheduleGroupName = getScheduleGroupName;
        vm.getScheduleStatusLine = getScheduleStatusLine;
        vm.getReadableMeetingTimes = ClassService.getReadableMeetingTimes;
        vm.shouldDisableSchedule = shouldDisableSchedule;
        vm.logout = logout;
        vm.toastMessage = toastMessage;

        // load initial data for schedule submission page
        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser || null);
            clearStatusMessages();

            if (!vm.loggedInUser) {
                $location.url("/login/");
            } else {
                if ($window.sessionStorage.selectedDepartment) {
                    vm.loadingSchedule = true;
                    vm.selectedDepartment = JSON.parse($window.sessionStorage.selectedDepartment);
                    vm.schedule = JSON.parse($window.sessionStorage.schedule);
                    vm.filterText = JSON.parse($window.sessionStorage.filterText || "");
                    vm.loadingSchedule = false;
                    vm.userCanEditSchedule = UserService.userCanEditSchedule(vm.loggedInUser, vm.selectedDepartment.status);
                    $timeout(function () {
                        $window.scrollTo(0, JSON.parse($window.sessionStorage.previousScrollPosition || 0));
                    });
                }
            }
        }

        // asks user if they want to load a new schedule
        function getScheduleDetail() {
            clearStatusMessages();

            var r = true;
            if (vm.schedule) {
                r = confirm("Are you sure you want to load new schedule? Unsaved progress will be lost.");
            }
            if (r == true || !vm.schedule) {
                loadSchedule();
            }
        }

        // loads the selected schedule (vm.selectedDepartment) from the database, throwing away the old one
        function loadSchedule() {
            delete vm.schedule;
            vm.loadingSchedule = true;
            var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
            ScheduleService.getScheduleDetail(vm.selectedDepartment.departmentCode, vm.loggedInUser.admin)
                .then(
                    function (res) {
                        vm.schedule = res.data;
                        ScheduleService.preprocessSchedule(vm.schedule);
                        vm.loadingSchedule = false;
                        vm.userCanEditSchedule = UserService.userCanEditSchedule(vm.loggedInUser, vm.selectedDepartment.status);

                        $timeout(function () {
                            $window.scrollTo(0, scrollPos);
                        });
                    },
                    function (error) {
                        vm.error = error.data || error.statusText;
                        vm.loadingSchedule = false;
                    }
                );
        }

        // saves the current state of the schedule to the database
        function saveSchedule() {
            clearStatusMessages();
            if (vm.schedule) {
                ScheduleService.saveSchedule(vm.loggedInUser.nuid, vm.selectedDepartment.departmentCode, vm.schedule)
                    .then(
                        function (res) {
                            if (!res.data) {
                                changeStatusOfSchedule(vm.selectedDepartment.departmentCode, 'D');
                                loadSchedule(vm.selectedDepartment); // TODO may not want to reload entire schedule
                                toastMessage(true);
                            } else { // merge needed
                                // TODO merge classes
                                vm.error = "Someone else worked on this schedule while you were. Their changes have been merged into yours. Please save again when ready.";
                                $window.scrollTo(0, 0);
                            }
                        },
                        function (error) {
                            vm.error = error.data || error.statusText;
                            $window.scrollTo(0, 0);
                        }
                    );
            } else {
                vm.error = "No schedule found";
                $window.scrollTo(0, 0);
            }
        }

        // submits the current schedule to the database
        function submitSchedule() {
            var r = confirm("Are you sure you want to submit this schedule? This action is final.");
            if (r == true) {
                clearStatusMessages();
                if (vm.schedule) {
                    ScheduleService.submitSchedule(vm.loggedInUser.nuid, vm.selectedDepartment.departmentCode, vm.schedule)
                        .then(
                            function (res) {
                                if (!res.data) {
                                    changeStatusOfSchedule(vm.selectedDepartment.departmentCode, 'S');
                                    clearSelectedDepartmentAndSchedule();
                                    $window.scrollTo(0, 0);
                                    vm.success = "Schedule submitted!";
                                } else {
                                    // merge classes TODO
                                    vm.error = "Someone else worked on this schedule while you were. Their changes have been merged into yours. Please resubmit when ready.";
                                    $window.scrollTo(0, 0);
                                }
                            },
                            function (error) {
                                vm.error = error.data || error.statusText;
                                $window.scrollTo(0, 0);
                            }
                        );
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        // goes through all user's editable departments and manually alters the status to reflect the given status
        function changeStatusOfSchedule(departmentCode, newStatus) {
            vm.selectedDepartment.status = newStatus;
            for (var x = 0; x < vm.loggedInUser.depts.length; x++) {
                if (vm.loggedInUser.depts[x].departmentCode === departmentCode) {
                    vm.loggedInUser.depts[x].status = newStatus;
                    return;
                }
            }
        }

        // deletes sessionStorage entries for the currently selected department and the current schedule
        function clearSelectedDepartmentAndSchedule() {
            delete vm.selectedDepartment;
            $window.sessionStorage.removeItem("selectedDepartment");
            delete vm.schedule;
            $window.sessionStorage.removeItem("schedule");
        }

        // rejects the current schedule, prompting the admin for a rejection message
        function rejectSchedule() {
            var rejection_message = prompt("Enter a reason for the rejection (optional):", "");
            if (rejection_message !== null) {
                clearStatusMessages();
                if (vm.schedule) {
                    ScheduleService.rejectSchedule(vm.selectedDepartment.departmentCode, rejection_message)
                        .then(
                            function (res) {
                                changeStatusOfSchedule(vm.selectedDepartment.departmentCode, 'R');
                                clearSelectedDepartmentAndSchedule();
                                $window.scrollTo(0, 0);
                                vm.success = "Schedule rejected!";
                            },
                            function (error) {
                                vm.error = error.data || error.statusText;
                                $window.scrollTo(0, 0);
                            }
                        );
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        // approves the current schedule (admin only)
        function approveSchedule() {
            var r = confirm("Are you sure you want to approve this schedule? This action is final.");
            if (r == true) {
                clearStatusMessages();
                if (vm.schedule) {
                    vm.loadingSchedule = true;
                    ScheduleService.approveSchedule(vm.selectedDepartment.departmentCode)
                        .then(
                            function (res) {
                                changeStatusOfSchedule(vm.selectedDepartment.departmentCode, 'A');
                                clearSelectedDepartmentAndSchedule();
                                vm.loadingSchedule = false;
                                $window.scrollTo(0, 0);
                                vm.success = "Schedule approved!";
                            },
                            function (error) {
                                vm.error = error.data || error.statusText;
                                vm.loadingSchedule = false;
                                $window.scrollTo(0, 0);
                            }
                        );
                } else {
                    vm.error = "No schedule found";
                    $window.scrollTo(0, 0);
                }
            }
        }

        // navigate to "Class Detail" page
        function navigateToClassDetail(unique_class_id) {
            $window.sessionStorage.selectedDepartment = JSON.stringify(vm.selectedDepartment);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $window.sessionStorage.loggedInUser = JSON.stringify(vm.loggedInUser);
            $window.sessionStorage.previousScrollPosition = JSON.stringify(document.documentElement.scrollTop || document.body.scrollTop);
            $window.sessionStorage.filterText = JSON.stringify(vm.filterText || "");
            $location.url("/class-detail/" + unique_class_id);
        }

        // navigate to "Add Class" page
        function navigateToAddClass() {
            $window.sessionStorage.selectedDepartment = JSON.stringify(vm.selectedDepartment);
            $window.sessionStorage.schedule = JSON.stringify(vm.schedule);
            $window.sessionStorage.loggedInUser = JSON.stringify(vm.loggedInUser);
            $window.sessionStorage.previousScrollPosition = JSON.stringify(document.documentElement.scrollTop || document.body.scrollTop);
            $window.sessionStorage.filterText = JSON.stringify(vm.filterText || "");
            $location.url("/class-add/");
        }

        // given schedule status code ('D', 'S', 'R', 'A', or ''), gets associated dropdown group category
        function getScheduleGroupName(scheduleStatus) {
            if (scheduleStatus === 'D') {
                return "Draft";
            } else if (scheduleStatus === 'S') {
                return vm.loggedInUser.admin ? "Waiting Approval" : "Submitted";
            } else if (scheduleStatus === 'R') {
                return "Rejected";
            } else if (scheduleStatus === 'A') {
                return "Approved";
            } else {
                return "Untouched";
            }
        }

        // given a schedule, gets a message detailing the status of the schedule
        function getScheduleStatusLine(schedule) {
            if (schedule.scheduleStatus === 'D') {
                return "Last saved by " + schedule.lastEditedBy + " on " + schedule.lastEditTime;
            } else if (schedule.scheduleStatus === 'R') {
                return "Rejected on " + schedule.lastEditTime;
            } else if (schedule.scheduleStatus === 'A') {
                return "Approved on " + schedule.lastEditTime;
            } else if (schedule.scheduleStatus === 'S') {
                return "Submitted by " + schedule.lastEditedBy + " on " + schedule.lastEditTime;
            }
        }

        // whether the department line-item should be disabled in the Department dropdown (so user cannot load)
        function shouldDisableSchedule(scheduleStatus) {
            if (vm.loggedInUser.admin) {
                return (!scheduleStatus || scheduleStatus === 'D' || scheduleStatus === 'R');
            }
        }

        // logs out (clears sessionStorage)
        function logout() {
            $window.sessionStorage.clear();
            $location.url("/login/");
        }

        // if input is truthy, show toast message at bottom of screen
        function toastMessage(show) {
            var x = document.getElementById("toast");
            if (show) {
                x.classList.add("show");
                setTimeout(function () {
                    x.classList.remove("show");
                }, 6000);
            } else {
                x.classList.remove("show");
            }
        }

        // clears error / success box at top of screen
        function clearStatusMessages() {
            vm.error = "";
            vm.success = "";
        }

        init();
    }
})();