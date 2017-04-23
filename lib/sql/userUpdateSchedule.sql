CREATE DEFINER=`root`@`localhost` PROCEDURE `userUpdateSchedule`(IN `id`         VARCHAR(9), IN `dept` VARCHAR(4),
                                                                  IN `time_stamp` DATETIME, IN `action` ENUM ('D', 'S'),
                                                                  IN `classes`    JSON)
main: BEGIN
    DECLARE username VARCHAR(60);
    DECLARE departments JSON;
    DECLARE last_time DATETIME;
    DECLARE current_status VARCHAR(1);
    DECLARE sched_exists INT DEFAULT 0;

    SELECT
      USER_NAME,
      USER_DEPT
    INTO username, departments
    FROM `user`
    WHERE USER_NUID = id;

    # if the given department is not in the user's department list, exit
    IF NOT JSON_CONTAINS(departments, JSON_ARRAY(dept), '$')
    THEN
      SIGNAL SQLSTATE '22023'
      SET MESSAGE_TEXT = 'User doesn\'t have access to this department';
      LEAVE main;
    END IF;

    # select the schedule id and last edit time for the given department
    SELECT
      LAST_EDIT_TIME,
      SCHED_STATUS
    INTO last_time, current_status
    FROM sched_submit
    WHERE SCHED_DEPT_CODE = dept;

    IF current_status = 'S' OR current_status = 'A'
    THEN
      SIGNAL SQLSTATE '25000'
      SET MESSAGE_TEXT = 'Schedule has been submitted, cannot resubmit';
      LEAVE main;
    END IF;

    SELECT COUNT(*)
    INTO sched_exists
    FROM sched_submit
    WHERE SCHED_DEPT_CODE = dept;

    # if it's a new submission
    IF sched_exists = 0
    THEN
      INSERT INTO sched_submit (SUBMITTER_ID, SUBMITTER_NAME, SCHED_DEPT_CODE, SUBMIT_CLASSES)
      VALUES (id, username, dept, classes);

    # if the time is not the same as the last edit time in the database, someone else has edited the schedule, exit
    ELSEIF time_stamp != last_time
      THEN
        CALL getScheduleByDept(dept);
        SIGNAL SQLSTATE '22023'
        SET MESSAGE_TEXT = 'Someone else has edited the schedule';
        LEAVE main;
    ELSE
      UPDATE sched_submit
      SET SUBMITTER_ID = id, SUBMITTER_NAME = username, SUBMIT_CLASSES = classes
      WHERE SCHED_DEPT_CODE = dept;
    END IF;

    UPDATE sched_submit
    SET SCHED_STATUS = `action`
    WHERE SCHED_DEPT_CODE = dept;

  END main