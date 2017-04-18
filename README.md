# Semester Course Offerings—Office of the Registrar

## The Problem

The Office of the Registrar is responsible for all matters related to Northeastern scheduling. This project seeks to alleviate the amount of manual data entry undertaken by the Registrar each semester when trying to establish course offerings for each department.

The current system is this: each semester, the Registrar sends out a spreadsheet to each department in the university, containing a list of all classes that were offered the semester one year before. Each department has users who manually edit the spreadsheet to make changes to the classes for this year, as well as add new classes that may not have been included the year before.

After making edits, the spreadsheet is submitted to the Registrar for review. If it is not satisfactory, it is rejected and a dialog occurs. Edits are made and submitted until everything works.

Then, the registrar takes the spreadsheet and MANUALLY enters everything from the spreadsheet into the database.

Our project drastically reduces the amount of manual editing and general oversight this process requires.

## Host Environment

The intention of the project was to make a viable standalone product, and then begin the transfer process, involving Northeastern's ITS, to move it onto the MyNEU system. This will require coordination and an extensively documented codebase.

## Code Organization

The project is hosted on an Amazon Web Services EC2 instance using LAMP (Linux, Apache, MySQL, PHP) architecture. See the lib/ folder.

The front-end is written in Angular1, and makes direct calls to the PHP.

## Testing


