(function () {
    angular
        .module("NEURegistrar")
        .factory("ClassService", ClassService);

    function ClassService($http) {

        var api = {
            getAllSubjectCodes: getAllSubjectCodes,
            getAllSubmittedSchedules: getAllSubmittedSchedules,
            getAllCRNs: getAllCRNs,
            getCurrentTerm: getCurrentTerm,
            getAllStatuses: getAllStatuses,
            getAllPartOfTerms: getAllPartOfTerms,
            getAllInstructionalMethods: getAllInstructionalMethods,
            getAllCreditHours: getAllCreditHours,
            getAllMeetingDays: getAllMeetingDays,
            getAllCampuses: getAllCampuses,
            getAllSections: getAllSections,
            getAllWaitlist: getAllWaitlist,
            getAllDoNotPublish: getAllDoNotPublish,
            getAllSpecialApprovals: getAllSpecialApprovals,
            getClassByCRN: getClassByCRN
        };

        function getAllSubmittedSchedules() {

            // dummy data for now
            return [
                {
                    term: "Spring 2014",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 1 2014",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 2 2014",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Fall 2014",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Spring 2015",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 1 2015",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 2 2015",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Fall 2015",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Spring 2016",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 1 2016",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 2 2016",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Fall 2016",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Spring 2017",
                    submitter: "001104152",
                    draft: false,
                    schedule: []
                },
                {
                    term: "Summer 1 2017",
                    submitter: "001104152",
                    draft: true,
                    schedule: []
                }
            ];
        }

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
                subjectName: "Accounting",
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
            };
        }

        return api;
    }
})();