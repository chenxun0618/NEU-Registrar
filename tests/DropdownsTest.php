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

        public function testGetCampuses() {
            $dd = new Dropdowns();
            $campuses = $dd->getCampuses();

            $this->assertEquals(
                4,
                count($campuses)
            );
        }

        public function testGetBillingAttributes() {
            $dd = new Dropdowns();
            $billingAttributes = $dd->getBillingAttributes();

            $this->assertEquals(
                66,
                count($billingAttributes)
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
    }
?>
