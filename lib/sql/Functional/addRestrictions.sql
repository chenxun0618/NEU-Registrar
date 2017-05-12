CREATE DEFINER=`root`@`localhost` PROCEDURE `addRestrictions`(IN termcode VARCHAR(6), IN crn VARCHAR(5), IN class JSON)
  BEGIN
    SET
    @includeMajorRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(class, '$.includeMajorRestriction')) = 1, 'I', 'E'),
    @includeClassRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(class, '$.includeClassRestriction')) = 1, 'I', 'E'),
    @includeLevelRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(class, '$.includeLevelRestriction')) = 1, 'I', 'E'),
    @includeProgramRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(class, '$.includeProgramRestriction')) = 1, 'I', 'E'),
    @includeCollegeRestriction = IF(JSON_UNQUOTE(JSON_EXTRACT(class, '$.includeCollegeRestriction')) = 1, 'I', 'E'),
    @majorRestrictions = JSON_EXTRACT(class, '$.majorRestrictions'),
    @classRestrictions = JSON_EXTRACT(class, '$.classRestrictions'),
    @levelRestrictions = JSON_EXTRACT(class, '$.levelRestrictions'),
    @programRestrictions = JSON_EXTRACT(class, '$.programRestrictions'),
    @collegeRestrictions = JSON_EXTRACT(class, '$.collegeRestrictions'),
    @attributes = JSON_EXTRACT(class, '$.attributeCode'),
    @meetingTimes = JSON_EXTRACT(class, '$.meetingTimes'),
    @partOfTerm = JSON_UNQUOTE(JSON_EXTRACT(class, '$.partOfTerm'));

    SELECT
      SOBPTRM_START_DATE,
      SOBPTRM_END_DATE
    INTO @startDate, @endDate
    FROM sobptrm
    WHERE SOBPTRM_PTRM_CODE = @partOfTerm;

    # add major restrictions
    SET @j = -1;
    WHILE @j < JSON_LENGTH(@majorRestrictions) DO
      IF @j = -1
      THEN
        INSERT INTO ssrrmaj (SSRRMAJ_TERM_CODE, SSRRMAJ_CRN, SSRRMAJ_REC_TYPE, SSRRMAJ_MAJOR_IND)
        VALUES (termCode, crn, 1, @includeMajorRestriction);
      ELSE
        SET @major = JSON_UNQUOTE(JSON_EXTRACT(@majorRestrictions, CONCAT('$[', @j, ']')));

        INSERT INTO ssrrmaj (SSRRMAJ_TERM_CODE, SSRRMAJ_CRN, SSRRMAJ_REC_TYPE, SSRRMAJ_MAJR_CODE)
        VALUES (termCode, crn, 2, @major);
      END IF;
      SET @j = @j + 1;
    END WHILE;

    # add class restrictions
    SET @j = -1;
    WHILE @j < JSON_LENGTH(@classRestrictions) DO
      IF @j = -1
      THEN
        INSERT INTO ssrrcls (SSRRCLS_TERM_CODE, SSRRCLS_CRN, SSRRCLS_REC_TYPE, SSRRCLS_CLASS_IND)
        VALUES (termCode, crn, 1, @includeClassRestriction);
      ELSE
        SET @classRestrict = JSON_UNQUOTE(JSON_EXTRACT(@classRestrictions, CONCAT('$[', @j, ']')));

        INSERT INTO ssrrcls (SSRRCLS_TERM_CODE, SSRRCLS_CRN, SSRRCLS_REC_TYPE, SSRRCLS_CLAS_CODE)
        VALUES (termCode, crn, 2, @classRestrict);
      END IF;
      SET @j = @j + 1;
    END WHILE;

    # add level restrictions
    SET @j = -1;
    WHILE @j < JSON_LENGTH(@levelRestrictions) DO
      IF @j = -1
      THEN
        INSERT INTO ssrrlvl (SSRRLVL_TERM_CODE, SSRRLVL_CRN, SSRRLVL_REC_TYPE, SSRRLVL_LEVL_IND)
        VALUES (termCode, crn, 1, @includeLevelRestriction);
      ELSE
        SET @level = JSON_UNQUOTE(JSON_EXTRACT(@levelRestrictions, CONCAT('$[', @j, ']')));

        INSERT INTO ssrrlvl (SSRRLVL_TERM_CODE, SSRRLVL_CRN, SSRRLVL_REC_TYPE, SSRRLVL_LEVL_CODE)
        VALUES (termCode, crn, 2, @level);
      END IF;
      SET @j = @j + 1;
    END WHILE;

    # add program restrictions
    SET @j = -1;
    WHILE @j < JSON_LENGTH(@programRestrictions) DO
      IF @j = -1
      THEN
        INSERT INTO ssrrprg (SSRRPRG_TERM_CODE, SSRRPRG_CRN, SSRRPRG_REC_TYPE, SSRRPRG_PROGRAM_IND)
        VALUES (termCode, crn, 1, @includeProgramRestriction);
      ELSE
        SET @program = JSON_UNQUOTE(JSON_EXTRACT(@programRestrictions, CONCAT('$[', @j, ']')));

        INSERT INTO ssrrprg (SSRRPRG_TERM_CODE, SSRRPRG_CRN, SSRRPRG_REC_TYPE, SSRRPRG_PROGRAM)
        VALUES (termCode, crn, 2, @program);
      END IF;
      SET @j = @j + 1;
    END WHILE;

    # add college restrictions
    SET @j = -1;
    WHILE @j < JSON_LENGTH(@collegeRestrictions) DO
      IF @j = -1
      THEN
        INSERT INTO ssrrcol (SSRRCOL_TERM_CODE, SSRRCOL_CRN, SSRRCOL_REC_TYPE, SSRRCOL_COLL_IND)
        VALUES (termCode, crn, 1, @includeCollegeRestriction);
      ELSE
        SET @college = JSON_UNQUOTE(JSON_EXTRACT(@collegeRestrictions, CONCAT('$[', @j, ']')));

        INSERT INTO ssrrcol (SSRRCOL_TERM_CODE, SSRRCOL_CRN, SSRRCOL_REC_TYPE, SSRRCOL_COLL_CODE)
        VALUES (termCode, crn, 2, @college);
      END IF;
      SET @j = @j + 1;
    END WHILE;

    # add attributes
    SET @j = 0;
    WHILE @j < JSON_LENGTH(@attributes) DO
      SET @attribute = JSON_UNQUOTE(JSON_EXTRACT(@attributes, CONCAT('$[', @j, ']')));

      INSERT INTO ssrattr VALUES (termCode, crn, @attribute);
      SET @j = @j + 1;
    END WHILE;

    # add meetingTimes
    SET @j = 0;
    WHILE @j < JSON_LENGTH(@meetingTimes) DO
      SET @times = JSON_EXTRACT(@meetingTimes, CONCAT('$[', @j, ']'));
      SET @beginTime = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.beginTime')));
      SET @endTime = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.endTime')));
      SET @days = JSON_UNQUOTE(JSON_EXTRACT(@times, CONCAT('$.days')));

      INSERT INTO ssrmeet VALUES (termCode, crn, @startDate, @endDate, @beginTime, @endTime, @days);
      SET @j = @j + 1;
    END WHILE;
  END