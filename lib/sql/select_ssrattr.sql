USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_ssrattr;

DELIMITER //

CREATE PROCEDURE select_ssrattr()
BEGIN
	SELECT SSRATTR_TERM_CODE AS 'termCode', SSRATTR_CRN AS 'crn', SSRATTR_ATTR_CODE AS 'attributeCode', SSRATTR_ATTR_DESC AS 'attributeDesc', NOTE AS 'note'
    FROM ssrattr;
END//

DELIMITER ;
