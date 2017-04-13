<?php
    include 'RegistrarDatabase.php';

    if (isset($_GET['subjectCode'])) {
        $subjectCode = $_GET['subjectCode'];
    } else {
        echo "Error: Subject code parameter was not set.";
        return;
    }

    if (isset($_GET['courseNumber'])) {
        $courseNumber = $_GET['courseNumber'];
    } else {
        echo "Error: Course number parameter was not set.";
        return;
    }

    $db = new RegistrarDatabase();
    $courseCatalog = $db->getCourseCatalog($subjectCode, $courseNumber)[0];

    echo json_encode($courseCatalog);
?>