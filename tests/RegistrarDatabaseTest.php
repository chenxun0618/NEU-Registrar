<?php
    use PHPUnit\Framework\TestCase;

    class RegistrarDatabaseTest extends TestCase {
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
         * Tests that the checkValidStoredProcedure method throws an exception on an empty input.
         */
        public function testEmptyStringCheckValidProcedure() {
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
    }
?>
