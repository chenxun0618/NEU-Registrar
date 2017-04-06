(function () {
    angular
        .module("NEURegistrar")
        .controller("LoginController", LoginController);

    function LoginController($window, $location, UserService) {
        var vm = this;

        vm.loggedInUser = JSON.parse($window.sessionStorage.loggedInUser ? $window.sessionStorage.loggedInUser : null);

        if (vm.loggedInUser) {
            $location.url("/schedule-submission/");
        }

        vm.login = login;

        function login(email, nuid) {
            var user = UserService.login(email, nuid);

            if (user) {
                vm.error = "";
                $window.sessionStorage.loggedInUser = JSON.stringify(user);
                $location.url("/schedule-submission/");
            } else {
                vm.error = "Email / NUID pair not found";
            }
        }
    }
})();