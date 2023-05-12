# Component name
## @pronto/Transform-Schedule-To-Standard-Schema

# Overview
This a proposed design for a component that will enables us to parse and standardize the main schedule uploaded by institutions of all the possible classes and test/exam schedules, which is usually approved or provided by institutions per semester or calender year.

# Architecture
The proposed architecture.

![The proposed architecture](transformToScheduleSchemaOnUpload.png 'achitecture')

# Sub-Components
#### 1. AWS S3
- This is the main blob storage onto which yearly/semester university schedules are uploaded onto by the university admin using the website.
Possible file formats:
##### 1. An excel sheet file(s)
`scheduleId.xlsx`
##### 2. A Comma seperated file(s)
`scheduleId.cvs`

- upload of a new or updated file, an S3 Event notication will be sent, which will trigger a data read form the S3 bucket to AWS glue

### 2. AWS Glue
- This will use preset rules to transform the schedule files which may have varying attribute names
- The attributes will be grouped to match a unified schema designed by our database engineer. eg, this could be, for an example, the following possible format:

|module code| time interval | venue | group |
| ----------| ---------------| ------| ------|
| COS301 | 11:30 - 12: 20 | Thuto 1-1 | 1 |

- AWS glue will transform and categorize the `scheduleId.[cvs, xlsx]` to match the above schema
- Then load the newly transformed schedule to our dynamoDB

### 3. DynamoDb
- This will the main dynamoDB document that will be queried when creating a schedule for a student, for identifying and detecting possible clashes and so forth
- The files will be stored as `JSON` objects to enable the above
- This can be decoupled as part of this component only `@pronto/Transform-Schedule-To-Standard-Schema`
- Or be used directly by the entire system too

# Stack
### 1. Programming Languages:
- This will potentially be written and deployed using `Javascript`, or `python`
### 2. Tools
- It will be managed and deployed using an AWS CDK
- `DynamoDB` and `S3`  can be deployed and mantained using this component in isolation
- Or be added on externally depending on whether or not they will be managed using AWS Amplify, thus only requiringd to be just linked to `AWS Glue`.

# Error Handling and Logging
### AWS S3 read/write failure
- built in S3 read/write retry mechanism will be utilized
- failure logged
- if retries fail, `university admin will be notifed of the failure and asked to retry`
- error information will be logged using `AWS CloudWatch` if retries fail
### AWS Glue Extract, Transform and load  failure
- depending on the error, course information will have to entered manually by the `univeristy admin` or the `univeristy admin` will be asked to modify the file to fix errors.
- error information will be logged using `AWS CloudWatch`
### DynamoDB Failure
- `AWS Glue` can be used to load the transformed schedule on an isolated DynamoDB instance for persistant storage, and the main dynamoDB that will be queried
- Thus creating redudancy and providing a `failsafe mechanism `incase of write failure on either DB instances
- The schedules could also be written back on to the `S3 bucket` for persistant storage, which will differ from the original since it can be `seperate json `objects of `each module`, already transformed, or `one transformed blob.`

# Proposed development start day
- can be started `immidiately` or after `manual upload of module information has been developed`, and `testing is complete or in progress`

# Engineer
|name| email | Role|
| --| -- | -- |
|BP Masilela| BP.Dev@icloud.com | Tech Lead |