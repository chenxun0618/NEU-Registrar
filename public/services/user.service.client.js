(function () {
    angular
        .module("NEURegistrar")
        .factory("UserService", UserService);

    function UserService() {

        var api = {
            login: login
        };

        var dictionary = [
            {
                nuid: "000000000",
                email: "n.rakitin@northeastern.edu",
                departments: [],
                admin: true
            },
            {
                nuid: "111111111",
                email: "polevy.m@husky.neu.edu",
                departments: ["CS", "IS"],
                admin: false
            }
        ];

        function login(email, nuid) {
            for (var x = 0; x < dictionary.length; x++) {
                var user = dictionary[x];
                if (user.nuid === nuid && user.email === email) {
                    return user;
                }
            }
            return null;
        }

        return api;
    }
})();