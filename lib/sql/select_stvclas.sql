USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_stvclas;

DELIMITER //

CREATE PROCEDURE select_stvclas()
BEGIN
	SELECT STVCLAS_CODE AS 'code', STVCLAS_DESC AS 'desc'
    FROM stvclas;
END//

DELIMITER ;
