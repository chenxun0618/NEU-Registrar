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

        echo "connection established\n";
    }

    /*
     * close the connection to the database
     */
    function __destruct()
    {
        $this->conn->close();
        echo "connection closed\n";
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
     * construct a query
     */
    function construct_query($query, $values)
    {
        $stmt = $this->conn->prepare($query);

        for ($i = 1; $i <= count($values); $i++) {
            $stmt->bind_param($i, $values[$i]);
        }

        $result = $stmt->execute();

        // If database cannot process the query
        if (!$result)
            die("Couldn't find the information: " . $this->conn->error);

        return $result;
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
            die("Couldn't find the information: " . $this->conn->error . "\n");

        // If there is no rows in the result
        if ($result->num_rows <= 0)
            die("0 results\n");

        $array = array();
        while ($row = $result->fetch_assoc()) {
            $row_array = array();
            foreach ($row as $key => $value) {
                $row_array[$key] = $value;
            }
            array_push($array, $row_array);
        }

        $result->close();
        $this->conn->next_result();

        return $array;
    }
}