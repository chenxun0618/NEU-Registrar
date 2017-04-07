<?php
include 'utils.php';

$utils = new Utils();
$query = "CALL get_all_instructors()";
$result = $utils->query($query);
echo json_encode($result);