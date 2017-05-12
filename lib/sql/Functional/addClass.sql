CREATE DEFINER=`root`@`localhost` PROCEDURE `addClass`(IN class JSON, IN termcode VARCHAR(6), IN crn VARCHAR(5))
  BEGIN
    SET
    @collegeCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.collegeCode')),
    @deptCode = JSON_UNQUOTE(JSON_EXTRACT(class, '$.deptCode')),
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
    @instructorID = JSON_UNQUOTE(JSON_EXTRACT(class, '$.primaryInstructorID')),
    @instructorFirstName = (SELECT INSTRUCTOR_FIRST_NAME
                            FROM instructor
                            WHERE INSTRUCTOR_ID = @instructorID),
    @instructorLastName = (SELECT INSTRUCTOR_LAST_NAME
                           FROM instructor
                           WHERE INSTRUCTOR_ID = @instructorID);

    SELECT
      SSRRTST_LEVL_CODE,
      SSRRTST_MIN_GRDE
    INTO @levelCode, @minGrade
    FROM ssrrtst
    WHERE SSRRTST_SUBJ_CODE_PREQ = @subjectCode AND SSRRTST_CRSE_NUMB_PREQ = @courseNumber
    LIMIT 1;

    # insert main table info
    INSERT INTO ssbsect VALUES (
      termcode, @collegeCode, @deptCode, crn, @partOfTerm, @subjectCode, @courseNumber,
                @section, @status, @scheduleTypeCode, @campusCode, '', @courseTitle, @creditHours,
                                                                   @billingHours, @maxEnrollment, @instructionalMethodCode, 0, @waitlistCapacity, @specialApprovalCode, @publish
    );

    # insert instructor info
    INSERT INTO sirasgn VALUES (
      termcode, crn, @instructorID, @instructorFirstName, @instructorLastName
    );

    # insert prerequisite
    INSERT INTO ssrrtst VALUES (
      termcode, crn, '', '', @subjectCode, @courseNumber, @levelCode, @minGrade
    );

    CALL addRestrictions(termcode, crn, @class);
  END