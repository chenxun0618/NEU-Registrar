(function () {
    angular
        .module("NEURegistrar")
        .factory("ClassService", ClassService);

    function ClassService($http) {

        var api = {
            getCurrentTerm: getCurrentTerm,
            getMostRecentCourseData: getMostRecentCourseData,
            getAllSubjectCodes: getAllSubjectCodes,
            getAllCRNs: getAllCRNs,
            getAllStatuses: getAllStatuses,
            getAllPartOfTerms: getAllPartOfTerms,
            getAllInstructionalMethods: getAllInstructionalMethods,
            getAllCreditHours: getAllCreditHours,
            getAllMeetingDays: getAllMeetingDays,
            getAllCampuses: getAllCampuses,
            getAllSections: getAllSections,
            getAllWaitlist: getAllWaitlist,
            getAllDoNotPublish: getAllDoNotPublish,
            getAllHonors: getAllHonors,
            getAllCancel: getAllCancel,
            getAllSpecialApprovals: getAllSpecialApprovals,
            getAllTimeIntervals: getAllTimeIntervals,
            getAllPrimaryInstructors: getAllPrimaryInstructors,
            getAllSecondaryInstructors: getAllSecondaryInstructors
        };

        function getAllSubjectCodes() {
            return ["ACCT", "CS", "DS", "IS", "MATH", "PHYS", "PSYC"];
        }

        function getAllCRNs() {
            return ["57182", "45124", "91752", "45188", "42144", "58225"];
        }

        function getCurrentTerm() {
            return "201810";
        }

        function getAllStatuses() {
            return ["A", "C", "I"];
        }

        function getAllPartOfTerms() {
            return ["1", "2", "A", "B", "(none)"];
        }

        function getAllInstructionalMethods() {
            return ["HY", "OL", "OOO", "SA", "SAFL", "TR", "VS"];
        }

        function getAllCreditHours() {
            return ["4", "1", "2", "3", "8", "16"]; // ?
        }

        function getAllMeetingDays() {
            return ["MWR", "TF", "MW", "M", "T", "W", "R", "F", "S"];
        }

        function getAllCampuses() {
            return ["BOS", "SEA", "VTL", "XCR"];
        }

        function getAllSections() {
            return ["01", "02", "03", "04"];
        }

        function getAllWaitlist() {
            return ["Y", "N"];
        }

        function getAllDoNotPublish() {
            return ["Y", "N"];
        }

        function getAllHonors() {
            return ["Y", "N"];
        }

        function getAllCancel() {
            return ["Y", "N"];
        }

        function getAllSpecialApprovals() {
            return ["", "A", "D", "G", "I"];
        }

        function getAllTimeIntervals() {
            return ["08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00"];
        }

        function getAllPrimaryInstructors() {
            return [
                {nuid: "001101241", name: "Bob"},
                {nuid: "001106284", name: "Sam"},
                {nuid: "001303804", name: "Jon"},
                {nuid: "001109448", name: "Joe"},
                {nuid: "001105252", name: "Zach"},
                {nuid: "001106462", name: "Matt"},
                {nuid: "001102523", name: "Mark"},
                {nuid: "001109266", name: "Bill"}
            ];
        }

        function getAllSecondaryInstructors() {
            return getAllPrimaryInstructors();
        }

        function getMostRecentCourseData(subjectCode, courseNumber) {

            // dummy for now
            var crn = "" + Math.floor(Math.random() * 10) + "" +
                Math.floor(Math.random() * 10) + "" +
                Math.floor(Math.random() * 10) + "" +
                Math.floor(Math.random() * 10) + "" +
                Math.floor(Math.random() * 10);

            // dummy data for now
            return {
                college: "BA",
                collegeName: "D'Amore-McKim School of Business",
                departmentCode: "ACCT",
                departmentName: "Accounting",
                subjectCode: subjectCode,
                subjectName: "Accounting",
                term: "201810",
                courseNumber: courseNumber,
                section: "03",
                crn: crn,
                // status: "A", ------ unnecessary?
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
            };
        }

        return api;
    }
})();