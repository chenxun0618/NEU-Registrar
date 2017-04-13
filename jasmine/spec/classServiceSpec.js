describe("ClassService", function() {
//  var app;

  var api;

//beforeEach(module('NEURegistrar'));
 beforeEach(angular.mock.module('NEURegistrar'));
//  beforeEach(angular.mock.module('NEURegistrar').factory('ClassService'))
//  beforeEach(angular.mock.module('NEURegistrar').ClassService);
/*
  beforeEach(function() {
    app = angular.mock.module('NEURegistrar');
  })
*/

  beforeEach(inject(function(ClassService) {
        api = ClassService;
    }))


  it("should pass an easy test", function() {
    
    //demonstrates use of custom matcher
    expect(1).toEqual(1);
  });
/*
  it('should be defined', inject(function(ClassService){ //parameter name = service name

    expect(ClassService[getCurrentTerm]).toBeDefined();

  }))  */

 
  it("should be defined", function() {

  //  classService = app.ClassService();

      expect(api).toBeDefined();
  }) 

  it("should have all the subject codes", function() {
    expect(api.getAllSubjectCodes()).toEqual(["ACCT", "CS", "DS", "IS", "MATH", "PHYS", "PSYC"]);

    
  });

  it("should have the current term", function () {
            expect(api.getCurrentTerm()).toEqual("201810");
  });

  it("should have all statuses", function () {
            expect(api.getAllStatuses()).toEqual([{ code: 'A', description: 'Active' },{ code: 'I', description: 'Inactive' }, { code: 'C', description: 'Cancelled' }]);
  });


  it("should have the meeting days", function () {
            expect(api.getAllMeetingDays()).toEqual(["MWR", "TF", "MW", "M", "T", "W", "R", "F", "S"]);
  });

  it("should get all special approvals", function () {
            expect(api.getAllSpecialApprovals()).toEqual(["", "A", "D", "G", "I"]);
  });

  it("should get all time intervals", function () {
            expect(api.getAllTimeIntervals()).toEqual(["08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00"]);
  });

  it("should get the most recent course data's subject code", function () {
    var sc = "ACCT"
    var cn = "1000"
      expect(api.getCourseDataFromCatalog(sc,cn).subjectCode).toEqual(sc);
  });

  it("should get the most recent course data's course number ", function () {
    var sc = "ACCT"
    var cn = "1000"
      expect(api.getCourseDataFromCatalog(sc,cn).courseNumber).toEqual(cn);
  });


  it("should be able to detect invalid classes", function() {
    var blank = {};
    blank.termCode = "12345";
    var lis = api.getInvalidClassReasons(blank);
    expect(lis.length).toEqual(15);

    var blank2 = {};
    blank2.termCode = "12346";
    blank2.crn = "1234";
    blank2.subjectCode = "2hierg";
    blank2.courseNumber = "123"
    blank2.section = "123"
    blank2.meetingBeginTime = 200;
    blank2.meetingEndTime = 199;
    blank2.secondaryInstructors = 6;
    blank2.maxEnrollment = -2;
    blank2.priorEnrollment = -1;
    blank2.majorRestrictions = 1;
    blank2.classRestrictions = 2;
    blank2.levelRestrictions = 3;
    blank2.programRestrictions = 4;
    blank2.collegeRestrictions = 5;
    blank2.waitListCapacity = -1;
    var lis2 = api.getInvalidClassReasons(blank2);
    expect(lis2.length).toEqual(24);

    var lis3 = api.getInvalidClassReasons(api.getCourseDataFromCatalog("ACCT","1000"));
    expect(lis3.length).toEqual(7);

  });
});
