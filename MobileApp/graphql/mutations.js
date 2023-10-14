export const createTimetable = `mutation CreateTimetable(
  $input: CreateTimetableInput!
  $condition: ModelTimetableConditionInput
) {
  createTimetable(input: $input, condition: $condition) {
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
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      owner
      __typename
    }
  }
}`;

export const updateTimetable = `mutation UpdateTimetable(
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
    }
  }
}`;

export const createStudent = `mutation CreateStudent(
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
}`;

export const createEnrollment = `mutation CreateEnrollment(
  $input: CreateEnrollmentInput!
  $condition: ModelEnrollmentConditionInput
) {
  createEnrollment(input: $input, condition: $condition) {
    id
    studentId
    courseId
    owner
  }
}
`;
export const deleteEnrollment = `mutation DeleteEnrollment(
  $input: DeleteEnrollmentInput!
  $condition: ModelEnrollmentConditionInput
) {
  deleteEnrollment(input: $input, condition: $condition) {
    id
    studentId
    courseId
  }
}`;

export const createTimetable = /* GraphQL */ `
  mutation CreateTimetable(
    $input: CreateTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    createTimetable(input: $input, condition: $condition) {
      id
      studentId
      activityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const updateTimetable = /* GraphQL */ `
  mutation UpdateTimetable(
    $input: UpdateTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    updateTimetable(input: $input, condition: $condition) {
      id
      studentId
      activityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;

export const createNotificationPreferance = /* GraphQL */ `
  mutation CreateNotificationPreferance(
    $input: CreateNotificationPreferanceInput!
    $condition: ModelNotificationPreferanceConditionInput
  ) {
    createNotificationPreferance(input: $input, condition: $condition) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateNotificationPreferance = /* GraphQL */ `
  mutation UpdateNotificationPreferance(
    $input: UpdateNotificationPreferanceInput!
    $condition: ModelNotificationPreferanceConditionInput
  ) {
    updateNotificationPreferance(input: $input, condition: $condition) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
        __typename
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
