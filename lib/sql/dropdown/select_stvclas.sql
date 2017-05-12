CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvclas`()
  BEGIN
    SELECT
      STVCLAS_CODE AS 'code',
      STVCLAS_DESC AS 'desc'
    FROM stvclas;
  END