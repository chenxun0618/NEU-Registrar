CREATE DEFINER=`root`@`localhost` PROCEDURE `adminUpdateSchedule`(
  IN `action` ENUM ('A', 'R'),
  IN dept     VARCHAR(4),
  IN message  VARCHAR(2000))
BEGIN
    DECLARE classes JSON;
    DECLARE i INT DEFAULT 0;
    DECLARE crn VARCHAR(5);
    DECLARE termCode VARCHAR(6);

    SELECT SUBMIT_CLASSES
    INTO classes
    FROM sched_submit
    WHERE SCHED_DEPT_CODE = dept;

    SELECT SSBSECT_TERM_CODE
    INTO termCode
    FROM ssbsect
    WHERE SSBSECT_DEPT_CODE = dept
    LIMIT 1;

    IF `action` = 'A'
    THEN
      WHILE i < JSON_LENGTH(classes) DO
        SET @class = JSON_EXTRACT(classes, CONCAT('$[', i, ']'));
        SET crn = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.crn'));
        SET
        @scheduleTypeCode = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.scheduleTypeCode')),
        @campCode = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.campusCode')),
        @instructionalMethodCode = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.instructionalMethodCode')),
        @specialApprovalCode = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.specialApprovalCode')),
        @instructorID = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.primaryInstructorID')),
        @includeMajorRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.includeMajorRestriction')) = 1, 'I', 'E'),
        @includeClassRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.includeClassRestriction')) = 1, 'I', 'E'),
        @includeLevelRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.includeLevelRestriction')) = 1, 'I', 'E'),
        @includeProgramRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.includeProgramRestriction')) = 1, 'I', 'E'),
        @includeCollegeRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.includeCollegeRestriction')) = 1, 'I', 'E'),
        @majorRestricitons = JSON_EXTRACT(@class, '$.majorRestrictions'),
        @classRestricitons = JSON_EXTRACT(@class, '$.classRestrictions'),
        @levelRestricitons = JSON_EXTRACT(@class, '$.levelRestrictions'),
        @programRestricitons = JSON_EXTRACT(@class, '$.programRestrictions'),
        @collegeRestricitons = JSON_EXTRACT(@class, '$.collegeRestrictions'),
        @attributes = JSON_EXTRACT(@class, '$.attributeCode'),
        @meetingTimes = JSON_EXTRACT(@class, '$.meetingTimes');

        UPDATE ssbsect
        SET
          SSBSECT_SSTS_CODE      = IF(JSON_UNQUOTE(JSON_EXTRACT(@class, '$.status')) = 'Active', 'A', 'C'),
          SSBSECT_CAMP_CODE      = @campCode,
          SSBSECT_CAMP_DESC      = (SELECT STVCAMP_DESC
                                    FROM stvcamp
                                    WHERE STVCAMP_CODE = @campCode),
          SSBSECT_SCHD_CODE      = @scheduleTypeCode,
          SSBSECT_SCHD_DESC      = (SELECT STVSCHD_DESC
                                    FROM stvschd
                                    WHERE STVSCHD_CODE = @scheduleTypeCode),
          SSBSECT_CRSE_TITLE     = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.courseTitle')),
          SSBSECT_MAX_ENRL       = JSON_EXTRACT(@class, '$.maxEnrollment'),
          SSBSECT_INSM_CODE      = @instructionalMethodCode,
          SSBSECT_INSM_DESC      = (SELECT GTVINSM_DESC
                                    FROM gtvinsm
                                    WHERE GTVINSM_CODE = @instructionalMethodCode),
          SSBSECT_WAIT_CCAPACITY = JSON_EXTRACT(@class, '$.waitlistCapacity'),
          SSBSECT_SAPR_CODE      = @specialApprovalCode,
          SSBSECT_SAPR_DESC      = (SELECT STVSAPR_DESC
                                    FROM stvsapr
                                    WHERE STVSAPR_CODE = @specialApprovalCode),
          PUBLISH_IND            = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.publish'))
        WHERE SSBSECT_CRN = crn AND SSBSECT_TERM_CODE = termCode;

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

        UPDATE sched_submit
        SET
          SCHED_STATUS  = 'A',
          SCHED_COMMENT = message
        WHERE SCHED_DEPT_CODE = dept;

        SELECT
          SSRMEET_START_DATE,
          SSRMEET_END_DATE
        INTO @startDate, @endDate
        FROM ssrmeet
        WHERE SSRMEET_CRN = crn
        LIMIT 1;

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

        SET @j = -1;

        # add major restrictions
        WHILE @j < JSON_LENGTH(@majorRestricitons) DO
          IF @j = -1
          THEN
            INSERT INTO ssrrmaj (SSRRMAJ_TERM_CODE, SSRRMAJ_CRN, SSRRMAJ_REC_TYPE, SSRRMAJ_MAJOR_IND)
            VALUES (termCode, crn, 1, @includeMajorRestriction);
          ELSE
            SET @major = JSON_UNQUOTE(JSON_EXTRACT(@majorRestricitons, CONCAT('$[', @j, ']')));

            INSERT INTO ssrrmaj (SSRRMAJ_TERM_CODE, SSRRMAJ_CRN, SSRRMAJ_REC_TYPE, SSRRMAJ_MAJR_CODE)
            VALUES (termCode, crn, 2, @major);
          END IF;
          SET @j = @j + 1;
        END WHILE;

        SET @j = -1;

        # add class restrictions
        WHILE @j < JSON_LENGTH(@classRestricitons) DO
          IF @j = -1
          THEN
            INSERT INTO ssrrcls (SSRRCLS_TERM_CODE, SSRRCLS_CRN, SSRRCLS_REC_TYPE, SSRRCLS_CLASS_IND)
            VALUES (termCode, crn, 1, @includeClassRestriction);
          ELSE
            SET @classRestrict = JSON_UNQUOTE(JSON_EXTRACT(@classRestricitons, CONCAT('$[', @j, ']')));

            INSERT INTO ssrrcls (SSRRCLS_TERM_CODE, SSRRCLS_CRN, SSRRCLS_REC_TYPE, SSRRCLS_CLAS_CODE)
            VALUES (termCode, crn, 2, @classRestrict);
          END IF;
          SET @j = @j + 1;
        END WHILE;

        SET @j = -1;

        # add level restrictions
        WHILE @j < JSON_LENGTH(@levelRestricitons) DO
          IF @j = -1
          THEN
            INSERT INTO ssrrlvl (SSRRLVL_TERM_CODE, SSRRLVL_CRN, SSRRLVL_REC_TYPE, SSRRLVL_LEVL_IND)
            VALUES (termCode, crn, 1, @includeLevelRestriction);
          ELSE
            SET @level = JSON_UNQUOTE(JSON_EXTRACT(@levelRestricitons, CONCAT('$[', @j, ']')));

            INSERT INTO ssrrlvl (SSRRLVL_TERM_CODE, SSRRLVL_CRN, SSRRLVL_REC_TYPE, SSRRLVL_LEVL_CODE)
            VALUES (termCode, crn, 2, @level);
          END IF;
          SET @j = @j + 1;
        END WHILE;

        SET @j = -1;

        # add program restrictions
        WHILE @j < JSON_LENGTH(@programRestricitons) DO
          IF @j = -1
          THEN
            INSERT INTO ssrrprg (SSRRPRG_TERM_CODE, SSRRPRG_CRN, SSRRPRG_REC_TYPE, SSRRPRG_PROGRAM_IND)
            VALUES (termCode, crn, 1, @includeProgramRestriction);
          ELSE
            SET @program = JSON_UNQUOTE(JSON_EXTRACT(@programRestricitons, CONCAT('$[', @j, ']')));

            INSERT INTO ssrrprg (SSRRPRG_TERM_CODE, SSRRPRG_CRN, SSRRPRG_REC_TYPE, SSRRPRG_PROGRAM)
            VALUES (termCode, crn, 2, @program);
          END IF;
          SET @j = @j + 1;
        END WHILE;

        SET @j = -1;

        # add college restrictions
        WHILE @j < JSON_LENGTH(@collegeRestricitons) DO
          IF @j = -1
          THEN
            INSERT INTO ssrrcol (SSRRCOL_TERM_CODE, SSRRCOL_CRN, SSRRCOL_REC_TYPE, SSRRCOL_COLL_IND)
            VALUES (termCode, crn, 1, @includeCollegeRestriction);
          ELSE
            SET @college = JSON_UNQUOTE(JSON_EXTRACT(@collegeRestricitons, CONCAT('$[', @j, ']')));

            INSERT INTO ssrrcol (SSRRCOL_TERM_CODE, SSRRCOL_CRN, SSRRCOL_REC_TYPE, SSRRCOL_COLL_CODE)
            VALUES (termCode, crn, 2, @college);
          END IF;
          SET @j = @j + 1;
        END WHILE;

        SET @j = 0;

        # add attributes
        WHILE @j < JSON_LENGTH(@attributes) DO
          SET @attribute = JSON_UNQUOTE(JSON_EXTRACT(@attributes, CONCAT('$[', @j, ']')));
          SELECT STVATTR_DESC
          INTO @attributeDesc
          FROM stvattr
          WHERE STVATTR_CODE = @attribute;

          INSERT INTO ssrattr (SSRATTR_TERM_CODE, SSRATTR_CRN, SSRATTR_ATTR_CODE, SSRATTR_ATTR_DESC)
          VALUES (termCode, crn, @attribute, @attributeDesc);
          SET @j = @j + 1;
        END WHILE;

        SET @j = 0;

        # add meetingTimes
        WHILE @j < JSON_LENGTH(@meetingTimes) DO
          SET @times = JSON_EXTRACT(@meetingTimes, CONCAT('$[', @j, ']'));
          SET @beginTime = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.beginTime')));
          SET @endTime = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.endTime')));
          SET @days = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.days')));

          INSERT INTO ssrmeet (SSRMEET_TERM_CODE, SSRMEET_CRN, SSRMEET_START_DATE, SSRMEET_END_DATE, SSRMEET_BEGIN_TIME, SSRMEET_END_TIME, SSRMEET_DAYS)
          VALUES (termCode, crn, @startDate, @endDate, @beginTime, @endTime, @days);
          SET @j = @j + 1;
        END WHILE;

        SET i = i + 1;
      END WHILE;
    # reject
    ELSE
      UPDATE sched_submit
      SET SCHED_STATUS = 'R',
        SCHED_COMMENT  = message
      WHERE SCHED_DEPT_CODE = dept;
    END IF;
  END