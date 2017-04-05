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

        public function testGetHost() {
            $db = new RegistrarDatabase();

            $this->assertEquals(
                'localhost',
                $db->getHost()
            );
        }

        public function testGetDatabaseName() {
            $db = new RegistrarDatabase();

            $this->assertEquals(
                'test_neu_registrar',
                $db->getDatabaseName()
            );
        }

        public function testUpdateHost() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateHost');
            $method->invokeArgs($db, array('$newHost'=>'127.0.0.1'));

            $this->assertEquals(
                '127.0.0.1',
                $db->getHost()
            );
        }

        public function testUpdateDatabaseName() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateDatabaseName');
            $method->invokeArgs($db, array('$newDB'=>'test_db'));

            $this->assertEquals(
                'test_db',
                $db->getDatabaseName()
            );
        }

        public function testEmptyStringUpdateHost() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateHost');

            $this->expectException(InvalidArgumentException::class);
            $method->invokeArgs($db, array('$newHost'=>''));
        }

        public function testEmptyStringUpdateDatabaseName() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('updateDatabaseName');

            $this->expectException(InvalidArgumentException::class);
            $method->invokeArgs($db, array('$newDB'=>''));
        }

        /**
         * Tests that the databaseConnect method throws an exception on a bad connection.
         */
        public function testBadConnection() {
            $db = new RegistrarDatabase();
            $method = self::getMethod('databaseConnect');

            $this->expectException(mysqli_sql_exception::class);
            $method->invokeArgs($db, array('$host'=>'localhost', '$username'=>'root', '$password'=>'invalid', '$db_name'=>'test_neu_registrar'));
        }

        /**
         * Tests that the output for the selectAllQuery method is correct.
         */
        public function testOutputSelectAllQuery() {
            $db = new RegistrarDatabase();
            $sp = 'select_gtvinsm';
            $results = $db->selectAllQuery($sp);
            $jsonResults = json_encode($results);

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
        }

        /**
         * Tests that the selectAllQuery method throws an exception on an invalid query.
         */
        public function testInvalidProcedure() {
            $db = new RegistrarDatabase();
            $sp = 'invalid_procedure';

            $this->expectException(InvalidArgumentException::class);
            $results = $db->selectAllQuery($sp);
        }

        /**
         * Tests that the selectAllQuery method throws an exception on an empty input.
         */
        public function testEmptyStringSelectAll() {
            $db = new RegistrarDatabase();

            $this->expectException(InvalidArgumentException::class);
            $results = $db->selectAllQuery('');
        }

        /**
         * Tests that the output for the checkValidStoredProcedure method is correct.
         */
        public function testOutputCheckValidStoredProcedure() {
            $db = new RegistrarDatabase();
            $sp1 = 'select_ssbsect';
            $sp2 = 'invalid_procedure';
            $result1 = $db->checkValidStoredProcedure($sp1);
            $result2 = $db->checkValidStoredProcedure($sp2);

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
         * Tests that the checkValidStoredProcedure method throws an exception on an empty input.
         */
        public function testEmptyStringCheckValidStoredProcedure() {
            $db = new RegistrarDatabase();

            $this->expectException(InvalidArgumentException::class);
            $results = $db->checkValidStoredProcedure('');
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

//        public function testBadQueryCheckValidStoredProcedure() {
//            $db = new RegistrarDatabase();
//            $sp = 'select_gtvinsm';
//
//            $this->expectException(mysqli_sql_exception::class);
//            $method = self::getMethod('updateHost');
//            $method->invokeArgs($db, array('$newHost'=>'invalid_host'));
//            $db->checkValidStoredProcedure($sp);
//        }
    }
?>
