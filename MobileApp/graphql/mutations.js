export const createTimetable=`mutation CreateTimetable(
  $input: CreateTimetableInput!
  $condition: ModelTimetableConditionInput
) {
  createTimetable(input: $input, condition: $condition) {
    id
    studentId
    activityId
    activities {
      nextToken
    }
   
  }
}`

export const updateTimetable=`mutation UpdateTimetable(
  $input: UpdateTimetableInput!
  $condition: ModelTimetableConditionInput
) {
  updateTimetable(input: $input, condition: $condition) {
    id
    studentId
    activityId
    activities {
      nextToken
    }
  }
}`

export const createStudent=`mutation CreateStudent(
  $input: CreateStudentInput!
  $condition: ModelStudentConditionInput
) {
  createStudent(input: $input, condition: $condition) {
    institutionId
    id
    firstname
    lastname
    userRole
    email
    timetable {
      id
      studentId
      activityId
    }
    enrollments { 
      items{
        id
        courseId
        course{ 
          id
          coursecode
          activity{
            items{
              courseId
              activityname
              coordinates
              id
              day
              start
              end
              venue 
              course{
                coursecode
              }
            }
          }
        }
      }
    }
    studentTimetableId
  }
}`


export const createEnrollment=`mutation CreateEnrollment(
  $input: CreateEnrollmentInput!
  $condition: ModelEnrollmentConditionInput
) {
  createEnrollment(input: $input, condition: $condition) {
    id
    studentId
    courseId
    id
    courseId
    course{ 
      id
      coursecode
      activity{
        items{
          courseId
          activityname
          coordinates
          id
          day
          start
          end
          venue
          course {
            coursecode
          } 
        }
      }
    }
  }
}
`
export const deleteEnrollment=`mutation DeleteEnrollment(
  $input: DeleteEnrollmentInput!
  $condition: ModelEnrollmentConditionInput
) {
  deleteEnrollment(input: $input, condition: $condition) {
    id
    studentId
    courseId
  }
}`

export const updateStudentInfo=`mutation UpdateStudent(
  $input: UpdateStudentInput!
  $condition: ModelStudentConditionInput
) {
  updateStudent(input: $input, condition: $condition) {
    institutionId
    id
    firstname
    lastname
    userRole
    email
    timetable {
      id
      studentId
      activityId
      createdAt
      updatedAt
    }
    enrollments {
      nextToken
    }
    createdAt
    updatedAt
    studentTimetableId
  }
}`

export const deleteStudent=`mutation DeleteStudent(
  $input: DeleteStudentInput!
  $condition: ModelStudentConditionInput
) {
  deleteStudent(input: $input, condition: $condition) {
    institutionId
    id
    firstname
    lastname
    userRole
    email
    timetable {
      id
      studentId
      activityId
      createdAt
      updatedAt
    }
    enrollments {
      nextToken
    }
    createdAt
    updatedAt
    studentTimetableId
    owner
  }
}`