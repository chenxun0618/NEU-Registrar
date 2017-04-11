CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserDept`(IN id INT)
  BEGIN
    SELECT USER_DEPT
    AS 'department'
    FROM `user`
    WHERE USER_NUID = id;
  END