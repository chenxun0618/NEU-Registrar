(function () {
    angular
        .module("NEURegistrar")
        .factory("ScheduleService", ScheduleService);

    function ScheduleService(ClassService) {

        var api = {
            getScheduleDetail: getScheduleDetail,
            saveSchedule: saveSchedule,
            submitSchedule: submitSchedule,
            rejectSchedule: rejectSchedule,
            approveSchedule: approveSchedule,
            getAllSchedules: getAllSchedules,
        };

        function getScheduleDetail(schedule) {

            // dummy data for now
            var schedule = [
                {
                    term: "201810",
                    crn: "41251",
                    subjectCode: "ACCT",
                    courseNumber: "1111",
                    section: "03",
                    status: "A",
                    shortTitle: "Principles of Accounting",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: 40,
                    lastYearEnrollment: 38,
                    majorRestrictions: ["HISE", "RCRA"],
                    classRestrictions: [],
                    levelRestrictions: [],
                    programRestrictions: [],
                    collegeRestrictions: [],
                    includeMajorRestrictions: false,
                    includeClassRestrictions: true,
                    includeLevelRestrictions: true,
                    includeProgramRestrictions: true,
                    includeCollegeRestrictions: true,
                    waitlistCapacity: 99,
                    campus: "BOS",
                    instructionalMethod: "TR",
                    specialApprovals: "A",
                    billingAttributes: [],
                    honors: "Y",
                    doNotPublish: "N",
                    comment: "",
                    old: {
                        term: "201810",
                        crn: "41251",
                        subjectCode: "ACCT",
                        courseNumber: "1111",
                        section: "03",
                        status: "A",
                        shortTitle: "Principles of Accounting",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: 40,
                        lastYearEnrollment: 38,
                        majorRestrictions: ["HISE", "RCRA"],
                        classRestrictions: [],
                        levelRestrictions: [],
                        programRestrictions: [],
                        collegeRestrictions: [],
                        includeMajorRestrictions: false,
                        includeClassRestrictions: true,
                        includeLevelRestrictions: true,
                        includeProgramRestrictions: true,
                        includeCollegeRestrictions: true,
                        waitlistCapacity: 99,
                        campus: "BOS",
                        instructionalMethod: "TR",
                        specialApprovals: "A",
                        billingAttributes: [],
                        honors: "Y",
                        doNotPublish: "N",
                        comment: ""
                    }
                },
                {
                    term: "201810",
                    crn: "51515",
                    subjectCode: "ACCT",
                    courseNumber: "1234",
                    section: "03",
                    status: "A",
                    shortTitle: "Corporate Accounting 1",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: 40,
                    lastYearEnrollment: 38,
                    majorRestrictions: [],
                    classRestrictions: [],
                    levelRestrictions: [],
                    programRestrictions: [],
                    collegeRestrictions: [],
                    includeMajorRestrictions: true,
                    includeClassRestrictions: true,
                    includeLevelRestrictions: true,
                    includeProgramRestrictions: true,
                    includeCollegeRestrictions: true,
                    waitlistCapacity: 99,
                    campus: "BOS",
                    instructionalMethod: "TR",
                    specialApprovals: "A",
                    billingAttributes: [],
                    honors: "Y",
                    doNotPublish: "N",
                    comment: "",
                    old: {
                        term: "201810",
                        crn: "51515",
                        subjectCode: "ACCT",
                        courseNumber: "1234",
                        section: "03",
                        status: "A",
                        shortTitle: "Corporate Accounting 1",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: 40,
                        lastYearEnrollment: 38,
                        majorRestrictions: [],
                        classRestrictions: [],
                        levelRestrictions: [],
                        programRestrictions: [],
                        collegeRestrictions: [],
                        includeMajorRestrictions: true,
                        includeClassRestrictions: true,
                        includeLevelRestrictions: true,
                        includeProgramRestrictions: true,
                        includeCollegeRestrictions: true,
                        waitlistCapacity: 99,
                        campus: "BOS",
                        instructionalMethod: "TR",
                        specialApprovals: "A",
                        billingAttributes: [],
                        honors: "Y",
                        doNotPublish: "N",
                        comment: ""
                    }
                },
                {
                    term: "201810",
                    crn: "12345",
                    subjectCode: "ACCT",
                    courseNumber: "1235",
                    section: "03",
                    status: "A",
                    shortTitle: "Corporate Accounting 2",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: 40,
                    lastYearEnrollment: 38,
                    majorRestrictions: [],
                    classRestrictions: [],
                    levelRestrictions: [],
                    programRestrictions: [],
                    collegeRestrictions: [],
                    includeMajorRestrictions: true,
                    includeClassRestrictions: true,
                    includeLevelRestrictions: true,
                    includeProgramRestrictions: true,
                    includeCollegeRestrictions: true,
                    waitlistCapacity: 99,
                    campus: "BOS",
                    instructionalMethod: "TR",
                    specialApprovals: "A",
                    billingAttributes: [],
                    honors: "Y",
                    doNotPublish: "N",
                    comment: "",
                    old: {
                        term: "201810",
                        crn: "12345",
                        subjectCode: "ACCT",
                        courseNumber: "1235",
                        section: "03",
                        status: "A",
                        shortTitle: "Corporate Accounting 2",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: 40,
                        lastYearEnrollment: 38,
                        majorRestrictions: [],
                        classRestrictions: [],
                        levelRestrictions: [],
                        programRestrictions: [],
                        collegeRestrictions: [],
                        includeMajorRestrictions: true,
                        includeClassRestrictions: true,
                        includeLevelRestrictions: true,
                        includeProgramRestrictions: true,
                        includeCollegeRestrictions: true,
                        waitlistCapacity: 99,
                        campus: "BOS",
                        instructionalMethod: "TR",
                        specialApprovals: "A",
                        billingAttributes: [],
                        honors: "Y",
                        doNotPublish: "N",
                        comment: ""
                    }
                },
                {
                    term: "201810",
                    crn: "61421",
                    subjectCode: "ACCT",
                    courseNumber: "4444",
                    section: "03",
                    status: "A",
                    shortTitle: "Advanced Accounting",
                    meetingDays: "MWR",
                    meetingStart: "13:35",
                    meetingEnd: "14:40",
                    primaryInstructor: "001303804",
                    secondaryInstructors: [],
                    enrollmentMax: 40,
                    lastYearEnrollment: 38,
                    majorRestrictions: [],
                    classRestrictions: [],
                    levelRestrictions: [],
                    programRestrictions: [],
                    collegeRestrictions: [],
                    includeMajorRestrictions: true,
                    includeClassRestrictions: true,
                    includeLevelRestrictions: true,
                    includeProgramRestrictions: true,
                    includeCollegeRestrictions: true,
                    waitlistCapacity: 99,
                    campus: "BOS",
                    instructionalMethod: "TR",
                    specialApprovals: "A",
                    billingAttributes: [],
                    honors: "Y",
                    doNotPublish: "N",
                    comment: "",
                    old: {
                        term: "201810",
                        crn: "61421",
                        subjectCode: "ACCT",
                        courseNumber: "4444",
                        section: "03",
                        status: "A",
                        shortTitle: "Advanced Accounting",
                        meetingDays: "MWR",
                        meetingStart: "13:35",
                        meetingEnd: "14:40",
                        primaryInstructor: "001303804",
                        secondaryInstructors: [],
                        enrollmentMax: 40,
                        lastYearEnrollment: 38,
                        majorRestrictions: [],
                        classRestrictions: [],
                        levelRestrictions: [],
                        programRestrictions: [],
                        collegeRestrictions: [],
                        includeMajorRestrictions: true,
                        includeClassRestrictions: true,
                        includeLevelRestrictions: true,
                        includeProgramRestrictions: true,
                        includeCollegeRestrictions: true,
                        waitlistCapacity: 99,
                        campus: "BOS",
                        instructionalMethod: "TR",
                        specialApprovals: "A",
                        billingAttributes: [],
                        honors: "Y",
                        doNotPublish: "N",
                        comment: ""
                    }
                }
            ];

            preprocessClasses(schedule);
            return schedule;
        }

        function preprocessClasses(schedule) {
            for (var x = 0; x < schedule.length; x++) {
                var currentClass = schedule[x];

                // marks all modified classes in a schedule as modified
                currentClass.metadata = currentClass.metadata || {};
                currentClass.metadata.modified = ClassService.isClassModified(currentClass);
                currentClass.metadata.added = !currentClass.old;
                currentClass.metadata.deleted = (currentClass.status === "C");

                // generate unique id for each class for angular routing
                currentClass.metadata.unique_id = ClassService.generateUniqueIdForClass(currentClass);
            }
        }

        function saveSchedule(schedule) {
            // communicate with web service
        }

        function submitSchedule(schedule) {
            // communicate with web service
        }

        function rejectSchedule(schedule, rejection_message) {
            schedule.rejection_message = rejection_message;
            // communicate with web service
        }

        function approveSchedule(schedule) {
            // communicate with web service
        }

        // based on logged in user's nuid, gets the appropriate list of schedule metadata in descending order
        function getAllSchedules(nuid) {

            // dummy data for now
            return [
                {
                    departmentCode: "ACCT",
                    term: "201810",
                    term_readable: "Spring 2018",
                    status: "D",
                    last_modifying_user_nuid: "001104152",
                    last_modifying_user_name: "John Smith",
                    timestamp: new Date()
                },
                {
                    departmentCode: "ENTR",
                    term: "201810",
                    term_readable: "Spring 2018"
                },
                {
                    departmentCode: "MKTG",
                    term: "201810",
                    term_readable: "Spring 2018"
                },

            ];
        }

        return api;
    }
})();
