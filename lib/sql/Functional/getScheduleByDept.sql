CREATE DEFINER =`root`@`localhost` PROCEDURE `getScheduleByDept`(IN `dept` VARCHAR(4))
  BEGIN
    DECLARE existsSched INT DEFAULT 0;

    SELECT COUNT(*)
    INTO existsSched
    FROM sched_submit
    WHERE SCHED_DEPT_CODE = dept;

    IF existsSched
    THEN
      SELECT
        SUBMITTER_ID   AS 'submitterID',
        SUBMITTER_NAME AS 'submitterName',
        LAST_EDIT_TIME AS 'lastEditTime',
        SCHED_STATUS   AS 'scheduleStatus',
        SCHED_COMMENT  AS 'comment',
        SUBMIT_CLASSES AS 'classes'
      FROM sched_submit
      WHERE SCHED_DEPT_CODE = dept;
    ELSE
      SELECT
        '' AS 'submitterID',
        '' AS 'submitterName',
        '' AS 'lastEditTime',
        '' AS 'scheduleStatus',
        '' AS 'comment',
        '' AS 'classes';
    END IF;
  END