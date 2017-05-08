<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$db->postInit();
$action = $db->post('action');
$dept = $db->post('dept');
if (isset($_POST['comment'])) {
    $comment = $_POST['comment'];
} else {
    $comment = "";
}
$query = "CALL adminUpdateSchedule('$action', '$dept', '$comment')";
$db->query($query);
$db->header(200, "OK");
// @codeCoverageIgnoreEnd
