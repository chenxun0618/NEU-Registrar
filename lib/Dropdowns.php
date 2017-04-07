<?php
    include 'RegistrarDatabase.php';

    $dd = new Dropdowns();
    $instructionalMethod = $dd->getInstructionalMethods();
    $campus = $dd->getCampuses();
    $billingAttributes = $dd->getBillingAttributes();
    $classRestrictions = $dd->getClassRestrictions();
    $levelRestrictions = $dd->getLevelRestrictions();

    $dropdownData = ["instructionalMethod"=>$instructionalMethod, "campus"=>$campus, "billingAttributes"=>$billingAttributes,
            "classRestrictions"=>$classRestrictions, "levelRestrictions"=>$levelRestrictions
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
            $instructionalMethod = array();

            // loops through rows
            for ($i = 0; $i < count($rows); $i++) {
                // adds instructional method code to array
                $instructionalMethod[$rows[$i]['code']] = $rows[$i]['desc'];
            }

            return $instructionalMethod;
        }

        public function getCampuses() {
            $rows = $this->db->selectAllQuery('select_ssbsect');
            $campus = array();
            $codes = array();

            // loops through rows
            for ($i = 0; $i < count($rows); $i++) {
                if (!array_key_exists($rows[$i]['campusCode'], $codes)) {
                    // adds campus code to array
                    $campus[$rows[$i]['campusCode']] = $rows[$i]['campusDesc'];
                    $codes[] = $rows[$i]['campusCode'];
                }
            }

            return $campus;
        }

        public function getBillingAttributes() {
            $rows = $this->db->selectAllQuery('select_stvattr');
            $billingAttributes = array();

            // loops through rows
            for ($i = 0; $i < count($rows); $i++) {
                $billingAttributes[$rows[$i]['code']] = $rows[$i]['desc'];
            }

            return $billingAttributes;
        }

        public function getClassRestrictions() {
            $rows = $this->db->selectAllQuery('select_stvclas');
            $classRestrictions = array();

            // loops through rows
            for ($i = 0; $i < count($rows); $i++) {
                $classRestrictions[$rows[$i]['code']] = $rows[$i]['desc'];
            }

            return $classRestrictions;
        }

        public function getLevelRestrictions() {
            $rows = $this->db->selectAllQuery('select_stvlevl');
            $levelRestrictions = array();

            // loops through rows
            for ($i = 0; $i < count($rows); $i++) {
                $levelRestrictions[$rows[$i]['code']] = $rows[$i]['desc'];
            }

            return $levelRestrictions;
        }
    }
?>