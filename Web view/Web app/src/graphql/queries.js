
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
      owner
    }
    nextToken
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
  }
}
`
;
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
    }
    nextToken
  }
}`
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
    }
    createdAt
    updatedAt
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
      owner
    }
    nextToken
  }
}
`

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
      semester
      createdAt
      updatedAt
    }
    nextToken
  }
}`