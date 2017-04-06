<?php
$utils = new Utils();

$user_id = $utils->get("user_id");
$subject_query = "SELECT Subject FROM `CS 4500 Users` WHERE NUID = $user_id";
$subjects = $utils->query($subject_query);
$json_array = array();

$subject_array = preg_split(", ", $subjects->fetch_assoc()["Subject"]);