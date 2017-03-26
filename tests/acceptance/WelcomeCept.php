<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('Test correct root page');
$I->amOnPage('/');
$I->see('Apache2 Ubuntu Default Page');

$A = new AcceptanceTester($scenario);
$A->wantTo('Test correct /public page');
$A->amOnPage('/public/#/schedule-submission');
$A->seeInCurrentUrl('public/#/schedule-submission');
#$A->seeElement('myForm');
$A->see('Schedule');
#$A->seeElement(['css' => 'form'], ['name' => 'myForm']);
?>
