CREATE DEFINER =`root`@`localhost` PROCEDURE `schedule_types_lookup`()
  BEGIN
    SELECT
      STVSCHD_CODE AS 'code',
      STVSCHD_DESC AS 'desc'
    FROM stvschd;
  END