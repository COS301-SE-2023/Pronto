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