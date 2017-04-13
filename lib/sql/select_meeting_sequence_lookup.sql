USE test_neu_registrar;

DROP PROCEDURE IF EXISTS select_meeting_sequence_lookup;

DELIMITER //

CREATE PROCEDURE select_meeting_sequence_lookup()
BEGIN
	SELECT STVMEET_CODE AS 'code', STVMEET_DOW AS 'dayOfWeek', STVMEET_BEGIN_TIME AS 'beginTime', STVMEET_END_TIME AS 'endTime'
    FROM meeting_sequence_lookup;
END//

DELIMITER ;
