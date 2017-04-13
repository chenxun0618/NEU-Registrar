<?php
    use PHPUnit\Framework\TestCase;

    class RegistrarDatabaseTest extends TestCase {
        /**
         * Temporarily sets the given private method to be accessible for tests.
         *
         * @param $methodName       the private method to be set accessible
         * @return ReflectionMethod     the accessible method
         */
        protected static function getMethod($methodName) {
            $reflection = new ReflectionClass('RegistrarDatabase');
            $method = $reflection->getMethod($methodName);
            $method->setAccessible(True);

            return $method;
        }

        /**
         * Tests that the RegistrarDatabase instance is of the valid class.
         */
        public function testInstance() {
            $db = new RegistrarDatabase();

            $this->assertInstanceOf(
                RegistrarDatabase::class,
                $db
            );
        }

        /**
         * Tests that the output for the getHost method is correct.
         */
        public function testGetHost() {
            $db = new RegistrarDatabase();

            $this->assertEquals(
                'localhost',
                $db->getHost()
            );
        }

        /**
         * Tests that the output for the getDatabaseName method is correct.
         */
        public function testGetDatabaseName() {
            $db = new RegistrarDatabase();

            $this->assertEquals(
                'test_neu_registrar',
                $db->getDatabaseName()
            );
        }

        /**
         * Tests that the updateHost method changes the hostname for the class.
         */
        public function testUpdateHost() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateHost');
            $method->invokeArgs($db, array('$newHost'=>'127.0.0.1'));

            $this->assertEquals(
                '127.0.0.1',
                $db->getHost()
            );
        }

        /**
         * Tests that the updateDatabaseName method changes the database name for the class.
         */
        public function testUpdateDatabaseName() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateDatabaseName');
            $method->invokeArgs($db, array('$newDB'=>'test_db'));

            $this->assertEquals(
                'test_db',
                $db->getDatabaseName()
            );
        }

        /**
         * Tests that the updateHost method throws an IllegalArgumentException when an empty string is given as input.
         */
        public function testEmptyStringUpdateHost() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateHost');

            $this->expectException(InvalidArgumentException::class);
            $method->invokeArgs($db, array('$newHost'=>''));
        }

        /**
         * Tests that the updateDatabaseName method throws an IllegalArgumentException when an empty string is given as
         * input.
         */
        public function testEmptyStringUpdateDatabaseName() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateDatabaseName');

            $this->expectException(InvalidArgumentException::class);
            $method->invokeArgs($db, array('$newDB'=>''));
        }

        /**
         * Tests that the output for the selectAllQuery method is correct.
         */
        public function testOutputSelectAllQuery() {
            $db = new RegistrarDatabase();
            $sp = 'select_gtvinsm';
            $results = $db->selectAllQuery($sp);

            $this->assertInternalType(
                'array',
                $results
            );

            $this->assertEquals(
                11,
                count($results)
            );

            $this->assertEquals(
                'USFL',
                $results[0]['code']
            );

            $this->assertEquals(
                782,
                count($db->selectAllQuery('select_ssbsect'))
            );
        }

        /**
         * Tests that the selectAllQuery method throws an IllegalArgumentException when an invalid procedure is given
         * as input.
         */
        public function testInvalidProcedure() {
            $db = new RegistrarDatabase();
            $sp = 'invalid_procedure';

            $this->expectException(InvalidArgumentException::class);
            $results = $db->selectAllQuery($sp);
        }

        /**
         * Tests that the selectAllQuery method throws an IllegalArgumentException when an empty string is given as
         * input.
         */
        public function testEmptyStringSelectAll() {
            $db = new RegistrarDatabase();

            $this->expectException(InvalidArgumentException::class);
            $results = $db->selectAllQuery('');
        }

        /**
         * Tests that the output for the getCourseCatalog method is correct.
         */
        public function testGetCourseCatalog() {
            $db = new RegistrarDatabase();
            $subjectCode = 'CINE';
            $courseNumber = '2161';
            $title = $db->getCourseCatalog($subjectCode, $courseNumber)[0]['title'];
            $departmentCode = $db->getCourseCatalog($subjectCode, $courseNumber)[0]['departmentCode'];

            $this->assertEquals(
                'Video Software Tools',
                $title
            );

            $this->assertEquals(
                'COMM',
                $departmentCode
            );
        }

        /**
         * Tests that the getCourseCatalog method throws an IllegalArgumentException when an empty string is given for
         * the subject code.
         */
        public function testEmptyStringSubjectCodeGetCourseCatalog() {
            $db = new RegistrarDatabase();
            $subjectCode = '';
            $courseNumber = '2161';

            $this->expectException(InvalidArgumentException::class);
            $db->getCourseCatalog($subjectCode, $courseNumber);
        }

        /**
         * Tests that the getCourseCatalog method throws an IllegalArgumentException when an empty string is given for
         * the course number.
         */
        public function testEmptyStringCourseNumberGetCourseCatalog() {
            $db = new RegistrarDatabase();
            $subjectCode = 'CINE';
            $courseNumber = '';

            $this->expectException(InvalidArgumentException::class);
            $db->getCourseCatalog($subjectCode, $courseNumber);
        }

        /**
         * Tests that the output for the checkValidStoredProcedure method is correct.
         */
        public function testOutputCheckValidStoredProcedure() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('databaseConnect');
            $conn = $method->invokeArgs($db, array());
            $sp1 = 'select_ssbsect';
            $sp2 = 'invalid_procedure';
            $result1 = $db->checkValidStoredProcedure($conn, $sp1);
            $result2 = $db->checkValidStoredProcedure($conn, $sp2);

            $this->assertEquals(
                True,
                $result1
            );

            $this->assertEquals(
                False,
                $result2
            );
        }

        /**
         * Tests that the checkValidStoredProcedure method throws an IllegalArgumentException when an empty string is
         * given as input.
         */
        public function testEmptyStringCheckValidStoredProcedure() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('databaseConnect');
            $conn = $method->invokeArgs($db, array());

            $this->expectException(InvalidArgumentException::class);
            $results = $db->checkValidStoredProcedure($conn, '');
        }

        /**
         * Tests that the inputs to the methods are of the valid type.
         */
        public function testValidInputTypes() {
            $db = new RegistrarDatabase();
            $sp = 'select_gtvinsm';
            $db->selectAllQuery($sp);

            $this->assertInternalType(
                'string',
                $sp
            );
        }
    }
?>
