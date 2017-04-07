<?php
include 'utils.php';

$utils = new Utils();
$dept = $utils->get('dept');
$query = "CALL getMostRecentSched('$dept')";
$result = $utils->query($query);
$schedule = $result[0];

if (array_key_exists("classes", $schedule)) {
    echo json_encode($schedule);
} else {
    $classes = $utils->query("CALL getClassesByDept('$dept')");
    $schedule["classes"] = $classes;
    echo json_encode($schedule);
}