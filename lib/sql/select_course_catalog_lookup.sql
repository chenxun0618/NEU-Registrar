USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_course_catalog_lookup;

DELIMITER //

CREATE PROCEDURE select_course_catalog_lookup()
BEGIN
	SELECT SCBCRSE_COLL_CODE AS 'collegeCode', SCBCRSE_COLL_DESC AS 'collegeDesc', SCBCRSE_DEPT_CODE as 'departmentCode', SCBCRSE_DEPT_DESC as 'departmentDesc',
		SCBCRSE_SUBJ_CODE AS 'subjectCode', SCBCRSE_CRSE_NUMB AS 'courseNum', SCBCRSE_TITLE AS 'title'
    FROM course_catalog_lookup;
END//

DELIMITER ;
