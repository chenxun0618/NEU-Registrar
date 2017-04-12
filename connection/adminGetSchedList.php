<?php
include 'DB.php';

$db = new DB();
$query = "CALL adminGetSchedList()";
$result = $db->query($query);
$db->return_json(200, $result);