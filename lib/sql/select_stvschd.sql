USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_stvschd;

DELIMITER //

CREATE PROCEDURE select_stvschd()
BEGIN
	SELECT STVSCHD_CODE AS 'code', STVSCHD_DESC AS 'desc'
    FROM stvschd;
END//

DELIMITER ;
