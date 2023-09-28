/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onCreateStudent(filter: $filter, owner: $owner) {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      preference {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      }
      enrollments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      owner
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onUpdateStudent(filter: $filter, owner: $owner) {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      preference {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      }
      enrollments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      owner
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onDeleteStudent(filter: $filter, owner: $owner) {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      preference {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      }
      enrollments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      owner
    }
  }
`;
export const onCreateTimetable = /* GraphQL */ `
  subscription OnCreateTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onCreateTimetable(filter: $filter, owner: $owner) {
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
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateTimetable = /* GraphQL */ `
  subscription OnUpdateTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onUpdateTimetable(filter: $filter, owner: $owner) {
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
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteTimetable = /* GraphQL */ `
  subscription OnDeleteTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onDeleteTimetable(filter: $filter, owner: $owner) {
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
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onCreateActivity(filter: $filter, owner: $owner) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      coordinates
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onUpdateActivity(filter: $filter, owner: $owner) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      coordinates
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onDeleteActivity(filter: $filter, owner: $owner) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      coordinates
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateInstitution = /* GraphQL */ `
  subscription OnCreateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onCreateInstitution(filter: $filter, owner: $owner) {
      id
      name
      location
      pageUrl
      campusMapUrl
      openingTime
      closingTime
      minimumDuration
      lectureremails
      coursecodes
      logo
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      adminId
      owner
      courses {
        nextToken
        startedAt
      }
      students {
        nextToken
        startedAt
      }
      lecturer {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateInstitution = /* GraphQL */ `
  subscription OnUpdateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onUpdateInstitution(filter: $filter, owner: $owner) {
      id
      name
      location
      pageUrl
      campusMapUrl
      openingTime
      closingTime
      minimumDuration
      lectureremails
      coursecodes
      logo
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      adminId
      owner
      courses {
        nextToken
        startedAt
      }
      students {
        nextToken
        startedAt
      }
      lecturer {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteInstitution = /* GraphQL */ `
  subscription OnDeleteInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onDeleteInstitution(filter: $filter, owner: $owner) {
      id
      name
      location
      pageUrl
      campusMapUrl
      openingTime
      closingTime
      minimumDuration
      lectureremails
      coursecodes
      logo
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      adminId
      owner
      courses {
        nextToken
        startedAt
      }
      students {
        nextToken
        startedAt
      }
      lecturer {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onCreateAdmin(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      owner
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onUpdateAdmin(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      owner
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onDeleteAdmin(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      owner
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateLecturer = /* GraphQL */ `
  subscription OnCreateLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onCreateLecturer(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      courses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateLecturer = /* GraphQL */ `
  subscription OnUpdateLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onUpdateLecturer(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      courses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteLecturer = /* GraphQL */ `
  subscription OnDeleteLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onDeleteLecturer(filter: $filter, owner: $owner) {
      id
      institutionId
      firstname
      lastname
      userRole
      email
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      courses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateEnrollment = /* GraphQL */ `
  subscription OnCreateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onCreateEnrollment(filter: $filter, owner: $owner) {
      id
      studentId
      courseId
      year
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
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateEnrollment = /* GraphQL */ `
  subscription OnUpdateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onUpdateEnrollment(filter: $filter, owner: $owner) {
      id
      studentId
      courseId
      year
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
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteEnrollment = /* GraphQL */ `
  subscription OnDeleteEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onDeleteEnrollment(filter: $filter, owner: $owner) {
      id
      studentId
      courseId
      year
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
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onCreateCourse(filter: $filter, owner: $owner) {
      id
      institutionId
      lecturerId
      coursecode
      coursename
      semester
      enrollments {
        nextToken
        startedAt
      }
      activity {
        nextToken
        startedAt
      }
      announcents {
        nextToken
        startedAt
      }
      lecturer {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      notification {
        courseid
        status
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onUpdateCourse(filter: $filter, owner: $owner) {
      id
      institutionId
      lecturerId
      coursecode
      coursename
      semester
      enrollments {
        nextToken
        startedAt
      }
      activity {
        nextToken
        startedAt
      }
      announcents {
        nextToken
        startedAt
      }
      lecturer {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      notification {
        courseid
        status
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onDeleteCourse(filter: $filter, owner: $owner) {
      id
      institutionId
      lecturerId
      coursecode
      coursename
      semester
      enrollments {
        nextToken
        startedAt
      }
      activity {
        nextToken
        startedAt
      }
      announcents {
        nextToken
        startedAt
      }
      lecturer {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      institution {
        id
        name
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      notification {
        courseid
        status
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateAnnouncement = /* GraphQL */ `
  subscription OnCreateAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onCreateAnnouncement(filter: $filter, lecturerId: $lecturerId) {
      id
      courseId
      lecturerId
      description
      start
      end
      date
      venue
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      body
      title
      type
      year
      createdAt
      announcementStatus {
        SMS
        PUSH
        EMAIL
        info
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAnnouncement = /* GraphQL */ `
  subscription OnUpdateAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onUpdateAnnouncement(filter: $filter, lecturerId: $lecturerId) {
      id
      courseId
      lecturerId
      description
      start
      end
      date
      venue
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      body
      title
      type
      year
      createdAt
      announcementStatus {
        SMS
        PUSH
        EMAIL
        info
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAnnouncement = /* GraphQL */ `
  subscription OnDeleteAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onDeleteAnnouncement(filter: $filter, lecturerId: $lecturerId) {
      id
      courseId
      lecturerId
      description
      start
      end
      date
      venue
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      body
      title
      type
      year
      createdAt
      announcementStatus {
        SMS
        PUSH
        EMAIL
        info
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateNotificationPreferance = /* GraphQL */ `
  subscription OnCreateNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $studentId: String
  ) {
    onCreateNotificationPreferance(filter: $filter, studentId: $studentId) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateNotificationPreferance = /* GraphQL */ `
  subscription OnUpdateNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $studentId: String
  ) {
    onUpdateNotificationPreferance(filter: $filter, studentId: $studentId) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteNotificationPreferance = /* GraphQL */ `
  subscription OnDeleteNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $studentId: String
  ) {
    onDeleteNotificationPreferance(filter: $filter, studentId: $studentId) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
