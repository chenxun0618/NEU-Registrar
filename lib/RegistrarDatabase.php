<?php

class RegistrarDatabase {
    protected $host;
    protected $username;
    protected $password;
    protected $dbName;

    /**
     * Constructor for RegistrarDatabase object.
     */
    public function __construct() {
        // loads configuration file as an array
        $config = parse_ini_file('config/config.ini');
        $this->host = $config['hostname'];
        $this->username = $config['username'];
        $this->password = $config['password'];
        $this->dbName = $config['database'];
    }

    /**
     * Makes a connection to the database using the given parameters.
     *
     * @return mysqli       a database connection
     */
    protected function databaseConnect() {
        try {
            $conn = new mysqli($this->host, $this->username, $this->password, $this->dbName);
            // @codeCoverageIgnoreStart
        } catch (Exception $e) {
            throw new mysqli_sql_exception("Error with database connection: " . $e);
        }
        // @codeCoverageIgnoreEnd

        return $conn;
    }

    /**
     * Getter method for host name.
     *
     * @return string       the host name
     */
    public function getHost() {
        return $this->host;
    }

    /**
     * Getter method for database name.
     *
     * @return string       the database name
     */
    public function getDatabaseName() {
        return $this->dbName;
    }

    /**
     * Updates the hostname.
     *
     * @param string $newHost the new hostname
     */
    protected function updateHost($newHost) {
        if ($newHost == '') {
            throw new InvalidArgumentException("New hostname is an empty string.");
        }

        $this->host = $newHost;
    }

    /**
     * Updates the database name.
     *
     * @param string $newDB the new database name
     */
    protected function updateDatabaseName($newDB) {
        if ($newDB == '') {
            throw new InvalidArgumentException("New database name is an empty string.");
        }

        $this->dbName = $newDB;
    }

    /**
     * Makes a "select all" query to the given table.
     *
     * @param string $sp the stored procedure to call
     * @throws Exception
     * @return array            the rows results from the query as JSON
     */
    public function selectAllQuery($sp) {
        $conn = $this->databaseConnect();

        if ($sp == '') {
            throw new InvalidArgumentException("Input is an empty string.");
        }

        if (!$this->checkValidStoredProcedure($conn, $sp)) {
            throw new InvalidArgumentException("Not a valid stored procedure.");
        }

        $sp = mysqli_real_escape_string($conn, $sp);

        $resultsArr = array();
        $fieldsArr = array();
        $rowObj = array();
        // SQL statement for select all
        $query = <<<SQL
              CALL $sp();
SQL;

        try {
            $result = mysqli_query($conn, $query);
        // @codeCoverageIgnoreStart
        } catch (Exception $e) {
            throw new mysqli_sql_exception("Error with query: " . $e);
        }
        // @codeCoverageIgnoreEnd

        // loops through field names in table
        while ($field = mysqli_fetch_field($result)) {
            if ($field->name !== "" && $field->name !== NULL) {
                $fieldsArr[] = (string)$field->name;
            }
        }

        // loops through rows in table
        while ($row = mysqli_fetch_assoc($result)) {
            // loops through fields found in table
            for ($i = 0; $i < count($fieldsArr); $i++) {
                $rowObj[$fieldsArr[$i]] = $row[$fieldsArr[$i]];
            }

            // pushes row object to the results array
            $resultsArr[] = $rowObj;
        }

        return $resultsArr;
    }

    public function getCourseCatalog($subjectCode, $courseNumber) {
        $conn = $this->databaseConnect();

        if ($subjectCode == '') {
            throw new InvalidArgumentException("Subject code is an empty string.");
        }

        if ($courseNumber == '') {
            throw new InvalidArgumentException("Course number is an empty string.");
        }

        $subjectCode = mysqli_real_escape_string($conn, $subjectCode);
        $courseNumber = mysqli_real_escape_string($conn, $courseNumber);
        $query = <<<SQL
              CALL course_catalog_lookup('$subjectCode', '$courseNumber');
SQL;

        $rowObj = array();
        $courseCatalog = array();

        try {
            $result = mysqli_query($conn, $query);
        // @codeCoverageIgnoreStart
        } catch (Exception $e) {
            throw new mysqli_sql_exception("Error with query: " . $e);
        }
        // @codeCoverageIgnoreEnd

        while ($row = mysqli_fetch_assoc($result)) {
            $rowObj['collegeCode'] = $row['collegeCode'];
            $rowObj['collegeDescription'] = $row['collegeDescription'];
            $rowObj['departmentCode'] = $row['departmentCode'];
            $rowObj['departmentDescription'] = $row['departmentDescription'];
            $rowObj['subjectCode'] = $row['subjectCode'];
            $rowObj['courseNumber'] = $row['courseNumber'];
            $rowObj['title'] = $row['title'];

            $courseCatalog[] = $rowObj;
        }

        return $courseCatalog;
    }

    /**
     * Checks if the given stored procedure name is in the database.
     *
     * @param string $sp the name of the stored procedure
     * @return bool     whether or not the name is in the database
     */
    public function checkValidStoredProcedure($conn, $sp) {
        if ($sp == '') {
            throw new InvalidArgumentException("Input is an empty string.");
        }

        $sp = mysqli_real_escape_string($conn, $sp);

        $resultsArr = array();
        $query = <<<SQL
                SELECT name
                FROM mysql.proc
                WHERE db = '$this->dbName';
SQL;

        try {
            $result = mysqli_query($conn, $query);
        // @codeCoverageIgnoreStart
        } catch (Exception $e) {
            throw new mysqli_sql_exception("Error with query: " . $e);
        }
        // @codeCoverageIgnoreEnd

        // loops through rows in table
        while ($row = mysqli_fetch_assoc($result)) {
            $resultsArr[] = $row['name'];
        }

        return in_array($sp, $resultsArr);
    }
}
