(function () {
    angular
        .module("NEURegistrar")
        .factory("ScheduleService", ScheduleService);

    function ScheduleService($http) {

        var api = {
            getScheduleByTerm: getScheduleByTerm,
            submitSchedule: submitSchedule
        };

        function getScheduleByTerm(term) {

            // dummy data for now
            return [
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
                    honors: "Y"
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
                    primaryInstructor: "001303805",
                    secondaryInstructors: [],
                    enrollmentMax: "45",
                    waitlist: "N",
                    waitlistNumber: "0",
                    doNotPublish: "N",
                    specialApprovals: "",
                    comment: "",
                    honors: "N"
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
                    primaryInstructor: "004203134",
                    secondaryInstructors: [],
                    enrollmentMax: "80",
                    waitlist: "Y",
                    waitlistNumber: "5",
                    doNotPublish: "N",
                    specialApprovals: "A",
                    comment: "",
                    honors: "Y"
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
                    honors: "Y"
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
                    honors: "Y"
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
                    honors: "Y"
                },
            ];

        }

        function submitSchedule(schedule) {
            // communicate with web service
        }

        return api;
    }
})();