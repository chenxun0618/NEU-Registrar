describe("ScheduleService", function() {
//  var app;

  var api;

  var schedule = [
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "1225",
                    section: "03",
                    crn: "41251",
                    partOfTerm: "1",
                    shortTitle: "Principles of Accounting",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "40",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "1225",
                        section: "03",
                        crn: "41251",
                        partOfTerm: "1",
                        shortTitle: "Principles of Accounting",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "40",
                        waitlist: "Y",
                        waitlistNumber: "5",
                        doNotPublish: "N",
                        specialApprovals: "A",
                        comment: "",
                        honors: "Y",
                        cancel: "N"
                    }
                },
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "1265",
                    section: "01",
                    crn: "11561",
                    partOfTerm: "1",
                    shortTitle: "Principles of Accounting 2",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "TF",
                    meetingStart: "09:50",
                    meetingEnd: "11:30",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "45",
                    waitlist: "N",
                    waitlistNumber: "0",
                    doNotPublish: "N",
                    specialApprovals: "",
                    comment: "",
                    honors: "N",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "1265",
                        section: "01",
                        crn: "11561",
                        partOfTerm: "1",
                        shortTitle: "Principles of Accounting 2",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "TF",
                        meetingStart: "09:50",
                        meetingEnd: "11:30",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "45",
                        waitlist: "N",
                        waitlistNumber: "0",
                        doNotPublish: "N",
                        specialApprovals: "",
                        comment: "",
                        honors: "N",
                        cancel: "N"
                    }
                },
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "2245",
                    section: "03",
                    crn: "85192",
                    partOfTerm: "1",
                    shortTitle: "Accounting for Geniuses",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "80",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "2245",
                        section: "03",
                        crn: "85192",
                        partOfTerm: "1",
                        shortTitle: "Accounting for Geniuses",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "80",
                        waitlist: "Y",
                        waitlistNumber: "5",
                        doNotPublish: "N",
                        specialApprovals: "A",
                        comment: "",
                        honors: "Y",
                        cancel: "N"
                    }
                },
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "3112",
                    section: "03",
                    crn: "01886",
                    partOfTerm: "1",
                    shortTitle: "Corporate Accounting",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "TF",
                    meetingStart: "14:50",
                    meetingEnd: "16:30",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "40",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "3112",
                        section: "03",
                        crn: "01886",
                        partOfTerm: "1",
                        shortTitle: "Corporate Accounting",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "TF",
                        meetingStart: "14:50",
                        meetingEnd: "16:30",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "40",
                        waitlist: "Y",
                        waitlistNumber: "5",
                        doNotPublish: "N",
                        specialApprovals: "A",
                        comment: "",
                        honors: "Y",
                        cancel: "N"
                    }
                },
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "3455",
                    section: "01",
                    crn: "02120",
                    partOfTerm: "1",
                    shortTitle: "Corporate Accounting 2",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "MWR",
                    meetingStart: "10:30",
                    meetingEnd: "11:35",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "15",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "3455",
                        section: "01",
                        crn: "02120",
                        partOfTerm: "1",
                        shortTitle: "Corporate Accounting 2",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "MWR",
                        meetingStart: "10:30",
                        meetingEnd: "11:35",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "15",
                        waitlist: "Y",
                        waitlistNumber: "5",
                        doNotPublish: "N",
                        specialApprovals: "A",
                        comment: "",
                        honors: "Y",
                        cancel: "N"
                    }
                },
                {
                    college: "BA",
                    collegeName: "D'Amore-McKim School of Business",
                    departmentCode: "ACCT",
                    departmentName: "Accounting",
                    subjectCode: "ACCT",
                    subjectName: "Accounting",
                    term: "201810",
                    courseNumber: "4424",
                    section: "01",
                    crn: "17472",
                    partOfTerm: "1",
                    shortTitle: "The Regulatory Framework",
                    instructionalMethod: "TR",
                    creditHour: "4",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    campus: "BOS",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: "10",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y",
                    cancel: "N",
                    old: {
                        college: "BA",
                        collegeName: "D'Amore-McKim School of Business",
                        departmentCode: "ACCT",
                        departmentName: "Accounting",
                        subjectCode: "ACCT",
                        subjectName: "Accounting",
                        term: "201810",
                        courseNumber: "4424",
                        section: "01",
                        crn: "17472",
                        partOfTerm: "1",
                        shortTitle: "The Regulatory Framework",
                        instructionalMethod: "TR",
                        creditHour: "4",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        campus: "BOS",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: "10",
                        waitlist: "Y",
                        waitlistNumber: "5",
                        doNotPublish: "N",
                        specialApprovals: "A",
                        comment: "",
                        honors: "Y",
                        cancel: "N"
                    }
                }
            ];

//beforeEach(module('NEURegistrar'));
 beforeEach(angular.mock.module('NEURegistrar'));
//  beforeEach(angular.mock.module('NEURegistrar').factory('ClassService'))
//  beforeEach(angular.mock.module('NEURegistrar').ClassService);
/*
  beforeEach(function() {
    app = angular.mock.module('NEURegistrar');
  })
*/

  beforeEach(inject(function(ScheduleService) {
        api = ScheduleService;
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

  it("should have the schedule for a given term", function() {
    
    expect(api.getScheduleByTerm("201810")).toEqual(schedule);

    
  });

it("Should be able to identify modified classes (0)", function() {
    expect(api.isClassModified(schedule[0])).toEqual(false);

}) ;

it("Should be able to identify modified classes (1)", function() {
  schedule[2].college = "CS";
    expect(api.isClassModified(schedule[2])).toEqual(true);

}) ;

it("Should be able to identify modified classes (2)", function() {
  schedule[1].secondaryInstructors.push("testInstructor");
    expect(api.isClassModified(schedule[1])).toEqual(true);

}) ;


it("Should be able to identify modified classes (2)", function() {
  schedule[1].secondaryInstructors[0] = "testInstructor2";
    expect(api.isClassModified(schedule[1])).toEqual(true);

}) ;

it("should get all schedules for a given dept leader's nuid", function() {
  var tempsched = [
                {
                    term: "201810",
                    term_readable: "Spring 2018",
                    status: "S",
                    submitter_nuid: "001104152",
                    submitter_name: "John Smith",
                    timestamp: "20170324122500"
                },
                {
                    term: "201720",
                    term_readable: "Summer 1 2017",
                    status: "A"
                },
                {
                    term: "201721",
                    term_readable: "Summer 2 2017",
                    status: "A"
                },
                {
                    term: "201730",
                    term_readable: "Fall 2017",
                    status: "A"
                }
            ];

  expect(api.getAllSchedules(012345678)).toEqual(tempsched);
});

it("should get all non-approved schedules for a given dept leader's nuid", function() {
  var tempsched = [
                {
                    term: "201810",
                    term_readable: "Spring 2018",
                    status: "S",
                    submitter_nuid: "001104152",
                    submitter_name: "John Smith",
                    timestamp: "20170324122500"
                },
            ];

  expect(api.getAllNonApprovedSchedules(012345678)).toEqual(tempsched);
});




});
