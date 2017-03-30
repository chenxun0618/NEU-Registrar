USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_stvattr;

DELIMITER //

CREATE PROCEDURE select_stvattr()
BEGIN
	SELECT STVATTR_CODE AS 'code', STVATTR_DESC AS 'desc'
    FROM stvattr;
END//

DELIMITER ;
