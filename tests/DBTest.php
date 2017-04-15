<?php

use PHPUnit\Framework\TestCase;
include 'lib/DB.php';

class DBTest extends TestCase {
    public function testInstance() {
        $db = new DB();

        $this->assertInstanceOf(
                DB::class,
                $db
        );
    }

    /**
     * Tests that the config file exists and is readable.
     */
    public function testConfigFileExists() {
        $configFilePath = 'config/config.ini';

        $this->assertFileExists($configFilePath);
        $this->assertFileIsReadable($configFilePath);
    }

    public function testQuery1() {
        $db = new DB();
        $queryStr = "SELECT * FROM gtvinsm";
        $results = $db->query($queryStr);

        $this->assertCount(
                11,
                $results
        );

        $this->assertArrayHasKey(
                '0',
                $results
        );

        $this->assertEquals(
                'Traditional',
                $results[1]['GTVINSM_DESC']
        );
    }

    public function testQuery2() {
        $db = new DB();
        $queryStr = "SELECT `STVCAMP_CODE` FROM stvcamp WHERE `STVCAMP_CODE` = 'BOS'";
        $results = $db->query($queryStr);

        $this->assertCount(
                1,
                $results
        );

        $this->assertArrayHasKey(
                'STVCAMP_CODE',
                $results
        );

        $this->assertEquals(
                'BOS',
                $results['STVCAMP_CODE']
        );

        $this->assertEquals(
                '{"STVCAMP_CODE":"BOS"}',
                json_encode($results)
        );
    }

    public function testEmptyQuery() {
        $db = new DB();
        $queryStr = "SELECT * FROM gtvinsm WHERE 0 = 1";
        $results = $db->query($queryStr);
        $resultsArray = $results->fetch_array(MYSQLI_ASSOC);

        $this->assertInstanceOf(
                mysqli_result::class,
                $results
        );

        $this->assertEquals(
                0,
                $resultsArray['num_rows']
        );
    }
}
