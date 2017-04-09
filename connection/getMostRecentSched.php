<?php
include 'DB.php';

$db = new DB();
$dept = $db->get('dept');
$query = "CALL getSubmissionByDept('$dept')";
$schedule = $db->query($query);

if (array_key_exists("classes", $schedule)) {
    $db->return_json(200, $result);
} else {
    $classes = $db->query("CALL getClassesByDept('$dept')");
    $schedule["classes"] = $classes;
    $db->return_json(200, $schedule);
}