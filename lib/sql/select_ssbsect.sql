USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_ssbsect;

DELIMITER //

CREATE PROCEDURE select_ssbsect()
BEGIN
	SELECT SSBSECT_TERM_CODE AS 'termCode', SSBSECT_COLL_CODE AS 'collegeCode', SSBSECT_COLL_DESC AS 'collegeDesc', SSBSECT_DEPT_CODE AS 'departmentCode',
		SSBSECT_DEPT_DESC AS 'departmentDesc', SSBSECT_CRN AS 'crn', SSBSECT_PTRM_CODE AS 'ptrmCode', SSBSECT_SUBJ_CODE AS 'subjectCode', SSBSECT_CRSE_NUMB AS 'courseNum',
        SSBSECT_SEQ_NUMB AS 'sequenceNum', SSBSECT_SSTS_CODE AS 'sstsCode', SSBSECT_SCHD_DESC AS 'scheduleDesc', SSBSECT_CAMP_CODE AS 'campusCode',
        SSBSECT_CAMP_DESC AS 'campusDesc', SSBSECT_CRSE_TITLE_ALT AS 'courseTitleAlt', SSBSECT_CRSE_TITLE AS 'courseTitle', SSBSECT_CREDIT_HR AS 'creditHours',
        SSBSECT_MAX_ENRL AS 'maxEnrollment', SSBSECT_INSM_CODE AS 'insmCode', SSBSECT_INSM_DESC AS 'insmDesc', SSBSECT_PRIOR_ENRL AS 'priorEnrollment'
    FROM ssbsect;
END//

DELIMITER ;
