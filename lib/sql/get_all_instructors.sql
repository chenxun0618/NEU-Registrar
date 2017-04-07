CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_instructors`()
BEGIN
    SELECT
      instructor.INSTRUCTOR_ID                                 AS id,
      CONCAT(INSTRUCTOR_LAST_NAME, ' ', INSTRUCTOR_FIRST_NAME) AS name
    FROM
      instructor
    ORDER BY
      INSTRUCTOR_LAST_NAME;
END