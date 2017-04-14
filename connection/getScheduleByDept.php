<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$dept = $db->get('dept');
$query = "CALL getScheduleByDept('$dept')";
$schedule = $db->query($query);

if ($schedule["classes"] != "") {
    $db->return_json(200, $schedule);
} else {
    $classes = $db->query("CALL getClassesByDept('$dept')");
    $schedule["classes"] = $classes;
    $db->return_json(200, $schedule);
}
// @codeCoverageIgnoreEnd
