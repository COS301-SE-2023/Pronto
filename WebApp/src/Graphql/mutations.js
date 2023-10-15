/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateInstitution = /* GraphQL */ `
  mutation UpdateInstitution(
    $input: UpdateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    updateInstitution(input: $input, condition: $condition) {
      id
      name
      lectureremails
      logo
      domains
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      _version
      _deleted
      _lastChangedAt
      __typename
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
      email
      institution {
        id
        name
        lectureremails
        logo
        domains
        adminId
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
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      _version
      _deleted
      _lastChangedAt
      __typename
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
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      email
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      _version
      _deleted
      _lastChangedAt
      __typename
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
      coordinates
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
      coordinates
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
export const createAnnouncement = /* GraphQL */ `
  mutation CreateAnnouncement(
    $input: CreateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    createAnnouncement(input: $input, condition: $condition) {
      id
      courseId
      lecturerId
      date
      venue
      body
      title
      type
      year
      _version
      _deleted
      _lastChangedAt
      __typename
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const updateAdminApplication = /* GraphQL */ `
  mutation UpdateAdminApplication(
    $input: UpdateAdminApplicationInput!
    $condition: ModelAdminApplicationConditionInput
  ) {
    updateAdminApplication(input: $input, condition: $condition) {
      applicationInfo {
        admin {
          email
          id
          institutionId
          name
        }
        status
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
export const deleteAdminApplication = /* GraphQL */ `
  mutation DeleteAdminApplication(
    $input: DeleteAdminApplicationInput!
    $condition: ModelAdminApplicationConditionInput
  ) {
    deleteAdminApplication(input: $input, condition: $condition) {
      id
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createInstitution = /* GraphQL */ `
  mutation CreateInstitution(
    $input: CreateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    createInstitution(input: $input, condition: $condition) {
      id
      name
      lectureremails
      logo
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      adminId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createAdminApplication = /* GraphQL */ `
  mutation CreateAdminApplication(
    $input: CreateAdminApplicationInput!
    $condition: ModelAdminApplicationConditionInput
  ) {
    createAdminApplication(input: $input, condition: $condition) {
      id
      name
      firstname
      email
      applicationInfo {
        status
      }
    }
  }
`;
