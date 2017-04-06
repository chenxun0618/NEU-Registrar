describe("ClassDetailController", function() {
//  var app;

  var ctrl;
  var classService;
  var scheduleService;
  var location;
  var routeparams;


  //beforeEach(module('NEURegistrar'));
  beforeEach(angular.mock.module('NEURegistrar'));
  beforeEach(angular.module('ngRoute'));
  //  beforeEach(angular.mock.module('NEURegistrar').factory('ClassService'))
  //  beforeEach(angular.mock.module('NEURegistrar').ClassService);
  /*
  beforeEach(function() {
    app = angular.mock.module('NEURegistrar');
  })
  */

  beforeEach(inject(function($controller, $location, $routeParams, ClassService, ScheduleService) {
        location = $location;
        routeparams = $routeParams;
        classService = ClassService;
        scheduleService = ScheduleService;
        ctrl = $controller('ClassDetailController', {
          $location : location,
          $routeParams : routeparams,
          ClassService : classService,
          ScheduleService : scheduleService
        });

    }));


  it("should pass an easy test", function() {
    
    //demonstrates use of custom matcher
    expect(1).toEqual(1);
  });



  it("should be defined", function() {

  //  classService = app.ClassService();

      expect(ctrl).toBeDefined();
  }) 




});
