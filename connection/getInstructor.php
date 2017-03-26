<?php
$utils = new Utils();

$conn = $utils->connect();
$name = $_GET["name"];
$query = "SELECT * FROM `CS 4500 Users`";
$result = $utils->query($query);
$json_array = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_assoc()) {
        $row_array["instructor_id"] = $row["INSTRUCTOR_ID"];
        $row_array["instructorFirstName"] = $row["INSTRUCTOR_FIRST_NAME"];
        $row_array["instructorLastName"] = $row["INSTRUCTOR_LAST_NAME"];
        array_push($json_array, $row_array);
    }
}

echo json_encode($json_array);

$conn->close();