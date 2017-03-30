USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_ssrrcls;

DELIMITER //

CREATE PROCEDURE select_ssrrcls()
BEGIN
	SELECT SSRRCLS_TERM_CODE AS 'termCode', SSRRCLS_CRN AS 'crn', SSRRCLS_REC_TYPE AS 'recType', SSRRCLS_CLASS_IND AS 'classInd',
		SSRRCLS_CLAS_CODE AS 'classCode', STVCLAS_DESC AS 'desc'
    FROM ssrrcls;
END//

DELIMITER ;
