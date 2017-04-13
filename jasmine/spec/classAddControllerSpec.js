describe("ClassAddController", function() {
//  var app;

  var ctrl;
  var classService;
  var scheduleService;
  var location;
  var lwindow;

//beforeEach(module('NEURegistrar'));
 beforeEach(angular.mock.module('NEURegistrar'));
 beforeEach(module('ngRoute'));
//  beforeEach(angular.mock.module('NEURegistrar').factory('ClassService'))
//  beforeEach(angular.mock.module('NEURegistrar').ClassService);
/*
  beforeEach(function() {
    app = angular.mock.module('NEURegistrar');
  })
*/

  beforeEach(inject(function($controller, $location, $window, ClassService, ScheduleService) {
        location = $location;
        lwindow = $window;
        classService = ClassService;
        scheduleService = ScheduleService;
        ctrl = $controller('ClassAddController', {
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

  describe("ClassAdd sessionStorage", function() {
      var loc2;
      var lwin2;
      var cs2;
      var ss2;
      var ctrl2;
    beforeEach(inject(function($controller, $location, $window, ClassService, ScheduleService) {
        loc2 = $location;
        lwin2 = $window;
        lwin2.sessionStorage.loggedInUser = true;
        cs2 = ClassService;
        ss2 = ScheduleService;
        ctrl2 = $controller('ClassAddController', {
          $location : loc2,
        $window : lwin2,
          ClassService : cs2,
          ScheduleService : ss2
        });

    }));

    it("should understand session storage", function() {
      //var location2 = $location;
      ctrl2.loggedInUser = 'true';
          expect(ctrl2).toBeDefined();
    });

    it("should update on change of time (f)", function() {
      ctrl2.getCourseDataFromCatalog();
      ctrl2.class = {};
      ctrl2.class.meetingBeginTime = "8:10";
      ctrl2.updateOnChangeOfTime(true);
    expect(ctrl2.updateOnChangeOfTime).toBeDefined();
    });

    it("should react accordingly to unloaded state", function() {
      ctrl2.reloaded = "yes";
      var oldClass = ctrl2.class;
      ctrl2.getCourseDataFromCatalog("ACCT", "5718");
      expect(ctrl2.class.old).toEqual(oldClass);
    })

    it("should have defined most recent course data for a given course number and subj code", function() {
    ctrl2.getCourseDataFromCatalog("ACCT","5718");


    var theClass2 = { college: 'BA', 
                      collegeName: "D'Amore-McKim School of Business", 
                      departmentCode: 'ACCT', 
                      departmentName: 'Accounting', 
                      subjectCode: 'ACCT', 
                      subjectName: 'Accounting', 
                      termCode: '201810', 
                      courseNumber: '57182', 
                      section: '03', 
                      partOfTerm: '1', 
                      shortTitle: 'Principles of Accounting', 
                      instructionalMethod: 'TR', 
                      creditHour: 4, 
                      meetingDays: 'MWR', 
                      meetingStart: '13:35', 
                      meetingEnd: '14:40', 
                      campus: 'BOS', 
                      primaryInstructor: '001303804', 
                      secondaryInstructors: [  ], 
                      enrollmentMax: '40', 
                      waitlist: 'Y', 
                      waitlistNumber: 5, 
                      doNotPublish: 'N', 
                      specialApprovals: 'A', 
                      comment: '', 
                      honors: 'Y', 
                      cancel: 'N', 
                      old: ctrl2.class.old};//Object({ college: 'BA', collegeName: "D'Amore-McKim School of Business", departmentCode: 'ACCT', departmentName: 'Accounting', subjectCode: 'ACCT', subjectName: 'Accounting', term: '201810', courseNumber: '57182', section: '03', partOfTerm: '1', shortTitle: 'Principles of Accounting', instructionalMethod: 'TR', creditHour: 4, meetingDays: 'MWR', meetingStart: '13:35', meetingEnd: '14:40', campus: 'BOS', primaryInstructor: '001303804', secondaryInstructors: [  ], enrollmentMax: '40', waitlist: 'Y', waitlistNumber: 5, doNotPublish: 'N', specialApprovals: 'A', comment: '', honors: 'Y', cancel: 'N' }) }

    expect(ctrl2.class).toEqual(theClass2);
  })

  it("should recognize invalid classrooms from save/return schedule", function() {
    ctrl2.getCourseDataFromCatalog("ACCT", "5718");
    ctrl2.class.campusCode = "BOS";
    ctrl2.class.waitlistCapacity = 2;
    ctrl2.class.meetingDays = ["M", "W", "R"];
    ctrl2.class.priorEnrollment = 3;
    ctrl2.class.maxEnrollment = 1;
    ctrl2.class.primaryInstructorID = "howdy"
    ctrl2.class.meetingBeginTime = "8:00"
    ctrl2.class.meetingEndTime = "9:05"
    lwin2.sessionStorage.schedule = '[]';
    ctrl2.saveAndReturnToSchedule();
    expect(classService.getInvalidClassReasons(ctrl2.class).length).toEqual(0);
  })

  })

describe("ClassAdd sessionStorage (f)", function() {
      var loc3;
      var lwin3;
      var cs3;
      var ss3;
      var ctrl3;
    beforeEach(inject(function($controller, $location, $window, ClassService, ScheduleService) {
        loc3 = $location;
        lwin3 = $window;
        lwin3.sessionStorage.loggedInUser = 0;
        cs3 = ClassService;
        ss3 = ScheduleService;
        ctrl3 = $controller('ClassAddController', {
          $location : loc3,
        $window : lwin3,
          ClassService : cs3,
          ScheduleService : ss3
        });

    }));

    it("should understand session storage", function() {
      ctrl3.loggedInUser = true;
          expect(ctrl3).toBeDefined();
    })
  })


  it("should have return to schedule location binding defined", function() {

      expect(ctrl.returnToSchedule).toBeDefined();
  })

  it("should have return to schedule location binding defined onto location var", function() {

    ctrl.returnToSchedule();
      expect(location.url).toBeDefined();
  })

  it("should have save and return function defined", function() {

      expect(ctrl.saveAndReturnToSchedule).toBeDefined();
  })

  it("should have save and return function schedule updating", function() {
      ctrl.getCourseDataFromCatalog("ACCT","5718");
      lwindow.sessionStorage.schedule = '["cats"]';
      ctrl.saveAndReturnToSchedule();
      expect(ctrl.saveAndReturnToSchedule).toBeDefined();
  })

  it("should define metadata on call", function() {
    ctrl.getCourseDataFromCatalog("ACCT","5718");
    ctrl.saveAndReturnToSchedule();
    expect(ctrl.class.metadata).toBeDefined();
  })

  it("should update metadata saving and returning", function() {
    ctrl.getCourseDataFromCatalog("ACCT","5718");
    ctrl.saveAndReturnToSchedule();
    expect(ctrl.class.metadata.added).toEqual(true);
  })

  it("should have defined most recent course data", function() {
    expect(ctrl.getCourseDataFromCatalog).toBeDefined();
  })
  
  it("should identify when it's not peak period", function() {
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("M","8")).toEqual(0);
  })

    it("should identify when it's not peak period (2)", function() {
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("W","8")).toEqual(0);
  })

it("should identify when it's not peak period (3)", function() {
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("W","99999")).toEqual(0);
  })

    it("should identify when it's not peak period (4++)", function() {
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("R","8")).toEqual(0);
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("MW","8")).toEqual(0);
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("MWR","8")).toEqual(0);

  })

    it("should identify when it's peak period (1)", function() {
    ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("R","15")).toEqual(1)

  })

    it("should identify when it's peak period (2)", function() {
      ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("MW","10")).toEqual(1);

  })

    it("should identify when it's peak period (3)", function() {
      ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("MWR","0925")).toEqual(1);

  })

    it("should identify when it's peak period (4)", function() {
      ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("T","15")).toEqual(1);

  })

it("should identify when it's peak period (5)", function() {
      ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("T","12")).toEqual(1);

  })
      
it("should identify when it's peak period (5)", function() {
      ctrl.getCourseDataFromCatalog();
    expect(ctrl.isPeakPeriod("T","0955")).toEqual(1);

  })  
    

  it("should identify when it's peak period (no day)", function() {
    expect(ctrl.isPeakPeriod("12")).toEqual(false);
  })

  it("should update ending times", function() {
    expect(ctrl.updateEndingTimes).toBeDefined();
  })

  it("should update on change of time", function() {
    expect(ctrl.updateOnChangeOfTime).toBeDefined();
  })

  it("should send a toast message", function() {
    ctrl.toastMessage(true)
    expect(ctrl.toastMessage).toBeDefined();
  })

  it("should not send a toast message if given a false message", function() {
    ctrl.toastMessage(false)
    expect(ctrl.toastMessage).toBeDefined();
  })



});
