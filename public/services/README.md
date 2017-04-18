# Services

## Class

A service for handling all class-related operations. A "class" object looks like this:

```
 {
     "termCode":"201810",
     "crn":"13074",
     "subjectCode":"IS",
     "courseNumber":"1500",
     "section":1,
     "status":"A",
     "scheduleTypeCode":"LEC",
     "campusCode":"BOS",
     "courseTitle":"Intro to Web Development",
     "maxEnrollment":22,
     "instructionalMethodCode":"TR",
     "priorEnrollment":18,
     "waitlistCapacity":0,
     "specialApprovalCode":"",
     "publish":"Y",
     "meetingTimes":[
         {
         "code":"5D",
         "days":"MW",
         "beginTime":"1635",
         "endTime":"1740"
         },
         {
         "code":"1",
         "days":"MWR",
         "beginTime":"0800",
         "endTime":"0905"
         }
     ],
     "primaryInstructorID":"9-digit NUID",
     "primaryInstructorName":"FirstName LastName",
     "includeMajorRestriction":1,
     "includeClassRestriction":0,
     "includeLevelRestriction":1,
     "includeProgramRestriction":1,
     "includeCollegeRestriction":1,
     "majorRestrictions":[
         "INAS",
         "DBDA"
     ],
     "classRestrictions":[
         "JR",
         "SR"
     ],
     "levelRestrictions":[
         "UG",
         "US"
     ],
     "programRestrictions":[
         "BSIS-INSC",
         "CERTG-CYBS"
     ],
     "collegeRestrictions":[
         "CS",
         "EN"
     ],
     "attributeCode":[
         "GNHN",
         "UBCS"
     ],
     "metadata":{
         "unique_id":"13074",
         "modified":true,
         "added":false,
         "deleted":false,
         "modifiedInSession":true
     },
     "old": ~a copy of the initially-loaded properties of this class~
     "comment":"We want to overhaul this course, please approve it! Thanks!"
 }
```

### Dropdowns

Dropdowns.php returns data that looks like this:

```
{
 attributeCode: [{code: “EDOL”, desc: “COE-Developed online”} …]
 campus: [{code: “BOS”, desc: “Boston”} …]
 classRestrictions: [{code: “GR”, desc: “Graduate”} …]
 collegeRestrictions: [{code: “AM”, desc: “Coll of Arts, Media & Design”}, …]
 instructionalMethod: [{code: “USFL”, desc: “NU Faculty-led in USA”}, …]
 levelRestrictions: [{code: “GP”, desc: “CPS - Graduate”}, …]
 majorRestrictions: [{code: “GIDM”, desc: “Graphic and Info. Design/Math”}, …]
 meetingTimes: [{beginTime: “0800”, code: “C2”, days: “F”, endTime: “0940”}, …]
 programRestrictions: [{code: “BA-CMST”, desc: “BA Communication Studies”}, …]
 scheduleTypes: [{code: “LEC”, desc: “Lecture”}, …]
 specialApprovals: [{code: “A”, desc: “Advisor’s Signature}, …]
}
```

### Instructors

getInstructors.php returns data that looks like this:

```
[{name: “FirstName LastName”, nuid: “000000000”}, {name: “FirstName2 LastName2”, quid: “000000001”}, …]
```
