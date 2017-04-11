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
                    termCode: "201810",
                    crn: "41251",
                    subjectCode: "ACCT",
                    courseNumber: "1111",
                    section: "03",
                    status: "A",
                    courseTitle: "Principles of Accounting",
                    meetingDays: "MWR",
                    meetingBeginTime: "13:35",
                    meetingEndTime: "14:40",
                    primaryInstructorID: "000065685",
                    secondaryInstructors: ["001168782", "000065685"],
                    maxEnrollment: 40,
                    priorEnrollment: 38,
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
                    campusCode: "BOS",
                    instructionalMethodCode: "TR",
                    specialApprovalCode: "A",
                    billingAttributes: [],
                    honors: "Y",
                    publish: "Y",
                    comment: "",
                    old: {
                        termCode: "201810",
                        crn: "41251",
                        subjectCode: "ACCT",
                        courseNumber: "1111",
                        section: "03",
                        status: "A",
                        courseTitle: "Principles of Accounting",
                        meetingDays: "MWR",
                        meetingBeginTime: "13:35",
                        meetingEndTime: "14:40",
                        primaryInstructorID: "000065685",
                        secondaryInstructors: [],
                        maxEnrollment: 40,
                        priorEnrollment: 38,
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
                        campusCode: "BOS",
                        instructionalMethodCode: "TR",
                        specialApprovalCode: "A",
                        billingAttributes: [],
                        honors: "Y",
                        publish: "Y",
                        comment: ""
                    }
                },
                {
                    termCode: "201810",
                    crn: "51515",
                    subjectCode: "ACCT",
                    courseNumber: "1234",
                    section: "03",
                    status: "A",
                    courseTitle: "Corporate Accounting 1",
                    meetingDays: "MWR",
                    meetingBeginTime: "13:35",
                    meetingEndTime: "14:40",
                    primaryInstructorID: "000065685",
                    secondaryInstructors: [],
                    maxEnrollment: 40,
                    priorEnrollment: 38,
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
                    campusCode: "BOS",
                    instructionalMethodCode: "TR",
                    specialApprovalCode: "A",
                    billingAttributes: [],
                    honors: "Y",
                    publish: "Y",
                    comment: "",
                    old: {
                        termCode: "201810",
                        crn: "51515",
                        subjectCode: "ACCT",
                        courseNumber: "1234",
                        section: "03",
                        status: "A",
                        courseTitle: "Corporate Accounting 1",
                        meetingDays: "MWR",
                        meetingBeginTime: "13:35",
                        meetingEndTime: "14:40",
                        primaryInstructorID: "000065685",
                        secondaryInstructors: [],
                        maxEnrollment: 40,
                        priorEnrollment: 38,
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
                        campusCode: "BOS",
                        instructionalMethodCode: "TR",
                        specialApprovalCode: "A",
                        billingAttributes: [],
                        honors: "Y",
                        publish: "Y",
                        comment: ""
                    }
                },
                {
                    termCode: "201810",
                    crn: "12345",
                    subjectCode: "ACCT",
                    courseNumber: "1235",
                    section: "03",
                    status: "A",
                    courseTitle: "Corporate Accounting 2",
                    meetingDays: "MWR",
                    meetingBeginTime: "13:35",
                    meetingEndTime: "14:40",
                    primaryInstructorID: "000065685",
                    secondaryInstructors: [],
                    maxEnrollment: 40,
                    priorEnrollment: 38,
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
                    campusCode: "BOS",
                    instructionalMethodCode: "TR",
                    specialApprovalCode: "A",
                    billingAttributes: [],
                    honors: "Y",
                    publish: "Y",
                    comment: "",
                    old: {
                        termCode: "201810",
                        crn: "12345",
                        subjectCode: "ACCT",
                        courseNumber: "1235",
                        section: "03",
                        status: "A",
                        courseTitle: "Corporate Accounting 2",
                        meetingDays: "MWR",
                        meetingBeginTime: "13:35",
                        meetingEndTime: "14:40",
                        primaryInstructorID: "000065685",
                        secondaryInstructors: [],
                        maxEnrollment: 40,
                        priorEnrollment: 38,
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
                        campusCode: "BOS",
                        instructionalMethodCode: "TR",
                        specialApprovalCode: "A",
                        billingAttributes: [],
                        honors: "Y",
                        publish: "Y",
                        comment: ""
                    }
                },
                {
                    termCode: "201810",
                    crn: "61421",
                    subjectCode: "ACCT",
                    courseNumber: "4444",
                    section: "03",
                    status: "A",
                    courseTitle: "Advanced Accounting",
                    meetingDays: "MWR",
                    meetingBeginTime: "13:35",
                    meetingEndTime: "14:40",
                    primaryInstructorID: "000065685",
                    secondaryInstructors: [],
                    maxEnrollment: 40,
                    priorEnrollment: 38,
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
                    campusCode: "BOS",
                    instructionalMethodCode: "TR",
                    specialApprovalCode: "A",
                    billingAttributes: [],
                    honors: "Y",
                    publish: "Y",
                    comment: "",
                    old: {
                        termCode: "201810",
                        crn: "61421",
                        subjectCode: "ACCT",
                        courseNumber: "4444",
                        section: "03",
                        status: "A",
                        courseTitle: "Advanced Accounting",
                        meetingDays: "MWR",
                        meetingBeginTime: "13:35",
                        meetingEndTime: "14:40",
                        primaryInstructorID: "000065685",
                        secondaryInstructors: [],
                        maxEnrollment: 40,
                        priorEnrollment: 38,
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
                        campusCode: "BOS",
                        instructionalMethodCode: "TR",
                        specialApprovalCode: "A",
                        billingAttributes: [],
                        honors: "Y",
                        publish: "Y",
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
                    termCode: "201810",
                    term_readable: "Spring 2018",
                    status: "D",
                    last_modifying_user_nuid: "001104152",
                    last_modifying_user_name: "John Smith",
                    timestamp: new Date()
                },
                {
                    departmentCode: "ENTR",
                    termCode: "201810",
                    term_readable: "Spring 2018"
                },
                {
                    departmentCode: "MKTG",
                    termCode: "201810",
                    term_readable: "Spring 2018"
                },

            ];
        }

        return api;
    }
})();
