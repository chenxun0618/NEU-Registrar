CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvschd`()
  BEGIN
    SELECT
      STVSCHD_CODE AS 'code',
      STVSCHD_DESC AS 'desc'
    FROM stvschd;
  END