<?php
$utils = new Utils();

$name = $utils->get("name");
$query = "SELECT * FROM `CS 4500 Users`";
$result = $utils->query($query);
$json_array = array();

while ($row = $result->fetch_assoc()) {
    $row_array = array(
        "instructor_id" => $row["INSTRUCTOR_ID"],
        "instructorFirstName" => $row["INSTRUCTOR_FIRST_NAME"],
        "instructorLastName" => $row["INSTRUCTOR_LAST_NAME"]);
    array_push($json_array, $row_array);
}

echo json_encode($json_array);