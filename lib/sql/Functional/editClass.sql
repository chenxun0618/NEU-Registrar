CREATE DEFINER=`root`@`localhost` PROCEDURE `editClass`(IN termcode VARCHAR(6), IN crn VARCHAR(5), IN class JSON)
  BEGIN
    # update main table
    UPDATE ssbsect
    SET
      SSBSECT_SSTS_CODE      = JSON_UNQUOTE(JSON_EXTRACT(class, '$.status')),
      SSBSECT_CAMP_CODE      = JSON_UNQUOTE(JSON_EXTRACT(class, '$.campusCode')),
      SSBSECT_CRSE_TITLE     = JSON_UNQUOTE(JSON_EXTRACT(class, '$.courseTitle')),
      SSBSECT_MAX_ENRL       = JSON_EXTRACT(class, '$.maxEnrollment'),
      SSBSECT_INSM_CODE      = JSON_UNQUOTE(JSON_EXTRACT(class, '$.instructionalMethodCode')),
      SSBSECT_WAIT_CCAPACITY = JSON_EXTRACT(class, '$.waitlistCapacity'),
      SSBSECT_SAPR_CODE      = JSON_UNQUOTE(JSON_EXTRACT(class, '$.specialApprovalCode')),
      PUBLISH_IND            = JSON_UNQUOTE(JSON_EXTRACT(class, '$.publish'))
    WHERE SSBSECT_CRN = crn AND SSBSECT_TERM_CODE = termCode;

    SET @instructorID = JSON_UNQUOTE(JSON_EXTRACT(class, '$.primaryInstructorID'));

    # update instructor table
    UPDATE sirasgn
    SET
      SIRASGN_ID         = @instructorID,
      SIRASGN_FIRST_NAME = (SELECT INSTRUCTOR_FIRST_NAME
                            FROM instructor
                            WHERE INSTRUCTOR_ID = @instructorID),
      SIRASGN_LAST_NAME  = (SELECT INSTRUCTOR_LAST_NAME
                            FROM instructor
                            WHERE INSTRUCTOR_ID = @instructorID)
    WHERE SIRASGN_CRN = crn AND SIRASGN_TERM_CODE = termCode;

    DELETE FROM ssrrmaj
    WHERE SSRRMAJ_CRN = crn;
    DELETE FROM ssrrcls
    WHERE SSRRCLS_CRN = crn;
    DELETE FROM ssrrlvl
    WHERE SSRRlvl_CRN = crn;
    DELETE FROM ssrrprg
    WHERE SSRRPRG_CRN = crn;
    DELETE FROM ssrrcol
    WHERE SSRRCOL_CRN = crn;
    DELETE FROM ssrattr
    WHERE SSRATTR_CRN = crn;
    DELETE FROM ssrmeet
    WHERE SSRMEET_CRN = crn;

    CALL addRestrictions(termcode, crn, @class);
  END