export const createTimetable=`mutation CreateTimetable(
  $input: CreateTimetableInput!
  $condition: ModelTimetableConditionInput
) {
  createTimetable(input: $input, condition: $condition) {
    id
    studentId
    activityId
    student {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      createdAt
      updatedAt
      studentTimetableId
      owner
    }
    activities {
      nextToken
      startedAt
    }
    createdAt
    updatedAt
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
    student {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      createdAt
      updatedAt
      studentTimetableId
      owner
    }
    activities {
      nextToken
      startedAt
    }
    createdAt
    updatedAt
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
      nextToken
    }
    createdAt
    updatedAt
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
    student {
      institutionId
      id
    }
    course {
      id
      coursecode
    }
  }
}
`