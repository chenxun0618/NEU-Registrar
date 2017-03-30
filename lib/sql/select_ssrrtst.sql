USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_ssrrtst;

DELIMITER //

CREATE PROCEDURE select_ssrrtst()
BEGIN
	SELECT SSRRTST_TERM_CODE AS 'termCode', SSRRTST_CRN AS 'crn', SSRRTST_TESC_CODE AS 'testCode', SSRRTST_TEST_SCORE AS 'testScore',
		SSRRTST_SUBJ_CODE_PREQ AS 'subjectCodePreq', SSRRTST_CRSE_NUMB_PREQ AS 'courseNumPreq', SSRRTST_LEVL_CODE AS 'levelCode',
        SSRRTST_MIN_GRDE AS 'minimumGrade'
    FROM ssrrtst;
END//

DELIMITER ;
