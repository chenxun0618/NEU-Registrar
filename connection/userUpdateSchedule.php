<?php
include 'DB.php';

$db = new DB();
$id = $db->get('NUID');
$dept = $db->get('dept');
$timeStamp = $db->get('timeStamp');
$status = $db->get('status');
$classes = $db->get('classes');
$query = "CALL userUpdateSchedule('$id', '$dept', '$timeStamp', '$status', '$classes')";
$result = $db->query($query);

if ($result->num_rows <= 0)
    $db->header(200, "OK");
else
    $db->return_json(400, $result);
