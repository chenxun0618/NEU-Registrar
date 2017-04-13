describe("LoginController", function() {
//  var app;

  var ctrl;
  var userService;
  var location;
  var lwindow;

  beforeEach(angular.mock.module('NEURegistrar'));

  beforeEach(inject(function($controller, $location, $window, $injector, UserService) {
        

        location = $location;
        lwindow = $window;
        lwindow.sessionStorage.loggedInUser = "true";

        userService = UserService;


        ctrl = $controller('LoginController', {
          $location : location,
          $window : lwindow,
          UserService : userService,

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

  it("should perform login operations correctly (invalid user)", function() {
    ctrl.login("t1","t2");
    expect(ctrl.error).toEqual("Email / NUID pair not found");
  })

});