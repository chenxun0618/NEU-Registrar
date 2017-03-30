USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_cs4500_users;

DELIMITER //

CREATE PROCEDURE select_cs4500_users()
BEGIN
	SELECT College AS 'college', Department AS 'department', Subject AS 'subject', User AS 'user', `Email Address` AS 'email', NUID AS 'nuid'
    FROM cs4500_users;
END//

DELIMITER ;
