/* eslint-disable */
// this is an auto generated file. This will be overwritten


export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
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
      preference {
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
      
      timetable {
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
      enrollments {
        items {
          id
          studentId
          courseId
          
          course {
            id
            institutionId
            coursecode
            activity {
              items{
                id
                acivityname
                day
                start
                end
                venue
                coordinates
                _deleted
                _version
                _lastChangedAt
              }
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      __typename
    }
  }
`;
export const updateStudentInfo = /* GraphQL */ `
  mutation UpdateStudent(
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
      preference {
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
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
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
`;
export const createEnrollment = /* GraphQL */ `
  mutation CreateEnrollment(
    $input: CreateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    createEnrollment(input: $input, condition: $condition) {
      id
      studentId
      courseId
      year
      
      course {
        id
        institutionId
        coursecode
        activity {
          items {
            id
            courseId
            activityname
            day
            start
            end
            venue
            coordinates
            course {
              coursecode
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            owner
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const deleteEnrollment = /* GraphQL */ `
  mutation DeleteEnrollment(
    $input: DeleteEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    deleteEnrollment(input: $input, condition: $condition) {
      id
      studentId
      courseId
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


