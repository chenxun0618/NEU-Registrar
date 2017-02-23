(function () {
    angular
        .module("NEURegistrar")
        .factory("ClassService", ClassService);

    function ClassService($http) {

        var api = {
            getAllSubjectCodes: getAllSubjectCodes,
            getAllCRNs: getAllCRNs,
            getCurrentTerm: getCurrentTerm,
            getAllStatuses: getAllStatuses,
            getAllPartOfTerms: getAllPartOfTerms,
            getAllInstructionalMethods: getAllInstructionalMethods,
            getAllCreditHours: getAllCreditHours,
            getCampus: getCampus,
            getAllSections: getAllSections,
            getAllWaitlist: getAllWaitlist,
            getAllDoNotPublish: getAllDoNotPublish,
            getAllSpecialApprovals: getAllSpecialApprovals,
            getClassByCRN: getClassByCRN
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

        function getCampus() {
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

        function getAllSpecialApprovals() {
            return ["A", "D", "G", "I"];
        }

        function getClassByCRN(crn) {

            // dummy data for now
            return {
                college: "BA",
                collegeName: "D'Amore-McKim School of Business",
                departmentCode: "ACCT",
                departmentName: "Accounting",
                subjectCode: "ACCT",
                subjectCode: "Accounting",
                term: "201810",
                courseNumber: "1225",
                section: "03",
                crn: crn,
                // status: "A", ------ unnecessary?
                partOfTerm: "1",
                shortTitle: "Principles of Accounting",
                instructionalMethod: "TR",
                creditHour: "4",
                meetingDays: "MWR",
                meetingStart: "1335",
                meetingEnd: "1440",
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
            };
        }

        return api;
    }
})();