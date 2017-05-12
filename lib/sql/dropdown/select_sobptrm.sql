CREATE DEFINER=`root`@`localhost` PROCEDURE `select_sobptrm`()
  BEGIN
    SELECT
      SOBPTRM_PTRM_CODE AS 'partOfTermCode',
      SOBPTRM_DESC AS 'partOfTermDesc'
    FROM sobptrm;
  END