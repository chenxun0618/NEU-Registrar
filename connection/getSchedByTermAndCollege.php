<?php
$utils = new Utils();

$term = $utils->get("term");
$college = $utils->get("department");
$query = "SELECT * FROM ssbsect WHERE SSBSECT_TERM_CODE = $term AND SSBSECT_COLL_CODE = $college";
$result = $utils->query($query);
$json_array = array();

while ($row = $result->fetch_assoc()) {
    $row_array = array(
        "term" => $row["SSBSECT_TERM_CODE"],
        "college" => $row["SSBSECT_COLL_CODE"],
        "collegeName" => $row["SSBSECT_COLL_DESC"],
        "departmentCode" => $row["SSBSECT_DEPT_CODE"],
        "departmentName" => $row["SSBSECT_DEPT_DESC"],
        "crn" => $row["SSBSECT_CRN"],
        "partOfTerm" => $row["SSBSECT_PTRM_CODE"],
        "subjectCode" => $row["SSBSECT_SUBJ_CODE"],
        "courseNumber" => $row["SSBSECT_CRSE_NUMB"],
        "section" => $row["SSBSECT_SEQ_NUMB"],
        "sectionStatus" => $row["SSBSECT_SSTS_CODE"],
        "scheduleTypeCode" => $row["SSBSECT_SCHD_CODE"],
        "scheduleTypeDescription" => $row["SSBSECT_SCHD_DESC"],
        "campus" => $row["SSBSECT_CAMP_CODE"],
        "campusName" => $row["SSBSECT_CAMP_DESC"],
        "courseAlterTitle" => $row["SSBSECT_CRSE_TITLE_ALT"],
        "courseTitle" => $row["SSBSECT_CRSE_TITLE"],
        "creditHour" => $row["SSBSECT_CREDIT_HR"],
        "billingHour" => $row["SSBSECT_BILLING_HR"],
        "maxEnrollment" => $row["SSBSECT_MAX_ENRL"],
        "instructionalMethod" => $row["SSBSECT_INSM_CODE"],
        "instructionalMethodDescription" => $row["SSBSECT_INSM_DESC"],
        "previousEnrollment" => $row["SSBSECT_ENRL"]);
    array_push($json_array, $row_array);
}

echo json_encode($json_array);