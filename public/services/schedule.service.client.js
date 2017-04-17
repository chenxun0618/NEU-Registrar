(function () {
    angular
        .module("NEURegistrar")
        .factory("ScheduleService", ScheduleService);

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

        function getScheduleDetail(selectedDepartment, user) {
            if (user.admin) {
                var url = "/lib/adminGetSched.php?dept=" + selectedDepartment.departmentCode;
            } else {
                var url = "/lib/getScheduleByDept.php?dept=" + selectedDepartment.departmentCode;
            }
            return $http.get(url);
        }

        function preprocessSchedule(schedule) {

            // if no classes found for a given subject code, server currently returns a strange object in the
            // classes field -- it should just be an empty array, need to update this
            if (!(schedule.classes.constructor === Array)) {
                schedule.classes = [];
            }

            // misnamed column in database
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

                // marks all modified classes in a schedule as modified
                // currentClass.metadata = currentClass.metadata || {};
                // currentClass.metadata.modified = ClassService.isClassModified(currentClass);
                // currentClass.metadata.added = !currentClass.old;
                // currentClass.metadata.deleted = (currentClass.status === "C");

                // generate unique id for each class for angular routing
                currentClass.metadata = currentClass.metadata || {};
                currentClass.metadata.unique_id = ClassService.generateUniqueIdForClass(currentClass);

                if (!currentClass.old) {
                    currentClass.old = angular.copy(currentClass);
                }
            }
        }

        function saveSchedule(nuid, departmentCode, schedule) {
            var newScheduleStatus = "D";
            var url = "/lib/userUpdateSchedule.php";
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

        function submitSchedule(nuid, departmentCode, schedule) {
            var newScheduleStatus = "S";
            var url = "/lib/userUpdateSchedule.php";
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

        function rejectSchedule(schedule, rejectionMessage) {
            schedule.rejectionMessage = rejectionMessage;
            // communicate with web service
        }

        function approveSchedule(schedule) {
            // communicate with web service
        }

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

        function generateDBCompatibleTimestamp() {
            return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
        }

        return api;
    }
})();
