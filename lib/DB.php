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
            $config = parse_ini_file('config/config.ini');
            $this->conn = new mysqli($config['hostname'], $config['username'],
                $config['password'], $config['database']);
        }

        // If connection was not established
        // @codeCoverageIgnoreStart
        if ($this->conn->connect_errno) {
            $this->header(500, $this->conn->connect_error);
            die;
        }
        // @codeCoverageIgnoreEnd
    }

    /*
     * close the connection to the database
     */
    function __destruct()
    {
        $this->conn->close();
    }

    /*
     * get the value from front-end get request
     */
    // @codeCoverageIgnoreStart
    function get($val)
    {
        if (!isset($_GET[$val])) {
            $this->header(400, $val . " is not valid");
            die;
        }
        return mysqli_real_escape_string($this->conn, $_GET[$val]);
    }

    /*
     * initialize post request data
     */
    function postInit()
    {
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);
    }

    /*
     * get the value from front-end post request
     */
    function post($val)
    {
        if (!isset($_POST[$val])) {
            $this->header(400, $val . " is not valid");
            die;
        }
        return mysqli_real_escape_string($this->conn, $_POST[$val]);
    }

    /*
     * set the response header
     */
    function header($code, $text)
    {
        header("HTTP/1.1 " . $code . ' ' . $text);
    }
    // @codeCoverageIgnoreEnd

    /*
     * perform a query on the database and return the retrieved data in an array
     */
    function query($query)
    {
        // Query the database
        $result = $this->conn->query($query);

        // If database cannot process the query
        // @codeCoverageIgnoreStart
        if (!$result) {
            $this->header(400, $this->conn->error);
            die;
        }
        // @codeCoverageIgnoreEnd

        // If there is no rows in the result
        if ($result->num_rows <= 0)
            return $result;

        $array = array();
        while ($row = $result->fetch_assoc()) {
            $row_array = array();
            foreach ($row as $key => $value) {
                $json = json_decode($value);
                if (is_null($json) || is_numeric($json))
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
    // @codeCoverageIgnoreStart
    function return_json($code, $json)
    {
        if ($code / 100 == 2)
            $text = "OK";
        else
            $text = $this->conn->error;

        $this->header($code, $text);
        header("Content-Type: application/json");
        echo json_encode($json);
    }
    // @codeCoverageIgnoreEnd
}