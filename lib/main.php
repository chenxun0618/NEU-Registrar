<?php
    include 'RegistrarDatabase.php';
    
    if (isset($_GET['table'])) {
        $table = $_GET['table'];
    } else {
        echo die('Error: "table" value not set.');
    }

    $db = new RegistrarDatabase;
    echo $db->queryTable($table);
?>
