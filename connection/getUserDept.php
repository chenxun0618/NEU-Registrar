<?php
include 'utils.php';

$utils = new Utils();
$id = $utils->get('NUID');
$query = "CALL getUserDept('$id')";
$result = $utils->query($query);
echo json_encode($result);