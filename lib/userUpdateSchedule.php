<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$db->postInit();
$id = $db->post('NUID');
$dept = $db->post('dept');
$timestamp = $db->post('timestamp');
$action = $db->post('action');
$classes = $db->post('classes');
$query = "CALL userUpdateSchedule('$id', '$dept', '$timestamp', '$action', '$classes')";
$result = $db->query($query);

if ($result->num_rows <= 0)
    $db->header(200, "OK");
else
    $db->return_json(400, $result);
// @codeCoverageIgnoreEnd
