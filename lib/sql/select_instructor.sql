USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_instructor;

DELIMITER //

CREATE PROCEDURE select_instructor()
BEGIN
	SELECT INSTRUCTOR_ID AS 'id', INSTRUCTOR_FIRST_NAME AS 'firstName', INSTRUCTOR_LAST_NAME AS 'lastName'
    FROM instructor;
END//

DELIMITER ;
