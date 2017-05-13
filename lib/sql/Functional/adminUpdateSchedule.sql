CREATE DEFINER =`root`@`localhost` PROCEDURE `adminUpdateSchedule`(IN action  ENUM ('A', 'R'), IN dept VARCHAR(4),
                                                                   IN message VARCHAR(2000))
  BEGIN
    DECLARE classes JSON;
    DECLARE i INT DEFAULT 0;

    SELECT SUBMIT_CLASSES
    INTO classes
    FROM sched_submit
    WHERE SCHED_DEPT_CODE = dept;

    SELECT SSBSECT_TERM_CODE
    INTO @termCode
    FROM ssbsect
    WHERE SSBSECT_DEPT_CODE = dept
    LIMIT 1;

    IF `action` = 'A'
    THEN
      WHILE i < JSON_LENGTH(classes) DO
        SET @class = JSON_EXTRACT(classes, CONCAT('$[', i, ']'));
        SET @crn = JSON_UNQUOTE(JSON_EXTRACT(@class, '$.crn'));
        # if it's a new class
        IF @crn = 'null'
        THEN
          CALL addClass(@termCode, @class);
        # editing an existing class
        ELSE
          CALL editClass(@termCode, @crn, @class);
        END IF;

        SET i = i + 1;
      END WHILE;
    END IF;

    UPDATE sched_submit
    SET SCHED_STATUS = `action`,
      SCHED_COMMENT  = message
    WHERE SCHED_DEPT_CODE = dept;
  END