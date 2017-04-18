<?php
use PHPUnit\Framework\TestCase;

class DropdownsTest extends TestCase {
    /**
     * Tests that the output for the getInstructionalMethods method is correct.
     */
    public function testGetInstructionalMethods() {
        $dd = new Dropdowns();
        $instructionalMethods = $dd->getInstructionalMethods();

        $this->assertEquals(
                11,
                count($instructionalMethods)
        );
    }

    /**
     * Tests that the output for the getMeetingTimes method is correct.
     */
    public function testGetMeetingTimes() {
        $dd = new Dropdowns();
        $meetingTimes = $dd->getMeetingTimes();

        $this->assertEquals(
                117,
                count($meetingTimes)
        );
    }

    /**
     * Tests that the output for the getCampuses method is correct.
     */
    public function testGetCampuses() {
        $dd = new Dropdowns();
        $campuses = $dd->getCampuses();

        $this->assertEquals(
                20,
                count($campuses)
        );
    }

    /**
     * Tests that the output for the getAttributeCode method is correct.
     */
    public function testGetAttributeCode() {
        $dd = new Dropdowns();
        $attributes = $dd->getAttributeCode();

        $this->assertEquals(
                66,
                count($attributes)
        );
    }

    /**
     * Tests that the output for the getMajorRestrictions method is correct.
     */
    public function testGetMajorRestrictions() {
        $dd = new Dropdowns();
        $majorRestrictions = $dd->getMajorRestrictions();

        $this->assertEquals(
                793,
                count($majorRestrictions)
        );
    }

    /**
     * Tests that the output for the getClassRestrictions method is correct.
     */
    public function testGetClassRestrictions() {
        $dd = new Dropdowns();
        $classRestrictions = $dd->getClassRestrictions();

        $this->assertEquals(
                7,
                count($classRestrictions)
        );
    }

    /**
     * Tests that the output for the getLevelRestrictions method is correct.
     */
    public function testGetLevelRestrictions() {
        $dd = new Dropdowns();
        $levelRestrictions = $dd->getLevelRestrictions();

        $this->assertEquals(
                6,
                count($levelRestrictions)
        );
    }

    /**
     * Tests that the output for the getProgramRestrictions method is correct.
     */
    public function testGetProgramRestrictions() {
        $dd = new Dropdowns();
        $programRestrictions = $dd->getProgramRestrictions();

        $this->assertEquals(
                1169,
                count($programRestrictions)
        );
    }

    /**
     * Tests that the output for the getCollegeRestrictions method is correct.
     */
    public function testGetCollegeRestrictions() {
        $dd = new Dropdowns();
        $collegeRestrictions = $dd->getCollegeRestrictions();

        $this->assertEquals(
                9,
                count($collegeRestrictions)
        );
    }

    /**
     * Tests that the output for the getSpecialApprovals method is correct.
     */
    public function testGetSpecialApprovals() {
        $dd = new Dropdowns();
        $specialApprovals = $dd->getSpecialApprovals();

        $this->assertEquals(
                4,
                count($specialApprovals)
        );
    }

    /**
     * Tests that the output for the getScheduleTypes method is correct.
     */
    public function testScheduleTypes() {
        $dd = new Dropdowns();
        $scheduleTypes = $dd->getScheduleTypes();

        $this->assertEquals(
                8,
                count($scheduleTypes)
        );
    }

    public function testGetInstructors() {
        $dd = new Dropdowns();
        $instructors = $dd->getInstructors();

        $this->assertEquals(
                7067,
                count($instructors)
        );
    }
}
