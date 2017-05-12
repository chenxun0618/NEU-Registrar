CREATE DEFINER =`root`@`localhost` PROCEDURE `special_approvals_lookup`()
  BEGIN
    SELECT
      STVSAPR_CODE AS 'code',
      STVSAPR_DESC AS 'desc'
    FROM stvsapr
    ORDER BY STVSAPR_CODE;
  END