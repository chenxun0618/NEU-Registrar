CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_instructors`()
  BEGIN
    SELECT
      INSTRUCTOR_ID AS 'nuid',
      CONCAT(INSTRUCTOR_FIRST_NAME, ' ', INSTRUCTOR_LAST_NAME) AS 'name'
    FROM instructor
    ORDER BY INSTRUCTOR_LAST_NAME;
  END