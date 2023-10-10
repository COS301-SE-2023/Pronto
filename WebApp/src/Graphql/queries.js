/* eslint-disable */
// this is an auto generated file. This will be overwritten
export const getInstitution = /* GraphQL */ `
  query GetInstitution($id: ID!) {
    getInstitution(id: $id) {
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
export const listInstitutions = /* GraphQL */ `
  query ListInstitutions(
    $filter: ModelInstitutionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstitutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
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
  }
`;

export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const listLecturers = /* GraphQL */ `
  query ListLecturers(
    $filter: ModelLecturerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLecturers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        institutionId
        firstname
        lastname
        email
        institution {
          id
          name
          logo
          adminId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        courses {
          items {
            id
            coursecode
            lecturerId
            activity {
              items{
                id
                activityname
                day
                start
                end
                venue 
                coordinates
                _version
                _deleted
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
      nextToken
      startedAt
      __typename
    }
  }
`;

export const lecturersByInstitutionId = /* GraphQL */ `
  query LecturersByInstitutionId(
    $institutionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLecturerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lecturersByInstitutionId(
      institutionId: $institutionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        institutionId
        firstname
        lastname
        email
        courses {
          items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const coursesByInstitutionId = /* GraphQL */ `
  query CoursesByInstitutionId(
    $institutionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesByInstitutionId(
      institutionId: $institutionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;


export const announcementsByDate = /* GraphQL */ `
  query AnnouncementsByDate(
    $year: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    announcementsByDate(
      year: $year
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        courseId
        lecturerId
        description
        start
        end
        date
        course {
          coursecode
          _version
          _deleted
          _lastChangedAt
          __typename
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
          announcement_Matrix {
            SMS
            PUSH
            EMAIL
            __typename
          }
          info
          __typename
        }
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
  }
`;

export const listAdminApplications = /* GraphQL */ `
  query ListAdminApplications(
    $filter: ModelAdminApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        firstname
        email
        status
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
  }
`;
