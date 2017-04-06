describe("ClassAddController", function() {
//  var app;

  var ctrl;
  var classService;
  var scheduleService;
  var location;


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

  beforeEach(inject(function($controller, $location, ClassService, ScheduleService) {
        location = $location;
        classService = ClassService;
        scheduleService = ScheduleService;
        ctrl = $controller('ClassAddController', {
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

  it("should define metadata on call", function() {
    ctrl.getMostRecentCourseData("ACCT","57182");
    ctrl.saveAndReturnToSchedule();
    expect(ctrl.class.metadata).toEqual();
  })

  it("should update metadata saving and returning", function() {
    ctrl.getMostRecentCourseData("ACCT","57182");
    ctrl.saveAndReturnToSchedule();
    expect(ctrl.class.metadata.added).toEqual(true);
  })

  it("should have defined most recent course data", function() {
    expect(ctrl.getMostRecentCourseData).toBeDefined();
  })


  it("should have defined most recent course data for a given course number and subj code", function() {
    ctrl.getMostRecentCourseData("ACCT","57182");

    var theClass = {
                college: "BA",
                collegeName: "D'Amore-McKim School of Business",
                departmentCode: "ACCT",
                departmentName: "Accounting",
                subjectCode: "ACCT",
                subjectName: "Accounting",
                term: "201810",
                courseNumber: "57182",
                section: "03",
                crn: ctrl.class.crn,
                partOfTerm: "1",
                shortTitle: "Principles of Accounting",
                instructionalMethod: "TR",
                creditHour: 4,
                meetingDays: "MWR",
                meetingStart: "13:35",
                meetingEnd: "14:40",
                campus: "BOS",
                primaryInstructor: "001303804",
                secondaryInstructors: [],
                enrollmentMax: "40",
                waitlist: "Y",
                waitlistNumber: 5,
                doNotPublish: "N",
                specialApprovals: "A",
                comment: "",
                honors: "Y",
                cancel: "N",
                old:ctrl.class.old
            };

    expect(ctrl.class).toEqual(theClass);
  })

it("should have defined most recent course data for a given course number and subj code", function() {
    ctrl.getMostRecentCourseData("ACCT","57182");

    expect(ctrl.class).not.toEqual(ctrl.class.old);
  })

  
  it("should identify when it's not peak period", function() {
    ctrl.getMostRecentCourseData();
    expect(ctrl.isPeakPeriod("8")).toEqual(0);
  })

  it("should identify when it's  peak period", function() {
    ctrl.getMostRecentCourseData();
    expect(ctrl.isPeakPeriod("12")).toEqual(1);
  })

  it("should identify when it's peak period (2)", function() {
    ctrl.class = {meetingDays : 'T'}
    expect(ctrl.isPeakPeriod("12")).toEqual(1);
  })

  it("should update ending times", function() {
    expect(ctrl.updateEndingTimes).toBeDefined();
  })

  it("should update on change of time", function() {
    expect(ctrl.updateOnChangeOfTime).toBeDefined();
  })

  it("should update on change of time (f)", function() {
    ctrl.getMostRecentCourseData();
    ctrl.updateOnChangeOfTime(true);
    expect(ctrl.updateOnChangeOfTime).toBeDefined();
  })

  it("should send a toast message", function() {
    
    expect(ctrl.toastMessage).toBeDefined();
  })



});
