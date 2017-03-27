(function () {
    var app = angular.module("NEURegistrar", ["ngRoute"]);
    app.filter("filterClass", function () {
        return function (classes, filterText) {
            var re = new RegExp(filterText, "i");
            if (filterText === undefined || filterText.length === 0)
                return classes;
            var result = [];
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].subjectCode.search(re) !== -1 ||
                    classes[i].courseNumber.search(re) !== -1 ||
                    classes[i].shortTitle.search(re) !== -1) {
                    result.push(classes[i]);
                }
            }
            return result;
        }
    });
})();