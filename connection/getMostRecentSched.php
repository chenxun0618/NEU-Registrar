<?php
include 'utils.php';

$utils = new Utils();
$dept = $utils->get('dept');
$query = "CALL getMostRecentSched('$dept')";
$schedule = $utils->query($query);

if (array_key_exists("classes", $schedule)) {
    echo json_encode($schedule);
} else {
    $classes = $utils->query("CALL getClassesByDept('$dept')");
    array_push($schedule, $classes);
    echo json_encode($schedule);
}
