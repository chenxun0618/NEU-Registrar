<?php
    include 'RegistrarDatabase.php';

    if (isset($_GET['procedure'])) {
        $sp = $_GET['procedure'];
    } else {
        echo die('Error: "procedure" value not set.');
    }

    $db = new RegistrarDatabase;
    echo $db->selectAllQuery($sp);
?>
