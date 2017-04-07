CREATE DEFINER=`root`@`localhost` PROCEDURE `getClassesByDept`(IN `dept` VARCHAR(4))
BEGIN
    DECLARE crn VARCHAR(5);

    SELECT
      SSBSECT_TERM_CODE                                  AS 'termCode',
      SSBSECT_COLL_CODE                                  AS 'collegeCode',
      SSBSECT_COLL_DESC                                  AS 'collegeDesc',
      SSBSECT_DEPT_CODE                                  AS 'departmentCode',
      SSBSECT_DEPT_DESC                                  AS 'departmentDesc',
      SSBSECT_CRN                                        AS 'crn',
      SSBSECT_PTRM_CODE                                  AS 'partOfTerm',
      SSBSECT_SUBJ_CODE                                  AS 'subjectCode',
      SSBSECT_CRSE_NUMB                                  AS 'courseNumber',
      SSBSECT_SEQ_NUMB                                   AS 'section',
      SSBSECT_SSTS_CODE                                  AS 'sectionStatus',
      SSBSECT_SCHD_CODE                                  AS 'scheduleTypeCode',
      SSBSECT_SCHD_DESC                                  AS 'scheduleTypeDesc',
      SSBSECT_CAMP_CODE                                  AS 'campusCode',
      SSBSECT_CAMP_DESC                                  AS 'campusDesc',
      SSBSECT_CRSE_TITLE_ALT                             AS 'courseTitleAlter',
      SSBSECT_CRSE_TITLE                                 AS 'courseTitle',
      SSBSECT_CREDIT_HR                                  AS 'creditHour',
      SSBSECT_BILLING_HR                                 AS 'billingHour',
      SSBSECT_MAX_ENRL                                   AS 'maxEnrollment',
      SSBSECT_INSM_CODE                                  AS 'instructionalMethodCode',
      SSBSECT_INSM_DESC                                  AS 'instructionalMethodDesc',
      SSBSECT_PRIOR_ENRL                                 AS 'previousEnrollment',
      SSRMEET_START_DATE                                 AS 'startDate',
      SSRMEET_END_DATE                                   AS 'endDate',
      SSRMEET_BEGIN_TIME                                 AS 'beginTime',
      SSRMEET_END_TIME                                   AS 'endTime',
      SSRMEET_DAYS                                       AS 'days',
      SIRASGN_ID                                         AS 'primaryInstructorID',
      CONCAT(SIRASGN_FIRST_NAME, ' ', SIRASGN_LAST_NAME) AS 'primaryInstructorName'
    FROM ssbsect
      INNER JOIN ssrmeet ON SSBSECT_CRN = SSRMEET_CRN
      INNER JOIN sirasgn ON SSBSECT_CRN = SIRASGN_CRN
    WHERE SSBSECT_DEPT_CODE = dept;
  END