(function () {
    angular
        .module("NEURegistrar")
        .factory("ScheduleService", ScheduleService);

    function ScheduleService($http) {

        var api = {
            getScheduleByTerm: getScheduleByTerm,
            saveSchedule: saveSchedule,
            submitSchedule: submitSchedule,
            getAllSchedules: getAllSchedules,
            getAllNonApprovedSchedules: getAllNonApprovedSchedules,
            isClassModified: isClassModified
        };

        function getScheduleByTerm(term) {

            // dummy data for now
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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
                    // status: "A", ------ unnecessary?
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
                        // status: "A", ------ unnecessary?
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

            findModifiedClasses(schedule);
            return schedule;
        }

        // marks all modified classes in a schedule as modified
        // maybe DB does this?
        function findModifiedClasses(schedule) {
            for (var x = 0; x < schedule; x++) {
                var currentClass = schedule[x];
                currentClass.metadata = currentClass.metadata || {};
                currentClass.metadata.modified = true;
            }
        }

        // determines if a given class has been modified from its old data by examining all properties
        function isClassModified(aClass) {
            var modified = !(
                (aClass.college === aClass.old.college) &&
                (aClass.collegeName === aClass.old.collegeName) &&
                (aClass.departmentCode === aClass.old.departmentCode) &&
                (aClass.departmentName === aClass.old.departmentName) &&
                (aClass.subjectCode === aClass.old.subjectCode) &&
                (aClass.subjectName === aClass.old.subjectName) &&
                (aClass.term === aClass.old.term) &&
                (aClass.courseNumber === aClass.old.courseNumber) &&
                (aClass.section === aClass.old.section) &&
                (aClass.crn === aClass.old.crn) &&
                (aClass.partOfTerm === aClass.old.partOfTerm) &&
                (aClass.shortTitle === aClass.old.shortTitle) &&
                (aClass.instructionalMethod === aClass.old.instructionalMethod) &&
                (aClass.creditHour === aClass.old.creditHour) &&
                (aClass.meetingDays === aClass.old.meetingDays) &&
                (aClass.meetingStart === aClass.old.meetingStart) &&
                (aClass.meetingEnd === aClass.old.meetingEnd) &&
                (aClass.campus === aClass.old.campus) &&
                (aClass.primaryInstructor === aClass.old.primaryInstructor) &&
                (aClass.enrollmentMax === aClass.old.enrollmentMax) &&
                (aClass.waitlist === aClass.old.waitlist) &&
                (aClass.waitlistNumber === aClass.old.waitlistNumber) &&
                (aClass.doNotPublish === aClass.old.doNotPublish) &&
                (aClass.specialApprovals === aClass.old.specialApprovals) &&
                (aClass.comment === aClass.old.comment) &&
                (aClass.honors === aClass.old.honors) &&
                (aClass.cancel === aClass.old.cancel)
            );

            if (modified) {
                return true;
            } else {
                if (aClass.secondaryInstructors.length !== aClass.old.secondaryInstructors.length) {
                    return true;
                } else {
                    for (var x = 0; x < aClass.secondaryInstructors.length; x++) {
                        if (aClass.secondaryInstructors[x] !== aClass.old.secondaryInstructors[x]) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }

        function saveSchedule(schedule) {
            // communicate with web service
        }

        function submitSchedule(schedule) {
            // communicate with web service
        }

        // based on logged in user's nuid, gets the appropriate list of schedule metadata in descending order
        function getAllSchedules(nuid) {

            // dummy data for now
            return [
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
        }

        // same as above, but only gets stuff that hasn't been approved yet (draft or submitted)
        function getAllNonApprovedSchedules(nuid) {
            return [
                {
                    term: "201810",
                    term_readable: "Spring 2018",
                    status: "S",
                    submitter_nuid: "001104152",
                    submitter_name: "John Smith",
                    timestamp: "20170324122500"
                },
            ];
        }

        return api;
    }
})();
