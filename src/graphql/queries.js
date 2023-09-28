/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      institutionId
      id
      firstname
      lastname
      userRole
      email
      preference {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
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
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      timetable {
        id
        studentId
        activityId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      enrollments {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentTimetableId
      owner
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        institutionId
        id
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStudents = /* GraphQL */ `
  query SyncStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStudents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        institutionId
        id
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getTimetable = /* GraphQL */ `
  query GetTimetable($id: ID!) {
    getTimetable(id: $id) {
      id
      studentId
      activityId
      student {
        institutionId
        id
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listTimetables = /* GraphQL */ `
  query ListTimetables(
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTimetables = /* GraphQL */ `
  query SyncTimetables(
    $filter: ModelTimetableFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTimetables(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        studentId
        activityId
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
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      courseId
      activityname
      day
      start
      end
      venue
      coordinates
      group
      frequency
      description
      course {
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
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listActivities = /* GraphQL */ `
  query ListActivities(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseId
        activityname
        day
        start
        end
        venue
        coordinates
        group
        frequency
        description
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
`;
export const syncActivities = /* GraphQL */ `
  query SyncActivities(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncActivities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        courseId
        activityname
        day
        start
        end
        venue
        coordinates
        group
        frequency
        description
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
`;
export const studentsByInstitutionId = /* GraphQL */ `
  query StudentsByInstitutionId(
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const studentByEmail = /* GraphQL */ `
  query StudentByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentByEmail(
      email: $email
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const activitiesByCourseId = /* GraphQL */ `
  query ActivitiesByCourseId(
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
        coordinates
        group
        frequency
        description
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
`;
export const getInstitution = /* GraphQL */ `
  query GetInstitution($id: ID!) {
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
      logo
      domains
      admin {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      adminId
      owner
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
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncInstitutions = /* GraphQL */ `
  query SyncInstitutions(
    $filter: ModelInstitutionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInstitutions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        location
        pageUrl
        campusMapUrl
        openingTime
        closingTime
        minimumDuration
        lectureremails
        coursecodes
        logo
        domains
        adminId
        owner
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
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAdmins = /* GraphQL */ `
  query SyncAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdmins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        institutionId
        firstname
        lastname
        userRole
        email
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const adminByEmail = /* GraphQL */ `
  query AdminByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    adminByEmail(
      email: $email
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLecturer = /* GraphQL */ `
  query GetLecturer($id: ID!) {
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
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      courses {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
`;
export const syncLecturers = /* GraphQL */ `
  query SyncLecturers(
    $filter: ModelLecturerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLecturers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
`;
export const lecturerByEmail = /* GraphQL */ `
  query LecturerByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelLecturerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lecturerByEmail(
      email: $email
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
`;
export const searchLecturers = /* GraphQL */ `
  query SearchLecturers(
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
`;
export const getEnrollment = /* GraphQL */ `
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
      id
      studentId
      courseId
      year
      student {
        institutionId
        id
        firstname
        lastname
        userRole
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        studentTimetableId
        owner
      }
      course {
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
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listEnrollments = /* GraphQL */ `
  query ListEnrollments(
    $filter: ModelEnrollmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrollments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        studentId
        courseId
        year
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
`;
export const syncEnrollments = /* GraphQL */ `
  query SyncEnrollments(
    $filter: ModelEnrollmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEnrollments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        studentId
        courseId
        year
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
`;
export const enrollmentsByStudentId = /* GraphQL */ `
  query EnrollmentsByStudentId(
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
        year
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
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      institutionId
      lecturerId
      coursecode
      coursename
      semester
      enrollments {
        nextToken
        startedAt
      }
      activity {
        nextToken
        startedAt
      }
      announcents {
        nextToken
        startedAt
      }
      lecturer {
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
        logo
        domains
        adminId
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      notification {
        courseid
        status
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
        coursename
        semester
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
`;
export const syncCourses = /* GraphQL */ `
  query SyncCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        owner
      }
      nextToken
      startedAt
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
        coursename
        semester
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
`;
export const coursesByLecturerId = /* GraphQL */ `
  query CoursesByLecturerId(
    $lecturerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesByLecturerId(
      lecturerId: $lecturerId
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
`;
export const searchCourses = /* GraphQL */ `
  query SearchCourses(
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
        _version
        _deleted
        _lastChangedAt
        owner
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
`;
export const getAnnouncement = /* GraphQL */ `
  query GetAnnouncement($id: ID!) {
    getAnnouncement(id: $id) {
      id
      courseId
      lecturerId
      description
      start
      end
      date
      venue
      course {
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
        owner
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
        info
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAnnouncements = /* GraphQL */ `
  query ListAnnouncements(
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnouncements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseId
        lecturerId
        description
        start
        end
        date
        venue
        body
        title
        type
        year
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAnnouncements = /* GraphQL */ `
  query SyncAnnouncements(
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAnnouncements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        courseId
        lecturerId
        description
        start
        end
        date
        venue
        body
        title
        type
        year
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const announcementsByCourseId = /* GraphQL */ `
  query AnnouncementsByCourseId(
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
        lecturerId
        description
        start
        end
        date
        venue
        body
        title
        type
        year
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        venue
        body
        title
        type
        year
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotificationPreferance = /* GraphQL */ `
  query GetNotificationPreferance($id: ID!) {
    getNotificationPreferance(id: $id) {
      studentId
      endpoint {
        type
        endPointAddress
        status
        info
      }
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNotificationPreferances = /* GraphQL */ `
  query ListNotificationPreferances(
    $filter: ModelNotificationPreferanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationPreferances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotificationPreferances = /* GraphQL */ `
  query SyncNotificationPreferances(
    $filter: ModelNotificationPreferanceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificationPreferances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const notificationPreferancesByStudentId = /* GraphQL */ `
  query NotificationPreferancesByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationPreferanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationPreferancesByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        studentId
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
