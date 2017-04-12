<?php
include 'DB.php';

$db = new DB();
$dept = $db->get('dept');
$query = "CALL getScheduleByDept('$dept')";
$result = $db->query($query);
$db->return_json(200, $result);