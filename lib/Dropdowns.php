<?php
include 'RegistrarDatabase.php';

$dd = new Dropdowns();
$instructionalMethod = $dd->getInstructionalMethods();
$meetingSequences = $dd->getMeetingSequences();
$campus = $dd->getCampuses();
$attributeCode = $dd->getAttributeCode();
$majorRestrictions = $dd->getMajorRestrictions();
$classRestrictions = $dd->getClassRestrictions();
$levelRestrictions = $dd->getLevelRestrictions();
$programRestrictions = $dd->getProgramRestrictions();
$collegeRestrictions = $dd->getCollegeRestrictions();
$specialApprovals = $dd->getSpecialApprovals();
$scheduleTypes = $dd->getScheduleTypes();

$dropdownData = ["instructionalMethod" => $instructionalMethod, "meetingSequences" => $meetingSequences, "campus" => $campus,
        "attributeCode" => $attributeCode, "majorRestrictions" => $majorRestrictions, "classRestrictions" => $classRestrictions,
        "levelRestrictions" => $levelRestrictions, "programRestrictions" => $programRestrictions, "collegeRestrictions" => $collegeRestrictions,
        "specialApprovals" => $specialApprovals, "scheduleTypes" => $scheduleTypes
];

echo json_encode($dropdownData);

class Dropdowns {
    private $db;

    /**
     * Constructor for Dropdowns object.
     */
    public function __construct() {
        $this->db = new RegistrarDatabase();
    }

    /**
     * Gets all the different instructional method codes from the given rows.
     *
     * @return array
     */
    public function getInstructionalMethods() {
        $rows = $this->db->selectAllQuery('select_gtvinsm');
        $rowObj = array();
        $instructionalMethod = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            // adds instructional method code to array
            $instructionalMethod[] = $rowObj;
        }

        return $instructionalMethod;
    }

    /**
     * Retrieves all the meeting sequences data.
     *
     * @return array        the meeting sequences data
     */
    public function getMeetingSequences() {
        $rows = $this->db->selectAllQuery('select_stvmeet');
        $rowObj = array();
        $meetingSequences = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['dow'] = $rows[$i]['dow'];
            $rowObj['beginTime'] = $rows[$i]['beginTime'];
            $rowObj['endTime'] = $rows[$i]['endTime'];
            // adds instructional method code to array
            $meetingSequences[] = $rowObj;
        }

        return $meetingSequences;
    }

    /**
     * Retrieves all the campuses data.
     *
     * @return array        the campuses data
     */
    public function getCampuses() {
        $rows = $this->db->selectAllQuery('select_stvcamp');
        $campuses = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $campuses[] = $rowObj;
        }

        return $campuses;
    }

    /**
     * Retrieves all the billing attributes data.
     *
     * @return array        the billing attributes data
     */
    public function getAttributeCode() {
        $rows = $this->db->selectAllQuery('select_stvattr');
        $attributeCode = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $attributeCode[] = $rowObj;
        }

        return $attributeCode;
    }

    /**
     * Retrieves all the major restrictions data.
     *
     * @return array        the major restrictions data
     */
    public function getMajorRestrictions() {
        $rows = $this->db->selectAllQuery('select_stvmajr');
        $majorRestrictions = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['collegeCode'] = $rows[$i]['collegeCode'];
            $rowObj['collegeDesc'] = $rows[$i]['collegeDesc'];
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $rowObj['validMajorIndicator'] = $rows[$i]['validMajorIndicator'];
            $rowObj['validMinorIndicator'] = $rows[$i]['validMinorIndicator'];
            $rowObj['validConcentrationIndicator'] = $rows[$i]['validConcentrationIndicator'];
            $majorRestrictions[] = $rowObj;
        }

        return $majorRestrictions;
    }

    /**
     * Retrieves all the class restrictions data.
     *
     * @return array        the class restrictions data
     */
    public function getClassRestrictions() {
        $rows = $this->db->selectAllQuery('select_stvclas');
        $classRestrictions = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $classRestrictions[] = $rowObj;
        }

        return $classRestrictions;
    }

    /**
     * Retrieves all the level restrictions data.
     *
     * @return array        the level restrictions data
     */
    public function getLevelRestrictions() {
        $rows = $this->db->selectAllQuery('select_stvlevl');
        $levelRestrictions = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $levelRestrictions[] = $rowObj;
        }

        return $levelRestrictions;
    }

    /**
     * Retrieves all the program restrictions data.
     *
     * @return array        the program restrictions data
     */
    public function getProgramRestrictions() {
        $rows = $this->db->selectAllQuery('select_stvprog');
        $programRestrictions = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $programRestrictions[] = $rowObj;
        }

        return $programRestrictions;
    }

    /**
     * Retrieves all the college restrictions data.
     *
     * @return array        the college restrictions data
     */
    public function getCollegeRestrictions() {
        $rows = $this->db->selectAllQuery('select_stvcoll');
        $collegeRestrictions = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $collegeRestrictions[] = $rowObj;
        }

        return $collegeRestrictions;
    }

    /**
     * Retrieves all the special approvals data.
     *
     * @return array        the special approvals data
     */
    public function getSpecialApprovals() {
        $rows = $this->db->selectAllQuery('special_approvals_lookup');
        $specialApprovals = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $specialApprovals[] = $rowObj;
        }

        return $specialApprovals;
    }

    /**
     * Retrieves all the schedule types data.
     *
     * @return array        the schedule types data
     */
    public function getScheduleTypes() {
        $rows = $this->db->selectAllQuery('schedule_types_lookup');
        $scheduleTypes = array();

        // loops through rows
        for ($i = 0; $i < count($rows); $i++) {
            $rowObj['code'] = $rows[$i]['code'];
            $rowObj['desc'] = $rows[$i]['desc'];
            $scheduleTypes[] = $rowObj;
        }

        return $scheduleTypes;
    }
}
