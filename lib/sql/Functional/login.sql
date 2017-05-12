CREATE DEFINER =`root`@`localhost` PROCEDURE `login`(IN email VARCHAR(45), IN id VARCHAR(9))
    main: BEGIN
    # check if the email is valid
    IF (SELECT COUNT(*)
        FROM `user`
        WHERE USER_EMAIL = email) > 0
    THEN
      # check if the id matches the email
      IF (SELECT USER_NUID
          FROM `user`
          WHERE USER_EMAIL = email) = id
      THEN
        # check if the user is an admin
        IF (SELECT IS_ADMIN
            FROM `user`
            WHERE USER_NUID = id)
        THEN
          CALL getAdminInfo(id);
        ELSE
          CALL getUserInfo(id);
        END IF;
      ELSE
        SIGNAL SQLSTATE '22023'
        SET MESSAGE_TEXT = 'Wrong password';
        LEAVE main;
      END IF;
    ELSE
      SIGNAL SQLSTATE '22023'
      SET MESSAGE_TEXT = 'Cannot find this email address';
      LEAVE main;
    END IF;
  END main