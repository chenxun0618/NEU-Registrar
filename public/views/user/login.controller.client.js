(function () {
    angular
        .module("NEURegistrar")
        .controller("LoginController", LoginController);

    function LoginController($window, $location, UserService) {
        var vm = this;

        vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

        if (vm.loggedInUser) {
            $location.url("/schedule-submission");
        }

        vm.login = login;

        function login(email, nuid) {
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
                        vm.error = error.statusText;
                    }
                );
        };

        function reformatSchedule(user) {
            var newDepts = [];

            var depts = user.dept;
            for (var x = 0; x < depts.length; x++) {
                var dept = depts[x];
                var deptName = Object.keys(dept)[0];
                var scheduleStatus = dept[deptName];
                newDepts.push({
                    code: deptName,
                    scheduleStatus: scheduleStatus
                });
            }

            user.depts = newDepts;
            user.admin = parseInt(user.isAdmin) ? true : false;
            user.nuid = user.NUID;
            delete user.dept;
            delete user.isAdmin;
            delete user.NUID;
        }
    }
})();