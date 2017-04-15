<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$id = $db->post('NUID');
$dept = $db->post('dept');
date_default_timezone_set('America/New_York'); // needed to ensure date in correct format
$timeStamp = date("Y-m-d H:i:s"); // create new date for mysql
$action = $db->post('action');
$classes = $db->post('classes');
$query = "CALL userUpdateSchedule('$id', '$dept', '$timeStamp', '$action', '$classes')";
$result = $db->query($query);

if ($result->num_rows <= 0)
    $db->header(200, "OK");
else
    $db->return_json(400, $result);
// @codeCoverageIgnoreEnd
