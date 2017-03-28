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
            $config = parse_ini_file('../config.ini');
            $this->conn = new mysqli($config['hostname'], $config['username'], $config['password'], $config['database']);
        }

        // If connection was not established
        if (!$this->conn)
            die("Connection failed: " . $this->conn->connect_error);
    }

    /*
     * connect to the database and construct a query
     */
    function query($query)
    {
        // Query the database
        $result = $this->conn->query($query);

        // If database cannot process the query
        if (!$result) {
            $this->conn->close();
            die("Couldn't find the information: " . $this->conn->error);
        }

        // If there is no rows in the result
        if (mysqli_num_rows($result) <= 0) {
            $this->conn->close();
            die("0 results");
        }

        return $result;
    }

    /*
     * get the value from front-end request
     */
    function get($val)
    {
        if (!isset($_GET[$val])) {
            die($val . "is not valid");
        }
        return $_GET[$val];
    }

    /*
     * close the connection to the database
     */
    function __destruct()
    {
        $this->conn->close();
    }
}