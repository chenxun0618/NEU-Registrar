<?php
    class RegistrarDatabase {
        protected $conn;

        /**
         * Constructor for RegistrarDatabase object.
         */
        public function __construct() {
            if (!isset($this->conn)) {
                // loads configuration file as an array
                $config = parse_ini_file('../config/config.ini');

                $this->conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);
                if ($this->conn->connect_errno > 0) {
                    throw new Exception("Error with databse connection: " . $this->conn->connect_error);
                }
            } else {
                echo die("Error with connection");
                fwrite(STDERR, "A database connection already exists.");
                exit(1);
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
         * @param string $table     the table to query on
         * @return array            the rows results from the query as JSON
         */
        public function selectAllQuery($table) {
            $resultsArr = array();
            $fieldsArr = array();
            $rowObj = array();
            // SQL statement for select all
            $query = <<<SQL
                SELECT * FROM $table;
SQL;

            if (!$result = $this->conn->query($query)) {
                throw new Exception("Error with query: " . $this->conn->error);
            }

            if ($table !== '') {
                // loops through field names in table
                while ($field = $result->fetch_field()) {
                    if ($field->name !== "" && $field->name !== NULL) {
                        $fieldsArr[] = $field->name;
                    }
                }

                // loops through rows in table
                while ($row = $result->fetch_assoc()) {
                    // loops through fields found in table
                    for ($i = 0; $i <= count($fieldsArr); $i++) {
                        $rowObj[(string) $fieldsArr[$i]] = $row[(string) $fieldsArr[$i]];
                    }

                    // pushes row object to the results array
                    $resultsArr[] = $rowObj;
                }
            } else {
                echo die("Table name is empty.");
                fwrite(STDERR, "Table name is empty.");
                exit(1);
            }

            return json_encode($resultsArr);
        }
    }
?>
