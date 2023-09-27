export const announcementsByCourseId=`query AnnouncementsByCourseId(
  $courseId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAnnouncementFilterInput
  $limit: Int
  $nextToken: String
) {
  announcementsByCourseId(
    courseId: $courseId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      body
      title
      date
      venue
    }
    nextToken
  }
}`



export const activitiesByCourseId=`query ActivitiesByCourseId(
  $courseId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  activitiesByCourseId(
    courseId: $courseId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      courseId
      activityname
      day
      start
      end
      venue
    }
    nextToken
  }
}
`

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
      institutionId
      coursecode
      activity { 
        items { 
          id
          activityname
          day
          start
          end 
          venue
          courseId
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

export const coursesByInstitutionId=`query CoursesByInstitutionId(
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
      coursename
      semester
    }
    nextToken
  }
}`

export const listTimetables=`query ListTimetables(
  $filter: ModelTimetableFilterInput
  $limit: Int
  $nextToken: String
) {
  listTimetables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      studentId
      activityId
      createdAt
      updatedAt
    }
    nextToken
  }
}`

export const studentsByInstitutionId=`query StudentsByInstitutionId(
  $institutionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  studentsByInstitutionId(
    institutionId: $institutionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      studentTimetableId
    }
    nextToken
  }
}`

export const enrollmentsByStudentId=`query EnrollmentsByStudentId(
  $studentId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEnrollmentFilterInput
  $limit: Int
  $nextToken: String
) {
  enrollmentsByStudentId(
    studentId: $studentId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      studentId
      courseId
      course { 
        id 
        coursecode
      }
    }
    nextToken
  }
}`

export const listStudents=`query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      institutionId
      institution{
        name
      }
      id
      firstname
      lastname
      email
      studentTimetableId
      timetable { 
        id
        activities{ 
           items { 
              id
              courseId
              activityname
              day
              start
              end
              venue
              course{
                coursecode
              }
            }
          }
        activityId  
        }
      enrollments { 
        items{
          id
          courseId
          owner
          course{ 
            id
            coursecode
            activity{
              items{
                courseId
                activityname
                coordinates
                id
                day
                start
                end
                venue 
                course{
                  coursecode
                }
              }
            }
          }
        }
      }  
    }
    nextToken
  }
}`

export const listInstitutions=`query ListInstitutions(
  $filter: ModelInstitutionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInstitutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      domains
    }
    nextToken
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
      coursecode
    }
    nextToken
  }
}`
export const getCourse=`query GetCourse($id: ID!) {
  getCourse(id: $id) {
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
  }
}
`
export const listAnnouncements = `query ListAnnouncements(
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnouncements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseId
        body
        title
        date
        course{
          coursecode
        }
        type
      }

      nextToken
    }
  }
`;

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
}`;

export const getStudent=`query GetStudent($id: ID!) {
  getStudent(id: $id) {
      institutionId
      id
      firstname
      lastname
      email
      studentTimetableId
      timetable { 
        id
        activities{ 
           items { 
              id
              courseId
              activityname
              day
              start
              end
              venue
              course{
                coursecode
              }
            }
          }
        activityId  
        }
      enrollments { 
        items{
          id
          courseId
          course{ 
            id
            coursecode
            activity{
              items{
                courseId
                activityname
                coordinates
                id
                day
                start
                end
                venue 
                course{
                  coursecode
                }
              }
            }
          }
        }
      }  
    }
}`

