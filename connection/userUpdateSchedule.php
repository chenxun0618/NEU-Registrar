<?php
include 'DB.php';

$db = new DB();
$id = $db->get('NUID');
$dept = $db->get('dept');
$timeStamp = $db->get('timeStamp');
$status = $db->get('status');
$classes = $db->get('classes');

$query = "CALL userUpdateSchedule('$id', '$dept', $timeStamp, '$status', $classes)";
$db->query($query);
