# Views

This folder contains all code for the front end.

The organization follows Angular conventions. A controller object is associated with an HTML snippet that gets inserted into the dom when the corresponding URL in config.js (in NEU-Registrar/public) is requested.

The controller contains functions that the HTML Angular directives use to whatever effect.

## Class

### Class Add Page

Page for adding a new class to a schedule. Dropdown on page load contains all subject codes that are contained in the department to which the current schedule is associated.

User enters a course number, and, if that course exists, data on it is pulled from the course catalog to autopopulate the class data.

Then the user fills out the rest of the data and saves, inserting that class into the schedule.

This page is only viewable by non-admins.

### Class Detail Page

Contains a given class's data (determined by unique ID in URL: CRN for non-added class and combination of Year, Subject, Course Number, and Section for added classes). (See the Services folder for Class object information.)

From a non-admin perspective, this page is where edits to a class are performed using the dropdowns. If a property of the class is modified, the original data from last year shows up in grayed-out italics next to the property, and the property is highlighted in yellow.

From the admin perspective, the properties are not editable, but are still highlighted yellow / show old data if they were changed from last year.

For a non-admin, this page looks like the admin version if they are viewing a submitted or approved schedule.

## Schedule

### Schedule Submission Page

The main page of the app. Contains the schedule data. (See the Services folder for Schedule object information.) Shows a list of all the classes, highlighted yellow if they have been edited, green if they have been newly added, or red if they are marked for deletion. A status box at the top of the schedule shows data on how recently the schedule has been edited (saved, submitted, rejected, or approved).

## User

### Login

The login page. Loads the user data. (See the Services folder for User object information.)
