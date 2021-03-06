# Description
This directory holds all the back-end code. It includes the PHP files that the front-end will call to retrieve data from the database.

# Files
## DB.php
a class for representing the database and includes methods to retrieve data

## Dropdowns.php
returns data to populate the dropdown menus on the front-end

## RegistrarDatabase.php
a class for representing the database and includes methods to retrieve data

## adminGetSched.php
takes in a 'dept' and returns the schedule for that department

## adminUpdateSchedule.php
takes in an 'action'('A' for approval, 'R' for rejection), a 'dept' and an optional 'comment', it updates the status of the schedule in sched_submit and the data in ssbsect, ssrrattr, ssrmeet, ssrrmaj, ssrrcls, ssrrcol, ssrrlvl, ssrrprg with the submitted schedule

## courseCatalogLookup.php
retrieves data from course catalog given Subject Code and Course Number

## getAdminInfo.php
takes in an 'NUID' of an admin user, returns the admin's information and an array of all department codes with statuses

## getAllSubjectCodesInDept.php
given a department code, returns all subject codes housed in that department

## getScheduleByDept.php
takes in a 'dept' and returns the most recent schedule for that department, if no schedule is saved or submitted for that department, the old schedule will be returned

## getUserInfo.php
takes in an 'NUID' of a non-admin user, retruns the user's inforamtion and an array of department codes that the user is responsible for with statuses

## login.php
takes in an 'email' and an 'NUID', on success, it has the same behavior as getUserInfo.php or getAdminInfo.php based on the user's credential; on failure, an error will be signified

## userUpdateSchedule.php
takes in an 'NUID', a 'dept', a 'timestamp', an 'action'('D' for draft, 'S' for submit) and an array of classes, if it's a new submission or the timestamp is the same timestamp as the one in the sched_submit talbe, it will perform the action on the classes, and saves the submitter's information, if the timestamp doesn't match the one in sched_submit, it will signify an error
