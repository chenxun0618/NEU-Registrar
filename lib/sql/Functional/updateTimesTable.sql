CREATE DEFINER =`root`@`localhost` PROCEDURE `updateTimesTable`()
  BEGIN
    DECLARE crn VARCHAR(5);
    DECLARE done INT DEFAULT FALSE;
    DECLARE time_cur CURSOR FOR SELECT SSRMEET_CRN
                                FROM times;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN time_cur;
    for_each_crn: LOOP
      FETCH time_cur
      INTO crn;

      IF done
      THEN
        LEAVE for_each_crn;
      END IF;

      SET @time_array = (SELECT meetingTimes
                         FROM times
                         WHERE SSRMEET_CRN = crn);

      SET @i = 0;
      SET @has_time = 0;
      WHILE @i < JSON_LENGTH(@time_array) DO
        SET @time_obj = JSON_EXTRACT(@time_array, CONCAT('$[', @i, ']'));
        IF JSON_EXTRACT(@time_obj, '$.beginTime') != ""
        THEN
          SET @has_time = 1;
        END IF;
        SET @i = @i + 1;
      END WHILE;

      IF @has_time != 1
      THEN
        UPDATE times
        SET meetingTimes = '[]'
        WHERE SSRMEET_CRN = crn;
      END IF;
    END LOOP;

    CLOSE time_cur;
  END