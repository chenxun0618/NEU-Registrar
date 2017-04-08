<?php

/*
 * a utility class that contains all the framework functions
 */

class DB
{
    protected $conn;

    /*
     * set up the connection to the database
     */
    function __construct()
    {
        // If a connection has not been established yet, establish it
        if (!isset($this->conn)) {
            // Load configuration
            $config = parse_ini_file('config.ini');
            $this->conn = new mysqli($config['hostname'], $config['username'],
                $config['password'], $config['database']);
        }

        // If connection was not established
        if ($this->conn->connect_errno)
            die("Connection failed: " . $this->conn->connect_error);
    }

    /*
     * close the connection to the database
     */
    function __destruct()
    {
        $this->conn->close();
    }

    /*
     * get the value from front-end query
     */
    function get($val)
    {
        if (!isset($_GET[$val])) {
            die($val . " is not valid");
        }
        return $_GET[$val];
    }

    /*
     * set the response header
     */
    function header()
    {
        if (!$this->conn->errno) {
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
        } else {
            header("HTTP/1.1 500 " . $this->conn->error);
            header("Content-Type: application/json");
        }
    }

    /*
     * perform a query on the database and return the retrieved data in an array
     */
    function query($query)
    {
        // Query the database
        $result = $this->conn->query($query);

        // If database cannot process the query
        if (!$result)
            die("Couldn't find the information: " . $this->conn->error);

        // If there is no rows in the result
        if ($result->num_rows <= 0)
            die("0 results");

        $array = array();
        while ($row = $result->fetch_assoc()) {
            $row_array = array();
            foreach ($row as $key => $value) {
                $json = json_decode($value);
                if (is_null($json))
                    $row_array[$key] = $value;
                else
                    $row_array[$key] = $json;
            }
            array_push($array, $row_array);
        }

        $result->close();
        $this->conn->next_result();

        if (count($array) == 1)
            return $array[0];

        return $array;
    }

    /*
     * set the header of the response and return json_encoded result
     */
    function return_json($json)
    {
        $this->header();
        echo json_encode($json);
    }
}