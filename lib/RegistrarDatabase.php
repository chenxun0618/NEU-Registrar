<?php
    class RegistrarDatabase {
        protected $conn;

        public function __construct() {
            if (!isset($this->conn)) {
                // loads configuration file as an array
                $config = parse_ini_file('../config/config.ini');

                $this->conn = new mysqli('localhost', $config['username'], $config['password'], $config['db_name']);
                //echo "\nSuccessfully connected!";
                if ($this->conn->connect_errno > 0) {
                    echo die("Error with connection");
                    fwrite(STDERR, "MySQL connection error: " . $this->conn->connect_error);
                    exit(1);
                }
            } else {
                echo die("Error with connection");
                fwrite(STDERR, "A database connection already exists.");
                exit(1);
            }
        }

        public function __destruct() {
            $this->conn->close();
        }

        public function queryTable($table) {
            $resultsArr = array();
            $fieldsArr = array();
            $rowObj = array();
            $query = <<<SQL
                SELECT * FROM $table;
SQL;

            if (!$result = $this->conn->query($query)) {
                echo die("Error with query" . $this->conn->error);
                fwrite(STDERR, "Error with query: " . $this->conn->error);
                exit(1);
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
                    for ($i = 0; $i <= sizeof($fieldsArr); $i++) {
                        $rowObj[(string) $fieldsArr[$i]] = $row[(string) $fieldsArr[$i]];
                    }

                    // pushes row object to the results array
                    $resultsArr[] = $rowObj;
                }
            } else {
                echo die("\nNot gtvinsm");
                fwrite(STDERR, "Not the expected table.");
                exit(1);
            }

            return json_encode($resultsArr);
        }
    }
?>
