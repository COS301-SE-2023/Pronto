
export const listLecturers=`query ListLecturers(
  $filter: ModelLecturerFilterInput
  $limit: Int
  $nextToken: String
) {
  listLecturers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      _version
      _deleted
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
    }
    adminId
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
      _deleted
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
      logo
      lectureremails
      domains
      adminId
    }
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
      lectureremails
      domains
      adminId
    }
    courses {
      nextToken
    }
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
                _version
                _deleted
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
      _deleted
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
        _deleted
        _version
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

export const listAdminApplications=`
             query listAdminApplications(
                  $filter: ModelAdminApplicationFilterInput, 
                  $limit: Int, 
                  $nextToken: String)
                  {
                    listAdminApplications(
                      filter: $filter
                      limit :$limit
                      nextToken : $nextToken
                    ){
                      items{
                        id
                        name
                        firstname
                        email
                        status
                        createdAt
                        _version
                        _deleted
                      }
                      nextToken
                    }
                  }`
                
