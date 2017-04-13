<?php
include 'DB.php';

$db = new DB();
$id = $db->post('NUID');
$dept = $db->post('dept');
$timeStamp = $db->post('timeStamp');
$action = $db->post('action');
$classes = $db->post('classes');
$query = "CALL userUpdateSchedule('$id', '$dept', '$timeStamp', '$action', '$classes')";
$result = $db->query($query);

if ($result->num_rows <= 0)
    $db->header(200, "OK");
else
    $db->return_json(400, $result);
