CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvlevl`()
  BEGIN
    SELECT
      STVLEVL_CODE AS 'code',
      STVLEVL_DESC AS 'desc'
    FROM stvlevl;
  END