

export const listAdmins=`query ListAdmins(
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
      userRole
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}`

export const listLecturers=`query ListLecturers(
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
      userRole
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}`

export const getInstitution=`query GetInstitution($id: ID!) {
  getInstitution(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      owner
    }
    adminId
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
`
;
export const getAdmin=`query GetAdmin($id: ID!) {
  getAdmin(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
  }
}`;

export const lecturersByInstitutionId=`query LecturersByInstitutionId(
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
      userRole
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}
`

export const listInstitutions=`query ListInstitutions(
  $filter: ModelInstitutionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInstitutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}`

export const listCourses=`query ListCourses(
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
      coursename
      semester
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}`