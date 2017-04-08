<?php
include 'utils.php';

$utils = new Utils();
$id = $utils->get('NUID');
$dept = $utils->get('dept');
$timeStamp = $utils->get('timeStamp');
$status = $utils->get('status');
$classes = $utils->get('classes');

$query = "CALL userUpdateSchedule('$id', '$dept', $timeStamp, '$status', $classes)";
$utils->query($query);
