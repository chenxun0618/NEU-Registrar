<?php

/*
 * a utility class that contains all the framework functions
 */

class Utils
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
            die($val . "is not valid");
        }
        return $_GET[$val];
    }

    /*
     * construct a query with front-end input (stored procedures)
     */
    function construct_query()
    {

    }

    /*
     * perform a query on the database and return the result in JSON representation
     */
    function query($query)
    {
        // Query the database
        $result = $this->conn->query($query);

        // If database cannot process the query
        if (!$result) {
            $this->conn->close();
            die("Couldn't find the information: " . $this->conn->connect_error);
        }

        // If there is no rows in the result
        if ($result->num_rows <= 0) {
            $this->conn->close();
            die("0 results");
        }

        $array = array();
        while ($row = $result->fetch_assoc()) {
            $row_array = array();
            foreach ($row as $key => $value) {
                $row_array[$key] = $value;
            }
            array_push($array, $row_array);
        }

        return json_encode($array);
    }
}