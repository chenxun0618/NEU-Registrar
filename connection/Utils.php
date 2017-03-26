<?php
class Utils
{
    protected static $conn;

    function connect()
    {
        // If a connection has not been established yet, establish it
        if (!isset(self::$conn)) {
            // Load configuration
            $config = parse_ini_file('../config.ini');
            self::$conn = new mysqli('localhost', $config['username'], $config['password'], $config['database']);
        }

        // If connection was not established
        if (!self::$conn)
            die("Connection failed: " . mysqli_connect_error());

        return self::$conn;
    }

    function query($query)
    {
        // Connect to the database
        $conn = $this->connect();

        // Query the database
        $result = $conn->query($query);

        // If database cannot process the query
        if (!$result)
            die("Couldn't find the information: " . mysqli_error($conn));

        return $result;
    }
}




