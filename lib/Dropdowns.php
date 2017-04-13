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
    $programRestrictions = $dd->getProgramResrictions();
    $collegeRestrictions = $dd->getCollegeRestrictions();

    $dropdownData = ["instructionalMethod"=>$instructionalMethod, "meetingSequences"=>$meetingSequences, "campus"=>$campus,
            "attributeCode"=>$attributeCode, "majorRestrictions"=>$majorRestrictions, "classRestrictions"=>$classRestrictions,
            "levelRestrictions"=>$levelRestrictions, "programRestrictions"=>$programRestrictions, "collegeRestrictions"=>$collegeRestrictions
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
         * @param $rows
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

        public function getProgramResrictions() {
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
    }
?>