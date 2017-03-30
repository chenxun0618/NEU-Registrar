USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_sirasgn;

DELIMITER //

CREATE PROCEDURE select_sirasgn()
BEGIN
	SELECT SIRASGN_TERM_CODE AS 'termCode', SIRASGN_CRN AS 'crn', SIRASGN_ID AS 'id', SIRASGN_FIRST_NAME AS 'firstName', SIRASGN_LAST_NAME AS 'lastName'
    FROM sirasgn;
END//

DELIMITER ;
