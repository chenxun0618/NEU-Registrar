<?php
use PHPUnit\Framework\TestCase;

    class DropdownsTest extends TestCase {
        public function testGetInstructionalMethods() {
            $dd = new Dropdowns();
            $instructionalMethods = $dd->getInstructionalMethods();

            $this->assertEquals(
                11,
                count($instructionalMethods)
            );
        }

        public function testGetMeetingSequences() {
            $dd = new Dropdowns();
            $meetingSequences = $dd->getMeetingSequences();

            $this->assertEquals(
                117,
                count($meetingSequences)
            );
        }

        public function testGetCampuses() {
            $dd = new Dropdowns();
            $campuses = $dd->getCampuses();

            $this->assertEquals(
                20,
                count($campuses)
            );
        }

        public function testGetAttributeCode() {
            $dd = new Dropdowns();
            $attributes = $dd->getAttributeCode();

            $this->assertEquals(
                66,
                count($attributeCode)
            );
        }

        public function testGetMajorRestrictions() {
            $dd = new Dropdowns();
            $majorRestrictions = $dd->getMajorRestrictions();

            $this->assertEquals(
                793,
                count($majorRestrictions)
            );
        }

        public function testGetClassRestrictions() {
            $dd = new Dropdowns();
            $classRestrictions = $dd->getClassRestrictions();

            $this->assertEquals(
                7,
                count($classRestrictions)
            );
        }

        public function testGetLevelRestrictions() {
            $dd = new Dropdowns();
            $levelRestrictions = $dd->getLevelRestrictions();

            $this->assertEquals(
                6,
                count($levelRestrictions)
            );
        }

        public function testGetProgramRestrictions() {
            $dd = new Dropdowns();
            $programRestrictions = $dd->getProgramResrictions();

            $this->assertEquals(
                1169,
                count($programRestrictions)
            );
        }

        public function testGetCollegeRestrictions() {
            $dd = new Dropdowns();
            $collegeRestrictions = $dd->getCollegeRestrictions();

            $this->assertEquals(
                9,
                count($collegeRestrictions)
            );
        }
    }
?>
