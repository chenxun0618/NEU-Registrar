<?php
include 'DB.php';

$db = new DB();
$query = "CALL get_all_instructors()";
$result = $db->query($query);
$db->return_json($result);