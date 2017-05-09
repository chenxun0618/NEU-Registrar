(function () {
    angular
        .module("NEURegistrar")
        .factory("UserService", UserService);

    // a service for handling all class-related operations
    function UserService($http) {

        var api = {
            login: login,
            userCanEditSchedule: userCanEditSchedule
        };

        // returns http promise containing relevant user data, like all departments which can be edited by given user
        function login(email, nuid) {
            var url = "lib/login.php?NUID=" + nuid + "&email=" + encodeURIComponent(email);
            return $http.get(url);
        }

        // returns whether the given user can modify the given schedule type
        // admins (registrar) can never edit a schedule; non-admins cannot edit submitted or approved schedules
        function userCanEditSchedule(user, scheduleStatus) {
            return (user && !user.admin && (scheduleStatus === 'D' || scheduleStatus === '' || scheduleStatus === 'R'));
        }

        return api;
    }
})();