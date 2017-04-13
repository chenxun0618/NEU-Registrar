USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_stvlevl;

DELIMITER //

CREATE PROCEDURE select_stvlevl()
BEGIN
	SELECT STVLEVL_CODE AS 'code', STVLEVL_DESC AS 'desc'
    FROM stvlevl;
END//

DELIMITER ;
