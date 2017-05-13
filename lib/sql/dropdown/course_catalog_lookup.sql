CREATE DEFINER =`root`@`localhost` PROCEDURE `course_catalog_lookup`
  (IN `subjectCode`  VARCHAR(4),
   IN `courseNumber` VARCHAR(4))
  BEGIN
    SELECT
      DISTINCT
      SSBSECT_TERM_CODE      AS 'termCode',
      -- this assumes that the only termCode in ssbsect is the current, correct one
      SCBCRSE_COLL_CODE      AS 'collegeCode',
      SCBCRSE_COLL_DESC      AS 'collegeDescription',
      SCBCRSE_DEPT_CODE      AS 'departmentCode',
      SCBCRSE_DEPT_DESC      AS 'departmentDescription',
      SCBCRSE_SUBJ_CODE      AS 'subjectCode',
      SCBCRSE_CRSE_NUMB      AS 'courseNumber',
      SCBCRSE_TITLE          AS 'title',
      SCBCRSE_CREDIT_HR_LOW  AS 'creditHourLow',
      SCBCRSE_CREDIT_HR_HIGH AS 'creditHourHigh',
      SCBCRSE_BILL_HR_LOW    AS 'billingHourLow',
      SCBCRSE_BILL_HR_HIGH   AS 'billingHourHigh'
    FROM scbcrse, ssbsect
    WHERE SCBCRSE_SUBJ_CODE = subjectCode AND SCBCRSE_CRSE_NUMB = courseNumber;
  END