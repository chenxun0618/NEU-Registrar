(function () {
    angular
        .module("NEURegistrar")
        .factory("ScheduleService", ScheduleService);

    // a service for handling all schedule-related operations, where a schedule is a
    // collection of classes along with a status ("D"raft, "S"ubmitted, "R"ejected, "A"pproved, or "",
    // meaning not yet loaded into UI) and various metadata about its submission (e.g. submitter name)
    function ScheduleService(ClassService, $http) {

        var api = {
            getScheduleDetail: getScheduleDetail,
            preprocessSchedule: preprocessSchedule,
            saveSchedule: saveSchedule,
            submitSchedule: submitSchedule,
            rejectSchedule: rejectSchedule,
            approveSchedule: approveSchedule,
            scheduleViolatesPeakPeriodProperty: scheduleViolatesPeakPeriodProperty
        };

        // returns http promise for getting all schedule info (classes, submission time if exists, etc.)
        // for given department code. uses different endpoints for admins and non-admins, but this could be consolidated
        function getScheduleDetail(departmentCode, admin) {
            if (admin) {
                var url = "lib/adminGetSched.php?dept=" + departmentCode;
            } else {
                var url = "lib/getScheduleByDept.php?dept=" + departmentCode;
            }
            return $http.get(url);
        }

        // given a schedule directly from database, do some miscellaneous preprocessing before it reaches the UI
        // TODO get the database to return it in a more usable format
        function preprocessSchedule(schedule) {

            // if no classes found for a given subject code, server currently returns a strange object in the
            // classes field -- TODO it should just be an empty array, need to update this
            if (!(schedule.classes.constructor === Array)) {
                schedule.classes = [];
            }

            // TODO misnamed column in database
            schedule.lastEditedBy = schedule.submitterName;
            delete schedule.submitterName;

            for (var x = 0; x < schedule.classes.length; x++) {
                var currentClass = schedule.classes[x];

                // server currently returns "0" or "1" for false and true (as strings)
                currentClass.includeClassRestriction = parseInt(currentClass.includeClassRestriction);
                currentClass.includeCollegeRestriction = parseInt(currentClass.includeCollegeRestriction);
                currentClass.includeLevelRestriction = parseInt(currentClass.includeLevelRestriction);
                currentClass.includeMajorRestriction = parseInt(currentClass.includeMajorRestriction);
                currentClass.includeProgramRestriction = parseInt(currentClass.includeProgramRestriction);
                currentClass.maxEnrollment = parseInt(currentClass.maxEnrollment);
                currentClass.priorEnrollment = parseInt(currentClass.priorEnrollment);
                currentClass.waitlistCapacity = parseInt(currentClass.waitlistCapacity);
                currentClass.section = parseInt(currentClass.section);

                // generate unique id for each class for angular routing (this is necessary)
                currentClass.metadata = currentClass.metadata || {};
                currentClass.metadata.unique_id = ClassService.generateUniqueIdForClass(currentClass);

                // if this is the initial schedule load, copy each class's initial data so that, after the
                // class's properties are edited, they can be compared against the initial state
                if (!schedule.scheduleStatus) {
                    currentClass.old = angular.copy(currentClass);
                }
            }
        }

        // saves schedule to database as draft
        function saveSchedule(nuid, departmentCode, schedule) {
            var newScheduleStatus = "D";
            var url = "lib/userUpdateSchedule.php";
            schedule.lastEditTime = schedule.lastEditTime || generateDBCompatibleTimestamp();
            var obj = {
                NUID: nuid,
                dept: departmentCode,
                timestamp: schedule.lastEditTime,
                action: newScheduleStatus,
                classes: JSON.stringify(schedule.classes)
            };
            return $http.post(url, obj);
        }

        // submits schedule so that registrar's office may view it
        function submitSchedule(nuid, departmentCode, schedule) {
            var newScheduleStatus = "S";
            var url = "lib/userUpdateSchedule.php";
            schedule.lastEditTime = schedule.lastEditTime || generateDBCompatibleTimestamp();
            var obj = {
                NUID: nuid,
                dept: departmentCode,
                timestamp: schedule.lastEditTime,
                action: newScheduleStatus,
                classes: JSON.stringify(schedule.classes)
            };
            return $http.post(url, obj);
        }

        // for admin (registrar) use: rejects a submitted schedule, with a rejection message
        function rejectSchedule(departmentCode, rejectionMessage) {
            var newScheduleStatus = "R";
            var url = "lib/adminUpdateSchedule.php";
            var obj = {
                dept: departmentCode,
                action: newScheduleStatus,
                comment: rejectionMessage
            };
            return $http.post(url, obj);
        }

        // for admin (registrar) use: approves a submitted schedule
        function approveSchedule(departmentCode) {
            var newScheduleStatus = "A";
            var url = "lib/adminUpdateSchedule.php";
            var obj = {
                dept: departmentCode,
                action: newScheduleStatus
            };
            return $http.post(url, obj);
        }

        // returns whether this schedule violates the "peak period" property; e.g.
        // 60% or more of all classes in schedule are during peak periods; we
        // want to warn users if this is the case
        function scheduleViolatesPeakPeriodProperty(schedule) {
            var peakPeriodClasses = 0;
            for (var x = 0; x < schedule.classes.length; x++) {
                var aClass = schedule.classes[x];
                for (var y = 0; y < aClass.meetingTimes.length; y++) {
                    var aMeetingTime = aClass.meetingTimes[y];
                    if (ClassService.isPeakPeriod(aMeetingTime)) {
                        peakPeriodClasses++;
                        break;
                    }
                }
            }

            return (peakPeriodClasses / schedule.classes.length >= .6);
        }

        // returns string that can easily be used in MySQL database as a datetime
        function generateDBCompatibleTimestamp() {
            return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
        }

        return api;
    }
})();
