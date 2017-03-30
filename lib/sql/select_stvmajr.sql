USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_stvmajr;

DELIMITER //

CREATE PROCEDURE select_stvmajr()
BEGIN
	SELECT STVMAJR_COLL_CODE AS 'collegeCode', STVMAJR_COLL_DESC AS 'collegeDesc', STVMAJR_CODE AS 'code', STVMAJR_DESC AS 'desc',
		STVMAJR_VALID_MAJOR_IND AS 'validMajorInd', STVMAJR_VALID_MINOR_IND AS 'validMinorInd', STVMAJR_VALID_CONCENTRATN_IND AS 'concentrationInd',
        NOTE1 AS 'note1', NOTE2 AS 'note2'
    FROM stvmajr;
END//

DELIMITER ;
