CREATE DEFINER =`root`@`localhost` PROCEDURE `getAllSubjectCodesInDept`(IN `dept` VARCHAR(4))
  BEGIN
    DROP TEMPORARY TABLE IF EXISTS t1;

    CREATE TEMPORARY TABLE t1 AS
      SELECT DISTINCT SCBCRSE_SUBJ_CODE AS subjectCodes
      FROM scbcrse
      WHERE SCBCRSE_DEPT_CODE = dept
      ORDER BY SCBCRSE_SUBJ_CODE ASC;

    SELECT CONCAT('["', GROUP_CONCAT(subjectCodes SEPARATOR '", "'), '"]') AS subjectCodes
    FROM t1;
  END