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
     "old": { ~a copy of the initially-loaded properties of this class~ }
     "comment":"We want to overhaul this course, please approve it! Thanks!"
 }
```

### Dropdowns

getDropdownValues() returns data that looks like this:

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

getAllInstructors() returns data that looks like this:

```
[{name: “FirstName LastName”, nuid: “000000000”}, {name: “FirstName2 LastName2”, nuid: “000000001”}, …]
```

### Subject Codes

getAllSubjectCodesInDept() returns data that looks like this:

```
{
   subjectCodes: ["CS", "DS", "IS"]
}
```

## Schedule

A service for handling all class-related operations. A "schedule" object looks like this:

```
{  
   "submitterID":"000000000",
   "lastEditTime":"2017-04-17 20:53:41",
   "scheduleStatus":"R",
   "comment":"Rejection comment here, otherwise empty string",
   "classes":[~ an array of classes, see above for examples ~],
   "lastEditedBy":"FirstName LastName"
}
```

### Schedule Detail

getScheduleDetail(departmentCode, admin) returns data that looks like this, which is subsequently transformed into something that looks like the above schedule:

```
{  
   "submitterID":"000141940",
   "submitterName":"Doreen Hodgkin",
   "lastEditTime":"2017-04-17 22:07:55",
   "scheduleStatus":"R",
   "comment":"Rejection comment here, otherwise empty string",
   "classes":[  
      {  
         "crn":"11451",
         "old":{  // calculated locally after initial load, does not exist on initial load
           ~a copy of the initially-loaded properties of this class~
         },
         "status":"A",
         "publish":"Y",
         "section":1,
         "metadata":{  // calculated locally after initial load, does not exist on initial load
            "deleted":false,
            "modified":true,
            "unique_id":"11451",
            "modifiedInSession":true
         },
         "termCode":"201810",
         "campusCode":"BOS",
         "courseTitle":"CS & Its Applications",
         "subjectCode":"CS",
         "courseNumber":"1100",
         "meetingTimes":[  
            {  
               "days":"M",
               "endTime":"0905",
               "beginTime":"0800"
            }
         ],
         "attributeCode":[  
            "NCAD",
            "NCT1",
            "UBCS"
         ],
         "maxEnrollment":19,
         "priorEnrollment":19,
         "scheduleTypeCode":"LEC",
         "waitlistCapacity":0,
         "classRestrictions":[  

         ],
         "levelRestrictions":[  
            "UG"
         ],
         "majorRestrictions":[  

         ],
         "sessionStateIndex":0,
         "collegeRestrictions":[  
            "CS",
            "EN"
         ],
         "primaryInstructorID":"000000001",
         "programRestrictions":[  

         ],
         "specialApprovalCode":"",
         "primaryInstructorName":"InstructorFirst InstructorLast",
         "includeClassRestriction":1,
         "includeLevelRestriction":1,
         "includeMajorRestriction":1,
         "instructionalMethodCode":"HY",
         "includeCollegeRestriction":0,
         "includeProgramRestriction":1
      }
   ]
}
```

### Save Schedule

saveSchedule(nuid, departmentCode, schedule) is a post request that returns data if and only if the timestamp of the local schedule does not match that in the database. In that case, it returns the database's schedule and a local merge is performed to ensure data is not lost. Otherwise, it returns just the status of the request.

### Submit Schedule

submitSchedule(nuid, departmentCode, schedule) works the same as the above

### Reject Schedule

rejectSchedule(departmentCode, rejectionMessage) is a post request that returns only the status of the request

### Approve Schedule

approveSchedule(departmentCode) works the same as the above

## User

A service for handling all user-related operations. A "user" object looks like this:

```
{  
   "name":"FirstName LastName",
   "email":"f.lastname@northeastern.edu",
   "admin":false,
   "depts":[  
      {  
         "departmentCode":"IS",
         "status":"D"
      },
      {  
         "departmentCode":"IA",
         "status":"A"
      },
      {  
         "departmentCode":"CS",
         "status":"S"
      }
   ],
   "nuid":"000000000",
}
```

The "depts" field contains departments for which this user is responsible, and the status of the associated schedule. "admin" is true if the user is a member of the registrar's team (and can thus approve / reject schedules), and is false otherwise.

### Login

login(email, nuid) returns an object that looks like this, which is subsequently transformed into the above format:

```
{  
   "name":"FirstName LastName",
   "email":"f.lastname@northeastern.edu",
   "NUID":"000000000",
   "isAdmin":"0",
   "dept":[  
      {  
         "CS":"R"
      },
      {  
         "IS":"S"
      },
      {  
         "IA":"A"
      }
   ]
}
```
