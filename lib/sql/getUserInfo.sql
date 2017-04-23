CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(IN id VARCHAR(9))
BEGIN
    DECLARE departments JSON;
    DECLARE i INT DEFAULT 0;
    DECLARE dept JSON DEFAULT '[]';
    DECLARE dept_status JSON DEFAULT '{}';
    DECLARE name VARCHAR(45);
    DECLARE email VARCHAR(45);
    DECLARE NUID VARCHAR(9);
    DECLARE isAdmin TINYINT;

    SELECT
      USER_NAME,
      USER_EMAIL,
      USER_NUID,
      USER_DEPT,
      IS_ADMIN
    INTO name, email, NUID, departments, isAdmin
    FROM `user`
    WHERE USER_NUID = id;

    WHILE i < JSON_LENGTH(departments) DO
      SET @department = JSON_UNQUOTE(JSON_EXTRACT(departments, CONCAT('$[', i, ']')));

      SET @status = IFNULL((SELECT SCHED_STATUS
                            FROM sched_submit
                            WHERE SCHED_DEPT_CODE = @department), '');

      SET dept_status = JSON_OBJECT(@department, @status);
      SET dept = JSON_ARRAY_APPEND(dept, '$', dept_status);
      SET i = i + 1;
    END WHILE;
    SELECT
      name,
      email,
      NUID,
      isAdmin,
      dept;
  END