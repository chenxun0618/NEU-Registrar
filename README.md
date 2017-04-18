# Semester Course Offerings—Office of the Registrar

## The Problem

The Office of the Registrar is responsible for all matters related to Northeastern scheduling. This project seeks to alleviate the amount of manual data entry undertaken by the Registrar each semester when trying to establish course offerings for each department.

The current system is this: each semester, the Registrar sends out a spreadsheet to each department in the university, containing a list of all classes that were offered the semester one year before. Each department has users who manually edit the spreadsheet to make changes to the classes for this year, as well as add new classes that may not have been included the year before.

After making edits, the spreadsheet is submitted to the Registrar for review. If it is not satisfactory, it is rejected and a dialog occurs. Edits are made and submitted until everything works.

Then, the registrar takes the spreadsheet and MANUALLY enters everything from the spreadsheet into the database.

Our project drastically reduces the amount of manual editing and general oversight this process requires.

## Our Solution

A user logs in with their email and NUID (a database table is maintained by the Registrar, with a list of users and which departments they work for). User is taken to the "Schedule Submission" page, and is presented with a dropdown containing all departments with which they are associated (one user can work across multiple departments). User selects a department and initial data is loaded from last year, just as the spreadsheet is in the original system.

The schedule submission page presents an overview of these classes. A table shows a list of all the classes. Classes whose data has been changed from the previous year are marked yellow; classes that are added anew are marked green; classes marked for removal are marked red. User clicks "Edit" to be taken to the "Class Detail" page, and to make changes to any of the properties of that class as necessary (e.g. instructor, waitlist, meeting time, etc.). User clicks "Add Class" if they want to add a new class to the schedule (this brings them to the "Add Class" page). When the user wants to save their progress, they hit the "save" button, which saves the schedule as a draft. When the user wants to finally submit the schedule for approval, they click the "Submit" button. After this, the schedule can only be viewed, not edited, by the user.

From the perspective of the Registrar (admin), this process looks much the same. They log in in the same way, and are presented with a list of all departments, and the associated status of their submissions, which is one of: Draft (saved but not submitted), Submitted (waiting for the registrar's review), Rejected (rejected by the registrar), Approved (approved by the registrar), or Untouched (meaning not yet saved / loaded by the user).

The Registrar may choose only Submitted schedules for review. They can see which classes have been edited and click on "View" to be taken to the "Class Detail" page. If they like what they see, they click "Approve" to approve the schedule, and after that point, the schedule may no longer be altered (except through manual database backchannels). If they don't like what they see, they click "Reject" to reject the schedule and supply a rejection reason that is displayed to the user when they load the rejected schedule to work on it again.

The semester's process ends when all Submitted schedules have been Approved by the registrar.

## Host Environment

The intention of the project was to make a viable standalone product, and then begin the transfer process, involving Northeastern's ITS, to move it onto the MyNEU system. This will require coordination and an extensively documented codebase.

## Code Organization

The project is hosted on an Amazon Web Services EC2 instance using LAMP (Linux, Apache, MySQL, PHP) architecture. See the lib/ folder.

The front-end is written in Angular1, and makes direct calls to the PHP. See the public/ folder.

## Testing


