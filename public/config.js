(function () {
    angular
        .module("NEURegistrar")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "public/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/schedule-submission", {
                templateUrl: "public/views/schedule/schedule-submission.view.client.html",
                controller: "ScheduleSubmissionController",
                controllerAs: "model"
            })
            .when("/class-detail/:unique_id", {
                templateUrl: "public/views/class/class-detail.view.client.html",
                controller: "ClassDetailController",
                controllerAs: "model"
            })
            .when("/class-add/", {
                templateUrl: "public/views/class/class-add.view.client.html",
                controller: "ClassAddController",
                controllerAs: "model"
            })
            .when("/", {
                redirectTo: "/login"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();