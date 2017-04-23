CREATE DEFINER=`root`@`localhost` PROCEDURE `getClassesByDept`(IN dept VARCHAR(4))
BEGIN
    DROP TABLE IF EXISTS major;
    CREATE TEMPORARY TABLE major AS (
      SELECT
        SSRRMAJ_CRN,
        MAX(SSRRMAJ_MAJOR_IND)                                               AS includeMajorRestriction,
        CONCAT('["', GROUP_CONCAT(SSRRMAJ_MAJR_CODE SEPARATOR '", "'), '"]') AS majorRestrictions
      FROM ssrrmaj
      GROUP BY SSRRMAJ_CRN);

    DROP TABLE IF EXISTS class;
    CREATE TEMPORARY TABLE class AS (
      SELECT
        SSRRCLS_CRN,
        MAX(SSRRCLS_CLASS_IND)                                               AS includeClassRestriction,
        CONCAT('["', GROUP_CONCAT(SSRRCLS_CLAS_CODE SEPARATOR '", "'), '"]') AS classRestrictions
      FROM ssrrcls
      GROUP BY SSRRCLS_CRN);

    DROP TABLE IF EXISTS `level`;
    CREATE TEMPORARY TABLE `level` AS (
      SELECT
        SSRRLVL_CRN,
        MAX(SSRRLVL_LEVL_IND)                                                AS includeLevelRestriction,
        CONCAT('["', GROUP_CONCAT(SSRRLVL_LEVL_CODE SEPARATOR '", "'), '"]') AS levelRestrictions
      FROM ssrrlvl
      GROUP BY SSRRLVL_CRN);

    DROP TABLE IF EXISTS program;
    CREATE TEMPORARY TABLE program AS (
      SELECT
        SSRRPRG_CRN,
        MAX(SSRRPRG_PROGRAM_IND)                                           AS includeProgramRestriction,
        CONCAT('["', GROUP_CONCAT(SSRRPRG_PROGRAM SEPARATOR '", "'), '"]') AS programRestrictions
      FROM ssrrprg
      GROUP BY SSRRPRG_CRN);

    DROP TABLE IF EXISTS college;
    CREATE TEMPORARY TABLE college AS (
      SELECT
        SSRRCOL_CRN,
        MAX(SSRRCOL_COLL_IND)                                                AS includeCollegeRestriction,
        CONCAT('["', GROUP_CONCAT(SSRRCOL_COLL_CODE SEPARATOR '", "'), '"]') AS collegeRestrictions
      FROM ssrrcol
      GROUP BY SSRRCOL_CRN);

    DROP TABLE IF EXISTS attribute;
    CREATE TEMPORARY TABLE attribute AS (
      SELECT
        SSRATTR_CRN,
        CONCAT('["', GROUP_CONCAT(SSRATTR_ATTR_CODE SEPARATOR '", "'), '"]') AS attributeCode
      FROM ssrattr
      GROUP BY SSRATTR_CRN);

    DROP TABLE IF EXISTS times;
    CREATE TEMPORARY TABLE times AS (
      SELECT
        SSRMEET_CRN,
        CONCAT('[', GROUP_CONCAT('{"beginTime":"', SSRMEET_BEGIN_TIME, '",',
                                 '"endTime":"', SSRMEET_END_TIME, '",',
                                 '"days":"', SSRMEET_DAYS, '"}' SEPARATOR ', '), ']') AS meetingTimes
      FROM ssrmeet
      GROUP BY SSRMEET_CRN);

    ALTER TABLE times
      ADD PRIMARY KEY (SSRMEET_CRN);
    CALL updateTimesTable();

    SELECT
      SSBSECT_TERM_CODE                                  AS 'termCode',
      SSBSECT_CRN                                        AS 'crn',
      SSBSECT_SUBJ_CODE                                  AS 'subjectCode',
      SSBSECT_CRSE_NUMB                                  AS 'courseNumber',
      SSBSECT_SEQ_NUMB                                   AS 'section',
      SSBSECT_SSTS_CODE                                  AS 'status',
      SSBSECT_SCHD_CODE                                  AS 'scheduleTypeCode',
      SSBSECT_CAMP_CODE                                  AS 'campusCode',
      SSBSECT_CRSE_TITLE                                 AS 'courseTitle',
      SSBSECT_MAX_ENRL                                   AS 'maxEnrollment',
      SSBSECT_INSM_CODE                                  AS 'instructionalMethodCode',
      SSBSECT_PRIOR_ENRL                                 AS 'priorEnrollment',
      SSBSECT_WAIT_CCAPACITY                             AS 'waitlistCapacity',
      SSBSECT_SAPR_CODE                                  AS 'specialApprovalCode',
      PUBLISH_IND                                        AS 'publish',
      IFNULL(meetingTimes, '[]')                         AS meetingTimes,
      SIRASGN_ID                                         AS 'primaryInstructorID',
      CONCAT(SIRASGN_FIRST_NAME, ' ', SIRASGN_LAST_NAME) AS 'primaryInstructorName',
      IF(includeMajorRestriction = 'E', 0, 1)            AS includeMajorRestriction,
      IF(includeClassRestriction = 'E', 0, 1)            AS includeClassRestriction,
      IF(includeLevelRestriction = 'E', 0, 1)            AS includeLevelRestriction,
      IF(includeProgramRestriction = 'E', 0, 1)          AS includeProgramRestriction,
      IF(includeCollegeRestriction = 'E', 0, 1)          AS includeCollegeRestriction,
      IF(JSON_EXTRACT(majorRestrictions, '$[0]') = "",
         JSON_REMOVE(majorRestrictions, '$[0]'),
         IFNULL(majorRestrictions, '[]'))                AS majorRestrictions,
      IF(JSON_EXTRACT(classRestrictions, '$[0]') = "",
         JSON_REMOVE(classRestrictions, '$[0]'),
         IFNULL(classRestrictions, '[]'))                AS classRestrictions,
      IF(JSON_EXTRACT(levelRestrictions, '$[0]') = "",
         JSON_REMOVE(levelRestrictions, '$[0]'),
         IFNULL(levelRestrictions, '[]'))                AS levelRestrictions,
      IF(JSON_EXTRACT(programRestrictions, '$[0]') = "",
         JSON_REMOVE(programRestrictions, '$[0]'),
         IFNULL(programRestrictions, '[]'))              AS programRestrictions,
      IF(JSON_EXTRACT(collegeRestrictions, '$[0]') = "",
         JSON_REMOVE(collegeRestrictions, '$[0]'),
         IFNULL(collegeRestrictions, '[]'))              AS collegeRestrictions,
      IFNULL(attributeCode, '[]')                        AS attributeCode

    FROM ssbsect
      LEFT JOIN sirasgn ON SSBSECT_CRN = SIRASGN_CRN
      LEFT JOIN major ON SSBSECT_CRN = SSRRMAJ_CRN
      LEFT JOIN class ON SSBSECT_CRN = SSRRCLS_CRN
      LEFT JOIN `level` ON SSBSECT_CRN = SSRRLVL_CRN
      LEFT JOIN program ON SSBSECT_CRN = SSRRPRG_CRN
      LEFT JOIN college ON SSBSECT_CRN = SSRRCOL_CRN
      LEFT JOIN attribute ON SSBSECT_CRN = SSRATTR_CRN
      LEFT JOIN times ON SSBSECT_CRN = SSRMEET_CRN
    WHERE SSBSECT_DEPT_CODE = dept
    ORDER BY SSBSECT_SUBJ_CODE, SSBSECT_CRSE_NUMB, CAST(SSBSECT_SEQ_NUMB AS SIGNED);
  END