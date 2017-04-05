<?php
    class RegistrarDatabase {
        protected $conn;
        protected $host;
        protected $dbName;

        /**
         * Constructor for RegistrarDatabase object.
         */
        public function __construct() {
            // loads configuration file as an array
            $config = parse_ini_file('config/config.ini');
            $this->databaseConnect($config['host'], $config['username'], $config['password'], $config['db_name']);
            $this->host = $config['host'];
            $this->dbName = $config['db_name'];
        }

        /**
         * Deconstructor for RegistrarDatabase object.
         */
        public function __destruct() {
            $this->conn->close();
        }

        /**
         * Makes a connection to the database using the given parameters.
         *
         * @param $host
         * @param $username
         * @param $password
         * @param $db_name
         */
        protected function databaseConnect($host, $username, $password, $db_name) {
            try {
                $this->conn = new mysqli($host, $username, $password, $db_name);
            } catch (Exception $e) {
                throw new mysqli_sql_exception("Error with database connection: " . $e);
            }
        }

        /**
         * Getter method for host name.
         *
         * @return string       the host name
         */
        public function getHost() {
            return (string) $this->host;
        }

        /**
         * Getter method for database name.
         *
         * @return string       the database name
         */
        public function getDatabaseName() {
            return (string) $this->dbName;
        }

        protected function updateHost($newHost) {
            if ($newHost == '') {
                throw new InvalidArgumentException("New host name is an empty string.");
            }

            $this->host = $newHost;
        }

        protected function updateDatabaseName($newDB) {
            if ($newDB == '') {
                throw new InvalidArgumentException("New database name is an empty string.");
            }

            $this->dbName = $newDB;
        }

        /**
         * Makes a "select all" query to the given table.
         *
         * @param string $sp     the stored procedure to call
         * @throws Exception
         * @return array            the rows results from the query as JSON
         */
        public function selectAllQuery($sp) {
            if ($sp == '') {
                throw new InvalidArgumentException("Input is an empty string.");
            }

            if (!$this->checkValidStoredProcedure($sp)) {
                throw new InvalidArgumentException("Not a valid stored procedure.");
            }

            $sp = mysqli_real_escape_string($this->conn, $sp);

            $resultsArr = array();
            $fieldsArr = array();
            $rowObj = array();
            // SQL statement for select all
            $query = <<<SQL
              CALL $sp();
SQL;

            try {
                $result = mysqli_query($this->conn, $query);
            // @codeCoverageIgnoreStart
            } catch (Exception $e) {
                throw new mysqli_sql_exception("Error with query: " . $e);
            }
            // @codeCoverageIgnoreEnd

            // loops through field names in table
            while ($field = mysqli_fetch_field($result)) {
                if ($field->name !== "" && $field->name !== NULL) {
                    $fieldsArr[] = (string) $field->name;
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

        /**
         * Checks if the given stored procedure name is in the database.
         *
         * @param string $sp      the name of the stored procedure
         * @return bool     whether or not the name is in the database
         */
        public function checkValidStoredProcedure($sp) {
            if ($sp == '') {
                throw new InvalidArgumentException("Input is an empty string.");
            }

            $sp = mysqli_real_escape_string($this->conn, $sp);

            $resultsArr = array();
            $query = <<<SQL
                SELECT name
                FROM mysql.proc
                WHERE db = '$this->dbName';
SQL;

            try {
                $result = mysqli_query($this->conn, $query);
            // @codeCoverageIgnoreStart
            } catch (Exception $e) {
                throw new mysqli_sql_exception("Error with query: " . $e);
            }
            // @codeCoverageIgnoreStart

            // loops through rows in table
            while ($row = mysqli_fetch_assoc($result)) {
                $resultsArr[] = $row['name'];
            }

            return in_array($sp, $resultsArr);
        }
    }
?>
