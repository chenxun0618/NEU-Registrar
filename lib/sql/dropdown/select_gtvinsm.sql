CREATE DEFINER=`root`@`localhost` PROCEDURE `select_gtvinsm`()
  BEGIN
    SELECT
      GTVINSM_CODE AS 'code',
      GTVINSM_DESC AS 'desc'
    FROM gtvinsm;
  END