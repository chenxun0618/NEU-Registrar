USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_gtvinsm;

DELIMITER //

CREATE PROCEDURE select_gtvinsm()
BEGIN
	SELECT GTVINSM_CODE AS 'code', GTVINSM_DESC AS 'desc'
    FROM gtvinsm;
END//

DELIMITER ;
