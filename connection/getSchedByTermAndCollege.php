<?php
$utils = new Utils();

$conn = $utils->connect();
$term = $_GET["term"];
$college = $_GET["department"];
$query = "SELECT * FROM `ssbsect` WHERE SSBSECT_TERM_CODE = $term AND SSBSECT_COLL_CODE = $college ";
$result = $utils->query($query);
$json_array = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_assoc()) {
        $row_array["term"] = $row["SSBSECT_TERM_CODE"];
        $row_array["college"] = $row["SSBSECT_COLL_CODE"];
        $row_array["collegeName"] = $row["SSBSECT_COLL_DESC"];
        $row_array["departmentCode"] = $row["SSBSECT_DEPT_CODE"];
        $row_array["departmentName"] = $row["SSBSECT_DEPT_DESC"];
        $row_array["crn"] = $row["SSBSECT_CRN"];
        $row_array["partOfTerm"] = $row["SSBSECT_PTRM_CODE"];
        $row_array["subjectCode"] = $row["SSBSECT_SUBJ_CODE"];
        $row_array["courseNumber"] = $row["SSBSECT_CRSE_NUMB"];
        $row_array["section"] = $row["SSBSECT_SEQ_NUMB"];
        $row_array["sectionStatus"] = $row["SSBSECT_SSTS_CODE"];
        $row_array["scheduleTypeCode"] = $row["SSBSECT_SCHD_CODE"];
        $row_array["scheduleTypeDescription"] = $row["SSBSECT_SCHD_DESC"];
        $row_array["campus"] = $row["SSBSECT_CAMP_CODE"];
        $row_array["campusName"] = $row["SSBSECT_CAMP_DESC"];
        $row_array["courseAlterTitle"] = $row["SSBSECT_CRSE_TITLE_ALT"];
        $row_array["courseTitle"] = $row["SSBSECT_CRSE_TITLE"];
        $row_array["creditHour"] = $row["SSBSECT_CREDIT_HR"];
        $row_array["billingHour"] = $row["SSBSECT_BILLING_HR"];
        $row_array["maxEnrollment"] = $row["SSBSECT_MAX_ENRL"];
        $row_array["instructionalMethod"] = $row["SSBSECT_INSM_CODE"];
        $row_array["instructionalMethodDescription"] = $row["SSBSECT_INSM_DESC"];
        $row_array["previousEnrollment"] = $row["SSBSECT_ENRL"];
        array_push($json_array, $row_array);
    }
}

echo json_encode($json_array);

$conn->close();