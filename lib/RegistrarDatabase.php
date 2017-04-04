<?php
    final class RegistrarDatabase {
        protected $conn;

        /**
         * Constructor for RegistrarDatabase object.
         */
        public function __construct() {
            if (!isset($this->conn)) {
                // loads configuration file as an array
                $config = parse_ini_file('config/config.ini');

                $this->conn = new mysqli($config['host'], $config['username'], $config['password'], $config['db_name']);
                if ($this->conn->connect_errno > 0) {
                    throw new Exception("Error with database connection: " . $this->conn->error);
                }
            } else {
                throw new mysqli_sql_exception("Error with connection");
            }
        }

        /**
         * Deconstructor for RegistrarDatabase object.
         */
        public function __destruct() {
            $this->conn->close();
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

            $resultsArr = array();
            $fieldsArr = array();
            $rowObj = array();
            // SQL statement for select all
            $query = <<<SQL
              CALL $sp();
SQL;

            if (!$result = $this->conn->query($query)) {
                throw new mysqli_sql_exception("Error with query: " . $this->conn->error);
            }

            // loops through field names in table
            while ($field = $result->fetch_field()) {
                if ($field->name !== "" && $field->name !== NULL) {
                    $fieldsArr[] = (string) $field->name;
                }
            }

            // loops through rows in table
            while ($row = $result->fetch_assoc()) {
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
         * @param string $name      the name of the stored procedure
         * @return bool     whether or not the name is in the database
         */
        public function checkValidStoredProcedure($name) {
            if ($name == '') {
                throw new InvalidArgumentException("Input is an empty string.");
            }

            $resultsArr = array();
            $query = <<<SQL
                SELECT name
                FROM mysql.proc
                WHERE db = 'test_neu_registrar';
SQL;

            if (!$result = $this->conn->query($query)) {
                throw new mysqli_sql_exception("Error with query: " . $this->conn->error);
            }

            // loops through rows in table
            while ($row = $result->fetch_assoc()) {
                $resultsArr[] = $row['name'];
            }

            return in_array($name, $resultsArr);
        }
    }
?>
