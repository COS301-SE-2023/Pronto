
export const listLecturers=`query ListLecturers(
  $filter: ModelLecturerFilterInput
  $limit: Int
  $nextToken: String
) {
  listLecturers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      institutionId
      institution{
        logo
        name
      }
      firstname
      lastname
      email
      courses { 
        items{ 
          id 
          lecturerId
          coursecode
          activity{ 
            items{
              id
              activityname
              day
              start
              end
              venue
              coordinates
            }
          }
        }
      }
    }
    nextToken
  }
}`

export const getInstitution=`query GetInstitution($id: ID!) {
  getInstitution(id: $id) {
    id
    name
    lectureremails
    domains
    admin {
      id
      institutionId
      firstname
      lastname
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
      email
      courses{
        items{
          id
          coursecode
        }
      }
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
      email
      institution{
        id
        name
        logo
        domains
        lectureremails
        courses{
          items{
            id
            coursecode
          }
        }
      }
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
      course{
        coursecode
      }
      body
      title
      date
      venue
      title
      type
      course{
        coursecode
      }
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

export const searchLecturers=`query SearchLecturers(
  $filter: SearchableLecturerFilterInput
  $sort: [SearchableLecturerSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableLecturerAggregationInput]
) {
  searchLecturers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      institutionId
      firstname
      lastname
      email
      courses{
        items{
          id
          coursecode
        }
      }
    }
    nextToken
  }
}
`

export const announcementsByDate=`query AnnouncementsByDate ( 
        $year: String!,  
        $createdAt: ModelStringKeyConditionInput, 
        $sortDirection: ModelSortDirection, 
        $filter: ModelAnnouncementFilterInput, 
        $limit: Int, 
        $nextToken: String
      ){
          announcementsByDate( 
            year:$year,  
            createdAt: $createdAt, 
            sortDirection: $sortDirection, 
            filter: $filter, 
            limit: $limit, 
            nextToken: $nextToken
            ){ 
              items{ 
                id
                title
                body
                date
                createdAt
                course{
                  coursecode   
                }
                type
              }
              nextToken
            }
}`

export const searchCourses=`query SearchCourses(
  $filter: SearchableCourseFilterInput
  $sort: [SearchableCourseSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableCourseAggregationInput]
) {
  searchCourses(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      lecturerId
      institutionId
      coursecode
    }
    nextToken
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
}
`
export const searchLecturerByCourses=`query SearchCourses(
  $filter: SearchableCourseFilterInput
  $sort: [SearchableCourseSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableCourseAggregationInput]
) {
  searchCourses(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      lecturer { 
        id
        firstname
        lastname
        institutionId
        courses{
          items{
            coursecode
            id
            lecturerId
            institutionId
          }
        }
      }
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
}
`