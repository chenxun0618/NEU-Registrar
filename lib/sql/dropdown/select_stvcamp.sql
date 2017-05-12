CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvcamp`()
  BEGIN
    SELECT
      STVCAMP_CODE AS 'code',
      STVCAMP_DESC AS 'desc'
    FROM stvcamp;
  END