describe("ScheduleSubmissionController", function() {
//  var app;

  var ctrl;
  var classService;
  var scheduleService;
  var location;
  var lwindow;

  beforeEach(angular.mock.module('NEURegistrar'));

  beforeEach(inject(function($controller, $location, $window, $injector, ClassService, ScheduleService) {
        

        location = $location;
        lwindow = $window;
        lwindow.sessionStorage.loggedInUser = "true";

        classService = ClassService;
        scheduleService = ScheduleService;

      var schedule = ScheduleService.getScheduleDetail();
        lwindow.sessionStorage.schedule = JSON.stringify(schedule);

        lwindow.sessionStorage.selectedSchedule = JSON.stringify(schedule); 

        ctrl = $controller('ScheduleSubmissionController', {
          $location : location,
          $window : lwindow,
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

  describe("ScheduleSubmissionController sessionStorage", function() {
      var loc2;
      var lwin2;
      var cs2;
      var ss2;
      var ctrl2;
    beforeEach(inject(function($controller, $location, $window, ClassService, ScheduleService) {
        loc2 = $location;
        lwin2 = $window;
        lwin2.sessionStorage.loggedInUser = false;
        lwin2.sessionStorage.selectedSchedule = false;
        cs2 = ClassService;
        ss2 = ScheduleService;
        ctrl2 = $controller('ScheduleSubmissionController', {
          $location : loc2,
        $window : lwin2,
          ClassService : cs2,
          ScheduleService : ss2
        });

    }));

    it("should pass an easy test", function() {
    
    //demonstrates use of custom matcher
    expect(1).toEqual(1);
  });



  it("should be defined", function() {

  //  classService = app.ClassService();

      expect(ctrl2).toBeDefined();
      expect(location.url()).toEqual("/login");
  })

  });


  it("should get the detailed schedule", function() {
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return true;
    };
    ctrl.getScheduleDetail(lwindow.sessionStorage.selectedSchedule);
    expect(ctrl.getScheduleDetail).toBeDefined();
  })

  it("should get a detailed schedule if one is not currently defined", function() {
    ctrl.schedule = false;
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return false;
    };
    ctrl.getScheduleDetail(lwindow.sessionStorage.selectedSchedule);
    expect(ctrl.schedule).toEqual(scheduleService.getScheduleDetail(lwindow.sessionStorage.selectedSchedule));
  })

  it("should save schedules on request", function() {
    ctrl.saveSchedule();
    expect(ctrl.schedule).toBeDefined();
  })

  it("should save schedules on request, but not if there's no schedule loaded", function() {
    ctrl.schedule = false;
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return true;
    };

    ctrl.saveSchedule();
    expect(ctrl.schedule).toEqual(false);
  })

  it("should submit schedule on request (schedule loaded)", function() {
      ctrl.submitSchedule();
      expect(location.url()).toEqual("/submitted/");
  })

  it("should submit schedule on request (no schedule loaded)", function() {
      ctrl.schedule = 0;
      var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return true;
    };
      ctrl.submitSchedule();
      expect(ctrl.error).toEqual("No schedule found");
  })

  it("should submit schedule on request (no schedule loaded, request, denied)", function() {
      ctrl.schedule = 0;
      var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return false;
    };
      ctrl.submitSchedule();
      expect(ctrl.error).not.toBeDefined();
  })

  it("should reject schedule on request (no reason given)", function() {
      var realprompt=lwindow.prompt;
    lwindow.prompt=function(){
      lwindow.prompt=realprompt;
      return null;
    };
    ctrl.rejectSchedule();
    expect(ctrl.error).not.toBeDefined();
  })

  it("should reject schedule on request (reason given, schedule loaded)", function() {
      var realprompt=lwindow.prompt;
    lwindow.prompt=function(){
      lwindow.prompt=realprompt;
      return "problems";
    };
    ctrl.rejectSchedule();
    expect(location.url()).toEqual("/schedule-submission/");
  })

  it("should reject schedule on request (reason given, no schedule loaded)", function() {
      var realprompt=lwindow.prompt;
    lwindow.prompt=function(){
      lwindow.prompt=realprompt;
      return "problems";
    };
    ctrl.schedule = false;
    ctrl.rejectSchedule();
    expect(ctrl.error).toEqual("No schedule found");
  })

  it("should approve schedules on request (request denied)", function() {
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return false;
    };
    ctrl.approveSchedule();
    expect(ctrl.error).not.toBeDefined();
  })

  it("should approve schedules on request (request accepted, schedule loaded)", function() {
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return true;
    };
    ctrl.approveSchedule();

    expect(location.url()).toEqual("/schedule-submission/");
  })

  it("should approve schedules on request (request accepted, no schedule loaded)", function() {
    var realConfirm=lwindow.confirm;
    lwindow.confirm=function(){
      lwindow.confirm=realConfirm;
      return true;
    };
    ctrl.schedule = false;
    ctrl.approveSchedule();
    expect(ctrl.error).toEqual("No schedule found");
  })

  it("should navigate to details correctly", function() {
    ctrl.navigateToClassDetail(41280);
    expect(location.url()).toEqual("/class-detail/41280");
  })

  it("should navigate to add screen correctly", function() {
    ctrl.navigateToAddClass();
    expect(location.url()).toEqual("/class-add/");
  })

  it("should get schedule summary on call (status undefined)", function() {
    var tempsta = {};
    tempsta.departmentCode = "test"
    
    expect(ctrl.getScheduleSummaryLine(tempsta)).toEqual("test");
  })

  it("should get schedule summary on call (status defined, D)", function() {
    var tempsta = {};
    tempsta.status = 'D'
    tempsta.departmentCode = "test"
    
    expect(ctrl.getScheduleSummaryLine(tempsta)).toEqual("test (draft)");
  })


  it("should get schedule summary on call (status defined, S)", function() {
    var tempsta = {};
    tempsta.status = 'S'
    tempsta.departmentCode = "test"
    
    expect(ctrl.getScheduleSummaryLine(tempsta)).toEqual("test (waiting approval)");
  })


  it("should get schedule summary on call (status defined, R)", function() {
    var tempsta = {};
    tempsta.status = 'R'
    tempsta.departmentCode = "test"
    
    expect(ctrl.getScheduleSummaryLine(tempsta)).toEqual("test (rejected)");
  })


  it("should get schedule status line on call (status defined, D)", function() {
    var tempsta = {};
    tempsta.status = 'D'
    tempsta.last_modifying_user_name = "user1"
    tempsta.timestamp = "ex1"
    
    expect(ctrl.getScheduleStatusLine(tempsta)).toEqual("Last saved by user1 on ex1");
  })

  it("should get schedule status line on call (status defined, R)", function() {
    var tempsta = {};
    tempsta.status = 'R'
    tempsta.last_modifying_user_name = "user1"
    tempsta.timestamp = "ex1"
    tempsta.rejection_message = "bad"
    
    expect(ctrl.getScheduleStatusLine(tempsta)).toEqual("Rejected by user1 on ex1 because: \n\nbad");
  })

  it("should get schedule status line on call (status defined, S)", function() {
    var tempsta = {};
    tempsta.status = 'S'
    tempsta.last_modifying_user_name = "user1"
    tempsta.timestamp = "ex1"
    
    expect(ctrl.getScheduleStatusLine(tempsta)).toEqual("Submitted by user1 on ex1");
  })


});

