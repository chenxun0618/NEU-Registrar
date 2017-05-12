CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvcoll`()
  BEGIN
    SELECT
      STVCOLL_CODE AS 'code',
      STVCOLL_DESC AS 'desc'
    FROM stvcoll
    ORDER BY STVCOLL_CODE;
  END