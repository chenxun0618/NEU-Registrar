<?php
include 'DB.php';

$db = new DB();
$action = $db->get('action');
$dept = $db->get('dept');
if (isset($_GET['comment'])) {
    $comment = $_GET['comment'];
} else {
    $comment = "";
}
$query = "CALL adminUpdateSchedule('$action', '$dept', $comment)";
$db->query($query);
$db->header(200, "OK");