(function () {
    angular
        .module("NEURegistrar")
        .factory("ClassService", ClassService);

    function ClassService($http) {

        var api = {
            getDropdownValues: getDropdownValues,
            getCurrentTerm: getCurrentTerm,
            getAllSubjectCodesInDept: getAllSubjectCodesInDept,
            getAllStatuses: getAllStatuses,
            getCourseDataFromCatalog: getCourseDataFromCatalog,
            fillDefaultData: fillDefaultData,
            getAllMeetingDays: getAllMeetingDays,
            getAllTimeIntervals: getAllTimeIntervals,
            getAllInstructors: getAllInstructors,
            getAllSpecialApprovals: getAllSpecialApprovals,
            getYesOrNo: getYesOrNo,
            generateUniqueIdForClass: generateUniqueIdForClass,
            isClassModified: isClassModified,
            getInvalidClassReasons: getInvalidClassReasons
        };

        function getDropdownValues() {
            var url = "/lib/Dropdowns.php";
            return $http.get(url);
        }

        function getCurrentTerm() {
            return "201810";
        }

        function getAllSubjectCodesInDept(dept) {
            var url = "/connection/getAllSubjectCodesInDept.php?dept=" + dept;
            return $http.get(url);
        }

        function getAllSpecialApprovals() {
            return [{code: "", desc: ""}, {code: "A", desc: "Advisor"}, {code: "D", desc: "Department"},
                {code: "G", desc: "Graduate Director"}, {code: "I", desc: "Instructor"}];
        }

        function getAllStatuses() {
            return ["Active", "Cancelled"];
        }

        function getAllMeetingDays() {
            return ["MWR", "TF", "MW", "M", "T", "W", "R", "F", "S"];
        }

        function getAllTimeIntervals() {
            return ["0800", "0805", "0810", "0815", "0820", "0825", "0830", "0835", "0840", "0845", "0850", "0855", "0900", "0905", "0910", "0915", "0920", "0925", "0930", "0935", "0940", "0945", "0950", "0955", "1000", "1005", "1010", "1015", "1020", "1025", "1030", "1035", "1040", "1045", "1050", "1055", "1100", "1105", "1110", "1115", "1120", "1125", "1130", "1135", "1140", "1145", "1150", "1155", "1200", "1205", "1210", "1215", "1220", "1225", "1230", "1235", "1240", "1245", "1250", "1255", "1300", "1305", "1310", "1315", "1320", "1325", "1330", "1335", "1340", "1345", "1350", "1355", "1400", "1405", "1410", "1415", "1420", "1425", "1430", "1435", "1440", "1445", "1450", "1455", "1500", "1505", "1510", "1515", "1520", "1525", "1530", "1535", "1540", "1545", "1550", "1555", "1600", "1605", "1610", "1615", "1620", "1625", "1630", "1635", "1640", "1645", "1650", "1655", "1700", "1705", "1710", "1715", "1720", "1725", "1730", "1735", "1740", "1745", "1750", "1755", "1800", "1805", "1810", "1815", "1820", "1825", "1830", "1835", "1840", "1845", "1850", "1855", "1900", "1905", "1910", "1915", "1920", "1925", "1930", "1935", "1940", "1945", "1950", "1955", "2000", "2005", "2010", "2015", "2020", "2025", "2030", "2035", "2040", "2045", "2050", "2055", "2100", "2105", "2110", "2115", "2120", "2125", "2130", "2135", "2140", "2145", "2150", "2155", "2200"];
        }

        function getAllInstructors() {
            var url = "/connection/getInstructors.php";
            return $http.get(url);
        }

        function getYesOrNo() {
            return ["Y", "N"];
        }

        function getCourseDataFromCatalog(subjectCode, courseNumber) {
            var url = "/lib/courseCatalogLookup.php?subjectCode=" + subjectCode + "&courseNumber=" + courseNumber;
            return $http.get(url);
        }

        function fillDefaultData(aClass, schedule) {
            aClass.termCode = getCurrentTerm();
            aClass.status = "Active";
            aClass.majorRestrictions = [];
            aClass.classRestrictions = [];
            aClass.levelRestrictions = [];
            aClass.programRestrictions = [];
            aClass.collegeRestrictions = [];
            aClass.includeMajorRestriction = 1;
            aClass.includeClassRestriction = 1;
            aClass.includeLevelRestriction = 1;
            aClass.includeProgramRestriction = 1;
            aClass.includeCollegeRestriction = 1;
            aClass.specialApprovalCode = "";
            aClass.attributeCode = [];
            aClass.publish = "Y";
            aClass.comment = "";

            aClass.section = findMinimalSection(aClass, schedule);
        }

        function findMinimalSection(aClass, schedule) {
            var minSection = 0;

            for (var x = 0; x < schedule.classes.length; x++) {
                var currentClass = schedule.classes[x];
                if (aClass.subjectCode === currentClass.subjectCode && aClass.courseNumber === currentClass.courseNumber) {
                    minSection = Math.max(minSection, currentClass.section);
                }
            }

            return minSection + 1;
        }

        function generateUniqueIdForClass(aClass) {
            return (aClass.crn) || (aClass.termCode + aClass.subjectCode + aClass.courseNumber + aClass.section);
        }

        // determines if a given class has been modified from its old data by examining all properties
        function isClassModified(aClass) {
            return (!aClass.old) || !(
                (aClass.termCode === aClass.old.termCode) &&
                (aClass.status === aClass.old.status) &&
                (aClass.crn === aClass.old.crn) &&
                (aClass.subjectCode === aClass.old.subjectCode) &&
                (aClass.courseNumber === aClass.old.courseNumber) &&
                (aClass.section === aClass.old.section) &&
                (aClass.courseTitle === aClass.old.courseTitle) &&
                (aClass.meetingDays === aClass.old.meetingDays) &&
                (aClass.meetingBeginTime === aClass.old.meetingBeginTime) &&
                (aClass.meetingEndTime === aClass.old.meetingEndTime) &&
                (aClass.primaryInstructorID === aClass.old.primaryInstructorID) &&
                (aClass.maxEnrollment === aClass.old.maxEnrollment) &&
                (aClass.priorEnrollment === aClass.old.priorEnrollment) &&
                (arraysEqual(aClass.majorRestrictions, aClass.old.majorRestrictions)) &&
                (arraysEqual(aClass.classRestrictions, aClass.old.classRestrictions)) &&
                (arraysEqual(aClass.levelRestrictions, aClass.old.levelRestrictions)) &&
                (arraysEqual(aClass.programRestrictions, aClass.old.programRestrictions)) &&
                (arraysEqual(aClass.collegeRestrictions, aClass.old.collegeRestrictions)) &&
                (aClass.includeMajorRestriction === aClass.old.includeMajorRestriction) &&
                (aClass.includeClassRestriction === aClass.old.includeClassRestriction) &&
                (aClass.includeLevelRestriction === aClass.old.includeLevelRestriction) &&
                (aClass.includeProgramRestriction === aClass.old.includeProgramRestriction) &&
                (aClass.includeCollegeRestriction === aClass.old.includeCollegeRestriction) &&
                (aClass.waitlistCapacity === aClass.old.waitlistCapacity) &&
                (aClass.campusCode === aClass.old.campusCode) &&
                (aClass.instructionalMethodCode === aClass.old.instructionalMethodCode) &&
                (aClass.specialApprovalCode === aClass.old.specialApprovalCode) &&
                (arraysEqual(aClass.attributeCode, aClass.old.attributeCode)) &&
                (aClass.publish === aClass.old.publish)
            );
        }

        function getInvalidClassReasons(aClass) {
            var invalidReasons = [];

            if (!aClass.termCode || !(/^\d{6}$/.test(aClass.termCode))) { // 6 digit number
                invalidReasons.push("Invalid term code: " + aClass.termCode);
            }
            if (!["Active", "Cancelled"].includes(aClass.status)) {
                invalidReasons.push("Invalid status: " + aClass.status);
            }
            if (aClass.crn && !(/^\d{5}$/.test(aClass.crn))) { // 5 digit number
                invalidReasons.push("Invalid CRN: " + aClass.crn);
            }
            if (!aClass.courseNumber || !(typeof aClass.courseNumber === "string") || !(/^\d{4}$/.test(aClass.courseNumber))) {
                invalidReasons.push("Invalid course number: " + aClass.courseNumber);
            }
            if (!aClass.section || (aClass.section && !(0 < aClass.section && aClass.section < 100))) {
                invalidReasons.push("Invalid section: " + aClass.section);
            }
            if (!aClass.courseTitle) {
                invalidReasons.push("Invalid title: " + aClass.courseTitle);
            }
            if (!aClass.meetingDays) {
                invalidReasons.push("Invalid meeting days: " + aClass.meetingDays);
            }
            if (!aClass.meetingBeginTime || (aClass.meetingBeginTime > aClass.meetingEndTime)) {
                invalidReasons.push("Invalid meeting start time: " + aClass.meetingBeginTime);
            }
            if (!aClass.meetingEndTime || (aClass.meetingBeginTime > aClass.meetingEndTime)) {
                invalidReasons.push("Invalid meeting end time: " + aClass.meetingEndTime);
            }
            if (!aClass.primaryInstructorID) {
                invalidReasons.push("Invalid primary instructor: " + aClass.primaryInstructorID);
            }
            if (!aClass.maxEnrollment || !(typeof aClass.maxEnrollment === 'number') || !(aClass.maxEnrollment > 0)) {
                invalidReasons.push("Invalid maximum enrollment: " + aClass.maxEnrollment);
            }
            if (aClass.priorEnrollment && (!(typeof aClass.priorEnrollment === 'number') || !(aClass.priorEnrollment > 0))) {
                invalidReasons.push("Invalid prior enrollment: " + aClass.priorEnrollment);
            }
            if (!(aClass.majorRestrictions === undefined || aClass.majorRestrictions === null || aClass.majorRestrictions.constructor === Array)) {
                invalidReasons.push("Invalid major restrictions: " + aClass.majorRestrictions);
            }
            if (!(aClass.classRestrictions === undefined || aClass.classRestrictions === null || aClass.classRestrictions.constructor === Array)) {
                invalidReasons.push("Invalid class restrictions: " + aClass.classRestrictions);
            }
            if (!(aClass.levelRestrictions === undefined || aClass.levelRestrictions === null || aClass.levelRestrictions.constructor === Array)) {
                invalidReasons.push("Invalid level restrictions: " + aClass.levelRestrictions);
            }
            if (!(aClass.programRestrictions === undefined || aClass.programRestrictions === null || aClass.programRestrictions.constructor === Array)) {
                invalidReasons.push("Invalid program restrictions: " + aClass.programRestrictions);
            }
            if (!(aClass.collegeRestrictions === undefined || aClass.collegeRestrictions === null || aClass.collegeRestrictions.constructor === Array)) {
                invalidReasons.push("Invalid college restrictions: " + aClass.collegeRestrictions);
            }
            if (!(typeof aClass.waitlistCapacity === 'number' && aClass.waitlistCapacity >= 0)) {
                invalidReasons.push("Invalid waitlist capacity: " + aClass.waitlistCapacity);
            }
            if (!aClass.campusCode) {
                invalidReasons.push("Campus code is required");
            }
            if (!getYesOrNo().includes(aClass.publish)) {
                invalidReasons.push("Invalid publish indicator: " + aClass.publish);
            }
            if (!["", "A", "D", "G", "I"].includes(aClass.specialApprovalCode)) {
                invalidReasons.push("Invalid special approval code: " + aClass.specialApprovalCode);
            }

            return invalidReasons;
        }

        return api;
    }
})();