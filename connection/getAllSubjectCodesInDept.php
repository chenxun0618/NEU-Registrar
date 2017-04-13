<?php
include 'DB.php';

$db = new DB();
$dept = $db->get('dept');
$query = "CALL getAllSubjectCodesInDept('$dept')";
$subjectCodes = $db->query($query);
$db->return_json(200, $subjectCodes);