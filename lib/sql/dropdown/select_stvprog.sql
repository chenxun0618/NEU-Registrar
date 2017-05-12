CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvprog`()
  BEGIN
    SELECT
      STVPROG_CODE AS 'code',
      STVPROG_DESC AS 'desc'
    FROM stvprog;
  END