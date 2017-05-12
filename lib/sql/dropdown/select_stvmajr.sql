CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvmajr`()
  BEGIN
    SELECT
      STVMAJR_COLL_CODE             AS 'collegeCode',
      STVMAJR_COLL_DESC             AS 'collegeDesc',
      STVMAJR_CODE                  AS 'code',
      STVMAJR_DESC                  AS 'desc',
      STVMAJR_VALID_MAJOR_IND       AS 'validMajorIndicator',
      STVMAJR_VALID_MINOR_IND       AS 'validMinorIndicator',
      STVMAJR_VALID_CONCENTRATN_IND AS 'validConcentrationIndicator'
    FROM stvmajr;
  END