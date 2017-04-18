(function () {
    angular
        .module("NEURegistrar")
        .controller("LoginController", LoginController);

    // controller for the Login page
    function LoginController($window, $location, UserService) {
        var vm = this;

        // functions used in view
        vm.login = login;

        // load initial data for login page
        function init() {
            vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser || null);

            if (vm.loggedInUser) {
                $location.url("/schedule-submission");
            }
        }

        // error check given email and nuid and then log in user (store user data in sessionStorage)
        function login(email, nuid) {

            if (!validateEmail(email)) {
                vm.error = "Invalid email";
                return;
            }

            if ((!nuid) || (nuid && nuid.length != 9)) {
                vm.error = "Invalid NUID";
                return;
            }

            var user;
            UserService.login(email, nuid)
                .then(
                    function (res) {
                        user = res.data;
                        reformatSchedule(user);
                        vm.error = "";
                        $window.sessionStorage.loggedInUser = JSON.stringify(user);
                        $location.url("/schedule-submission/");
                    },
                    function (error) {
                        vm.error = error.data || error.statusText;
                    }
                );
        };

        // regular expression check; returns true if given string is in format of email
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        // given a user object directly from database, do some miscellaneous preprocessing before it reaches the UI
        // TODO get the database to return it in a more usable format
        function reformatSchedule(user) {
            var newDepts = [];

            var depts = user.dept;
            for (var x = 0; x < depts.length; x++) {
                var dept = depts[x];
                var deptName = Object.keys(dept)[0];
                var scheduleStatus = dept[deptName];
                newDepts.push({
                    departmentCode: deptName,
                    status: scheduleStatus
                });
            }

            user.admin = parseInt(user.isAdmin) ? true : false;
            user.depts = sortDepartments(user.admin, newDepts);
            user.nuid = user.NUID;
            delete user.dept;
            delete user.isAdmin;
            delete user.NUID;
        }

        // Sorting needed to control order of <optgroup>'s in the department dropdown on the Schedule Submission page.
        // input: (boolean, [{departmentCode: "CS", status: "S"}, {departmentCode: "IS", status: ""} ...]
        // output: array sorted first by status according to map, then alphabetically
        function sortDepartments(admin, depts) {
            if (admin) {
                var map = {"S": 1, "A": 2, "R": 3, "D": 4, "": 5};
            } else {
                var map = {"D": 1, "R": 2, "": 3, "A": 4, "S": 5};
            }

            var scheduleStatusComparator = function (a, b) {
                if (a.status === b.status) {
                    return a.departmentCode.localeCompare(b.departmentCode); // alphabetical if same status
                } else {
                    return (map[a.status] - map[b.status]);
                }
            };

            return depts.sort(scheduleStatusComparator);
        }

        init();
    }
})();