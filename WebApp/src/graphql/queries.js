
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
      courses { 
        items{ 
          id 
          coursecode
        }
      }
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
      logo
      name
      location
      pageUrl
      campusMapUrl
      openingTime
      closingTime
      minimumDuration
      domains
      lectureremails
      admin { 
        id
        firstname
        lastname
        email
      }
      courses{ 
        items { 
           id
           lecturerId
           coursecode
           coursename
        }
      }
      lecturer{ 
        items{ 
          id
          firstname
          lastname
          email
          courses { 
            items{ 
              id 
              coursecode
              coursename
            }
          }
        }
      }
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
      courses{
        items{
          id
          coursename
        }
      }
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
      coursename
      semester
      createdAt
      updatedAt
    }
    nextToken
  }
}`

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
      owner
    }
    nextToken
  }
}`

export const listAnnouncements=`query ListAnnouncements(
  $filter: ModelAnnouncementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnnouncements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      start
      end
      date
      venue
      createdAt
      updatedAt
    }
    nextToken
  }
}`

export const getLecturer=`query GetLecturer($id: ID!) {
  getLecturer(id: $id) {
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
    courses {
      nextToken
    }
    createdAt
    updatedAt
    owner
  }
}`