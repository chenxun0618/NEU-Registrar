(function () {
    angular
        .module("NEURegistrar")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            userCanEditSchedule: userCanEditSchedule
        };

        function login(email, nuid) {
            var url = "/lib/login.php?NUID=" + nuid + "&email=" + encodeURIComponent(email);
            return $http.get(url);
        }

        function userCanEditSchedule(user, scheduleStatus) {
            return (user && !user.admin && (scheduleStatus === 'D' || scheduleStatus === '' || scheduleStatus === 'R'));
        }

        return api;
    }
})();