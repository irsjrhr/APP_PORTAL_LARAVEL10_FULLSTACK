<?php

namespace Tests\Unit;

use App\Models\Base_model;
use Tests\TestCase;

class BaseModelTest extends TestCase
{
    /** @var Base_model */
    protected $baseModel;

    protected function setUp(): void
    {
        parent::setUp(); // Load Laravel Application context cause Base_model invokes helpers like asset() 
        $this->baseModel = new Base_model();
    }

    /**
     * Test mechanism random_persen() function logic.
     * Ensure result never exceeds limit 100.
     *
     * @return void
     */
    public function test_random_persen_never_exceeds_100()
    {
        // Add a high value to force trigger the capping/logic boundary
        $result = $this->baseModel->random_persen(60);
        
        $this->assertLessThanOrEqual(100, $result);
        
        // Let's do it 100 times to be sure 
        for ($i = 0; $i < 100; $i++) {
            $this->assertLessThanOrEqual(100, $this->baseModel->random_persen(rand(10, 50)));
        }
    }

    /**
     * Test waktu() returns current expected date string.
     *
     * @return void
     */
    public function test_waktu_returns_current_date()
    {
        $expectedDate = date('Y-m-d');
        $this->assertEquals($expectedDate, $this->baseModel->waktu());
    }

    /**
     * Test status() returns matching string.
     *
     * @return void
     */
    public function test_status_returns_active()
    {
        $this->assertEquals('ACTIVE', $this->baseModel->status());
    }
}
