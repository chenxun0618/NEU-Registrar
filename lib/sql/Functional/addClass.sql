CREATE DEFINER =`root`@`localhost` PROCEDURE `addClass`(IN termcode VARCHAR(6), IN class JSON)
  BEGIN
    SET
    @crn = (SELECT MAX(SSBSECT_CRN)
            FROM ssbsect) + 1,
    @collegeCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.collegeCode')),
    @departmentCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.departmentCode')),
    @partOfTerm = JSON_UNQUOTE(JSON_EXTRACT(class, '$.partOfTerm')),
    @subjectCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.subjectCode')),
    @courseNumber = JSON_UNQUOTE(JSON_EXTRACT(class, '$.courseNumber')),
    @section = JSON_UNQUOTE(JSON_EXTRACT(class, '$.section')),
    @status = JSON_UNQUOTE(JSON_EXTRACT(class, '$.status')),
    @scheduleTypeCode = (SELECT SSBSECT_SCHD_CODE
                         FROM ssbsect
                         WHERE SSBSECT_SUBJ_CODE = @subjectCode AND SSBSECT_CRSE_NUMB = @courseNumber
                         LIMIT 1),
    @campusCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.campusCode')),
    @courseTitle = JSON_UNQUOTE(JSON_EXTRACT(class, '$.courseTitle')),
    @creditHours = JSON_EXTRACT(class, '$.creditHours'),
    @billingHours = JSON_EXTRACT(class, '$.billingHours'),
    @maxEnrollment = JSON_EXTRACT(class, '$.maxEnrollment'),
    @instructionalMethodCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.instructionalMethodCode')),
    @waitlistCapacity = JSON_EXTRACT(class, '$.waitlistCapacity'),
    @specialApprovalCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.specialApprovalCode')),
    @publish = JSON_UNQUOTE(JSON_EXTRACT(class, '$.publish')),
    @instructorID = JSON_UNQUOTE(JSON_EXTRACT(class, '$.primaryInstructorID'));

    SELECT
      INSTRUCTOR_FIRST_NAME,
      INSTRUCTOR_LAST_NAME
    INTO @instructorFirstName, @instructorLastName
    FROM instructor
    WHERE INSTRUCTOR_ID = @instructorID;

    # insert main table info
    INSERT INTO ssbsect (SSBSECT_CRN, SSBSECT_TERM_CODE, SSBSECT_COLL_CODE, SSBSECT_DEPT_CODE, SSBSECT_PTRM_CODE,
                         SSBSECT_SUBJ_CODE, SSBSECT_CRSE_NUMB, SSBSECT_SEQ_NUMB, SSBSECT_SSTS_CODE, SSBSECT_SCHD_CODE,
                         SSBSECT_CAMP_CODE, SSBSECT_CRSE_TITLE, SSBSECT_CREDIT_HR, SSBSECT_BILLING_HR, SSBSECT_MAX_ENRL,
                         SSBSECT_INSM_CODE, SSBSECT_WAIT_CCAPACITY, SSBSECT_SAPR_CODE, PUBLISH_IND)
    VALUES (@crn, termcode, @collegeCode, @departmentCode, @partOfTerm, @subjectCode, @courseNumber,
                  @section, @status, @scheduleTypeCode, @campusCode, @courseTitle, @creditHours,
            @billingHours, @maxEnrollment, @instructionalMethodCode, @waitlistCapacity, @specialApprovalCode, @publish);

    # insert instructor info
    INSERT INTO sirasgn (SIRASGN_TERM_CODE, SIRASGN_CRN, SIRASGN_ID, SIRASGN_FIRST_NAME, SIRASGN_LAST_NAME) VALUES (
      termcode, @crn, @instructorID, @instructorFirstName, @instructorLastName
    );

    # insert prerequisite (not implemented yet)

    CALL addRestrictions(termcode, @crn, @class);
  END