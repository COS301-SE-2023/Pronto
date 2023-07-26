/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInstitution = /* GraphQL */ `
  mutation CreateInstitution(
    $input: CreateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    createInstitution(input: $input, condition: $condition) {
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
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        owner
      }
      adminId
      courses {
        nextToken
      }
      students {
        nextToken
      }
      lecturer {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateInstitution = /* GraphQL */ `
  mutation UpdateInstitution(
    $input: UpdateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    updateInstitution(input: $input, condition: $condition) {
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
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        owner
      }
      adminId
      courses {
        nextToken
      }
      students {
        nextToken
      }
      lecturer {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteInstitution = /* GraphQL */ `
  mutation DeleteInstitution(
    $input: DeleteInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    deleteInstitution(input: $input, condition: $condition) {
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
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        owner
      }
      adminId
      courses {
        nextToken
      }
      students {
        nextToken
      }
      lecturer {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAdmin = /* GraphQL */ `
  mutation CreateAdmin(
    $input: CreateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    createAdmin(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAdmin = /* GraphQL */ `
  mutation UpdateAdmin(
    $input: UpdateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    updateAdmin(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAdmin = /* GraphQL */ `
  mutation DeleteAdmin(
    $input: DeleteAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    deleteAdmin(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLecturer = /* GraphQL */ `
  mutation CreateLecturer(
    $input: CreateLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    createLecturer(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      courses {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLecturer = /* GraphQL */ `
  mutation UpdateLecturer(
    $input: UpdateLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    updateLecturer(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      courses {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLecturer = /* GraphQL */ `
  mutation DeleteLecturer(
    $input: DeleteLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    deleteLecturer(input: $input, condition: $condition) {
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      courses {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      timetable {
        id
        studentId
        activityId
        createdAt
        updatedAt
        owner
      }
      enrollments {
        nextToken
      }
      createdAt
      updatedAt
      studentTimetableId
      owner
    }
  }
`;
export const updateStudent = /* GraphQL */ `
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      timetable {
        id
        studentId
        activityId
        createdAt
        updatedAt
        owner
      }
      enrollments {
        nextToken
      }
      createdAt
      updatedAt
      studentTimetableId
      owner
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      timetable {
        id
        studentId
        activityId
        createdAt
        updatedAt
        owner
      }
      enrollments {
        nextToken
      }
      createdAt
      updatedAt
      studentTimetableId
      owner
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
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEnrollment = /* GraphQL */ `
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {
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
        studentTimetableId
        owner
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
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
        studentTimetableId
        owner
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      institutionId
      lecturerId
      coursecode
      semester
      enrollments {
        nextToken
      }
      activity {
        nextToken
      }
      announcents {
        nextToken
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      institutionId
      lecturerId
      coursecode
      semester
      enrollments {
        nextToken
      }
      activity {
        nextToken
      }
      announcents {
        nextToken
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      institutionId
      lecturerId
      coursecode
      semester
      enrollments {
        nextToken
      }
      activity {
        nextToken
      }
      announcents {
        nextToken
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
        domains
        adminId
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTimetable = /* GraphQL */ `
  mutation DeleteTimetable(
    $input: DeleteTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    deleteTimetable(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      group
      frequency
      description
      course {
        id
        institutionId
        lecturerId
        coursecode
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAnnouncement = /* GraphQL */ `
  mutation CreateAnnouncement(
    $input: CreateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    createAnnouncement(input: $input, condition: $condition) {
      id
      courseId
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
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAnnouncement = /* GraphQL */ `
  mutation UpdateAnnouncement(
    $input: UpdateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    updateAnnouncement(input: $input, condition: $condition) {
      id
      courseId
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
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAnnouncement = /* GraphQL */ `
  mutation DeleteAnnouncement(
    $input: DeleteAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    deleteAnnouncement(input: $input, condition: $condition) {
      id
      courseId
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
        semester
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
