<?php
include 'utils.php';

$utils = new Utils();
$query = "CALL getAllInstructors()";
echo $utils->query($query);