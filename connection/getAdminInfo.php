<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$id = $db->get('NUID');
$query = "CALL getAdminInfo('$id')";
$result = $db->query($query);
$db->return_json(200, $result);
// @codeCoverageIgnoreEnd
