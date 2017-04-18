<?php
// @codeCoverageIgnoreStart
include 'DB.php';

$db = new DB();
$email = $db->get('email');
$id = $db->get('NUID');
$query = "CALL login('$email', '$id')";
$result = $db->query($query);
$db->return_json(200, $result);
// @codeCoverageIgnoreEnd
