(function () {
    angular
        .module("NEURegistrar")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login
        };

        function login(email, nuid) {
            var url = "/connection/login.php?NUID=" + nuid + "&email=" + encodeURIComponent(email);
            return $http.get(url);
        }

        return api;
    }
})();