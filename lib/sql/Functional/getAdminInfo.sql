CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdminInfo`(IN id VARCHAR(9))
  BEGIN
    DECLARE dept JSON DEFAULT '[]';
    DECLARE name VARCHAR(45);
    DECLARE email VARCHAR(45);
    DECLARE NUID VARCHAR(9);
    DECLARE isAdmin TINYINT;
    DECLARE dept_status JSON DEFAULT '{}';
    DECLARE department VARCHAR(4);
    DECLARE done INT DEFAULT FALSE;
    DECLARE sched_cur CURSOR FOR SELECT DISTINCT SCBCRSE_DEPT_CODE
                                 FROM scbcrse
                                 ORDER BY SCBCRSE_DEPT_CODE;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN sched_cur;

    SELECT
      USER_NAME,
      USER_EMAIL,
      USER_NUID,
      IS_ADMIN
    INTO name, email, NUID, isAdmin
    FROM `user`
    WHERE USER_NUID = id;

    for_each_sched: LOOP
      FETCH sched_cur
      INTO department;

      IF done
      THEN
        LEAVE for_each_sched;
      END IF;

      SET @status = IFNULL((SELECT SCHED_STATUS
                            FROM sched_submit
                            WHERE SCHED_DEPT_CODE = department), '');

      SET @status = IF(@status = 'D', '', @status);

      SET dept_status = JSON_OBJECT(department, @status);
      SET dept = JSON_ARRAY_APPEND(dept, '$', dept_status);
    END LOOP;

    CLOSE sched_cur;
    SELECT
      name,
      email,
      NUID,
      isAdmin,
      dept;
  END