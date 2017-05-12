CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvattr`()
  BEGIN
    SELECT
      STVATTR_CODE AS 'code',
      STVATTR_DESC AS 'desc'
    FROM stvattr
    ORDER BY STVATTR_CODE;
  END