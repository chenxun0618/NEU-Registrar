(function () {
    angular
        .module("NEURegistrar")
        .factory("ClassService", ClassService);

    function ClassService() {

        var api = {
            getCurrentTerm: getCurrentTerm,
            getAllSubjectCodes: getAllSubjectCodes,
            getCourseDataFromCatalog: getCourseDataFromCatalog,
            getAllMeetingDays: getAllMeetingDays,
            getAllTimeIntervals: getAllTimeIntervals,
            getAllPrimaryInstructors: getAllPrimaryInstructors,
            getAllSecondaryInstructors: getAllSecondaryInstructors,
            getAllRestrictions: getAllRestrictions,
            getAllInstructionalMethods: getAllInstructionalMethods,
            getAllCampuses: getAllCampuses,
            getAllSpecialApprovals: getAllSpecialApprovals,
            getAllBillingAttributes: getAllBillingAttributes,
            getYesOrNo: getYesOrNo,
            generateUniqueIdForClass: generateUniqueIdForClass,
            isClassModified: isClassModified,
            getInvalidClassReasons: getInvalidClassReasons
        };

        function getCurrentTerm() {
            return "201810";
        }

        function getAllSubjectCodes() {
            return ["ACCT", "CS", "DS", "IS", "MATH", "PHYS", "PSYC"];
        }

        function getAllMeetingDays() {
            return ["MWR", "TF", "MW", "M", "T", "W", "R", "F", "S"];
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

        function getAllRestrictions() {
            return {
                majorRestrictions: [
                    {
                        majorCode: "HISE",
                        majorDescription: "Health Info Software Eng"
                    },
                    {
                        majorCode: "MELS",
                        majorDescription: "Medical Laboratory Science"
                    },
                    {
                        majorCode: "RCRA",
                        majorDescription: "Regulatory Compliance"
                    }
                ],
                classRestrictions: [
                    {
                        classCode: "GR",
                        classDescription: "Graduate"
                    },
                    {
                        classCode: "JR",
                        classDescription: "Junior"
                    },
                    {
                        classCode: "SR",
                        classDescription: "Senior"
                    }
                ],
                levelRestrictions: [
                    {
                        levelCode: "UG",
                        levelDescription: "Undergraduate"
                    },
                    {
                        levelCode: "GP",
                        levelDescription: "CPS - Graduate"
                    },
                    {
                        levelCode: "LW",
                        levelDescription: "Law"
                    }
                ],
                programRestrictions: [],
                collegeRestrictions: []
            }
        }

        function getAllInstructionalMethods() {
            return ["HY", "OL", "OOO", "SA", "SAFL", "TR", "VS"];
        }

        function getAllCampuses() {
            return ["BOS", "SEA", "VTL", "XCR"];
        }

        function getAllSpecialApprovals() {
            return ["", "A", "D", "G", "I"];
        }

        function getAllBillingAttributes() {
            return [
                {
                    billingAttributeCode: "EDOL",
                    billingAttributeDescription: "COE-Developed online"
                },
                {
                    billingAttributeCode: "GB0P",
                    billingAttributeDescription: "GSBA MS Innovation"
                },
                {
                    billingAttributeCode: "GB3S",
                    billingAttributeDescription: "GSSC Three Seas Program"
                },
                {
                    billingAttributeCode: "GBCS",
                    billingAttributeDescription: "GSCS Computer & Info Science"
                },
            ];
        }

        function getYesOrNo() {
            return ["Y", "N"];
        }

        function getCourseDataFromCatalog(subjectCode, courseNumber) {

            // dummy data for now
            var dummy = {
                college: "BA",
                collegeName: "D'Amore-McKim School of Business",
                departmentCode: "ACCT",
                departmentName: "Accounting",
                subjectCode: subjectCode,
                subjectName: "Accounting",
                term: "201810",
                courseNumber: courseNumber,
                section: "01",
                shortTitle: "Principles of Accounting",
            };

            fillDefaultData(dummy);

            return dummy;
        }

        function fillDefaultData(aClass) {
            aClass.secondaryInstructors = [];
            aClass.majorRestrictions = [];
            aClass.classRestrictions = [];
            aClass.levelRestrictions = [];
            aClass.programRestrictions = [];
            aClass.collegeRestrictions = [];
            aClass.includeMajorRestrictions = true;
            aClass.includeClassRestrictions = true;
            aClass.includeLevelRestrictions = true;
            aClass.includeProgramRestrictions = true;
            aClass.includeCollegeRestrictions = true;
            aClass.specialApprovals = "";
            aClass.billingAttributes = [];
            aClass.honors = "N";
            aClass.doNotPublish = "N";
            aClass.cancel = "N";
            aClass.comment = "";
        }

        function generateUniqueIdForClass(aClass) {
            return (aClass.crn) || (aClass.term + aClass.subjectCode + aClass.courseNumber + aClass.section);
        }

        // determines if a given class has been modified from its old data by examining all properties
        function isClassModified(aClass) {
            return (!aClass.old) || !(
                (aClass.term === aClass.old.term) &&
                (aClass.crn === aClass.old.crn) &&
                (aClass.subjectCode === aClass.old.subjectCode) &&
                (aClass.courseNumber === aClass.old.courseNumber) &&
                (aClass.section === aClass.old.section) &&
                (aClass.shortTitle === aClass.old.shortTitle) &&
                (aClass.meetingDays === aClass.old.meetingDays) &&
                (aClass.meetingStart === aClass.old.meetingStart) &&
                (aClass.meetingEnd === aClass.old.meetingEnd) &&
                (aClass.primaryInstructor === aClass.old.primaryInstructor) &&
                (arraysEqual(aClass.secondaryInstructors, aClass.old.secondaryInstructors)) &&
                (aClass.enrollmentMax === aClass.old.enrollmentMax) &&
                (aClass.lastYearEnrollment === aClass.old.lastYearEnrollment) &&
                (arraysEqual(aClass.majorRestrictions, aClass.old.majorRestrictions)) &&
                (arraysEqual(aClass.classRestrictions, aClass.old.classRestrictions)) &&
                (arraysEqual(aClass.levelRestrictions, aClass.old.levelRestrictions)) &&
                (arraysEqual(aClass.programRestrictions, aClass.old.programRestrictions)) &&
                (arraysEqual(aClass.collegeRestrictions, aClass.old.collegeRestrictions)) &&
                (aClass.includeMajorRestrictions === aClass.old.includeMajorRestrictions) &&
                (aClass.includeClassRestrictions === aClass.old.includeClassRestrictions) &&
                (aClass.includeLevelRestrictions === aClass.old.includeLevelRestrictions) &&
                (aClass.includeProgramRestrictions === aClass.old.includeProgramRestrictions) &&
                (aClass.includeCollegeRestrictions === aClass.old.includeCollegeRestrictions) &&
                (aClass.waitlistCapacity === aClass.old.waitlistCapacity) &&
                (aClass.campus === aClass.old.campus) &&
                (aClass.instructionalMethod === aClass.old.instructionalMethod) &&
                (aClass.specialApprovals === aClass.old.specialApprovals) &&
                (arraysEqual(aClass.billingAttributes, aClass.old.billingAttributes)) &&
                (aClass.honors === aClass.old.honors) &&
                (aClass.doNotPublish === aClass.old.doNotPublish) &&
                (aClass.cancel === aClass.old.cancel) &&
                (aClass.comment === aClass.old.comment)
            );
        }

        function getInvalidClassReasons(aClass) {
            var invalidReasons = [];

            if (!aClass.term || !(/^\d{6}$/.test(aClass.term))) { // 6 digit number
                invalidReasons.push("Invalid term: " + aClass.term);
            }
            if (aClass.crn && !(/^\d{5}$/.test(aClass.crn))) { // 5 digit number
                invalidReasons.push("Invalid CRN: " + aClass.crn);
            }
            if (!getAllSubjectCodes().includes(aClass.subjectCode)) {
                invalidReasons.push("Invalid subject code: " + aClass.subjectCode);
            }
            if (!aClass.courseNumber || !(typeof aClass.courseNumber === "string") || !(/^\d{4}$/.test(aClass.courseNumber))) {
                invalidReasons.push("Invalid course number: " + aClass.courseNumber);
            }
            if (aClass.section && !(/^\d{2}$/.test(aClass.section))) {
                invalidReasons.push("Invalid section: " + aClass.section);
            }
            if (!aClass.shortTitle) {
                invalidReasons.push("Invalid title: " + aClass.shortTitle);
            }
            if (!aClass.meetingDays) {
                invalidReasons.push("Invalid meeting days: " + aClass.meetingDays);
            }
            if (!aClass.meetingStart || (aClass.meetingStart > aClass.meetingEnd)) {
                invalidReasons.push("Invalid meeting start time: " + aClass.meetingStart);
            }
            if (!aClass.meetingEnd || (aClass.meetingStart > aClass.meetingEnd)) {
                invalidReasons.push("Invalid meeting end time: " + aClass.meetingEnd);
            }
            if (!aClass.primaryInstructor) {
                invalidReasons.push("Invalid primary instructor: " + aClass.primaryInstructor);
            }
            if (!(aClass.secondaryInstructors === undefined || aClass.secondaryInstructors === null || aClass.secondaryInstructors.constructor === Array)) {
                invalidReasons.push("Invalid secondary instructors: " + aClass.secondaryInstructors);
            }
            if (!aClass.enrollmentMax || !(typeof aClass.enrollmentMax === 'number') || !(aClass.enrollmentMax > 0)) {
                invalidReasons.push("Invalid enrollment maximum: " + aClass.enrollmentMax);
            }
            if (aClass.lastYearEnrollment && (!(typeof aClass.lastYearEnrollment === 'number') || !(aClass.lastYearEnrollment > 0))) {
                invalidReasons.push("Invalid enrollment maximum: " + aClass.lastYearEnrollment);
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
            if (!getAllCampuses().includes(aClass.campus)) {
                invalidReasons.push("Invalid campus code: " + aClass.campus);
            }
            if (!getAllInstructionalMethods().includes(aClass.instructionalMethod)) {
                invalidReasons.push("Invalid instructional method: " + aClass.instructionalMethod);
            }
            if (!getYesOrNo().includes(aClass.doNotPublish)) {
                invalidReasons.push("Invalid \"do not publish\" indicator: " + aClass.doNotPublish);
            }
            if (!getAllSpecialApprovals().includes(aClass.specialApprovals)) {
                invalidReasons.push("Invalid special approval indicator: " + aClass.specialApprovals);
            }
            if (!getYesOrNo().includes(aClass.honors)) {
                invalidReasons.push("Invalid honors indicator: " + aClass.honors);
            }
            if (!getYesOrNo().includes(aClass.cancel)) {
                invalidReasons.push("Invalid cancel indicator: " + aClass.cancel);
            }

            return invalidReasons;
        }

        return api;
    }
})();