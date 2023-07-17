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
      courseId
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
      group
      frequency
      description
      createdAt
      updatedAt
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