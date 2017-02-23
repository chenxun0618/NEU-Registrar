(function () {
    angular
        .module("NEURegistrar")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/schedule-submission", {
                templateUrl: "views/schedule/schedule-submission.view.client.html",
                controller: "ScheduleSubmissionController",
                controllerAs: "model"
            })
            .when("/class-detail", {
                templateUrl: "views/class/class-detail.view.client.html",
                controller: "ClassDetailController",
                controllerAs: "model"
            })
            .when("/", {
                redirectTo: "/schedule-submission"
            })
            .otherwise({
                redirectTo: "/schedule-submission"
            });
    }
})();