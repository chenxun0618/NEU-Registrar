CREATE DEFINER =`root`@`localhost` PROCEDURE `select_stvmeet`()
  BEGIN
    SELECT
      STVMEET_CODE       AS 'code',
      STVMEET_DOW        AS 'days',
      STVMEET_BEGIN_TIME AS 'beginTime',
      STVMEET_END_TIME   AS 'endTime'
    FROM stvmeet
    ORDER BY
      FIELD(STVMEET_DOW, 'M', 'MW', 'MWR', 'MR', 'T', 'TW', 'TWF', 'TR', 'TRF', 'TF', 'W', 'WR', 'WF', 'R', 'RF', 'F'),
      STVMEET_BEGIN_TIME,
      STVMEET_END_TIME;
  END