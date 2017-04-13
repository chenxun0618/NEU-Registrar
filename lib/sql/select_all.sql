USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_all;

DELIMITER //

CREATE PROCEDURE select_all(
    IN table_n VARCHAR(50)
)
BEGIN
	SET @s1 = CONCAT('SELECT * FROM ', table_n);
    PREPARE stmt1 FROM @s1;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;
END//

DELIMITER ;
