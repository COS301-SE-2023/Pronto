/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        admin {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        adminId
        owner
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        students {
          items {
            institutionId
            id
            firstname
            lastname
            userRole
            email
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
          items {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      courses {
        items {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
        type
        enpointID
        deviceID
        id
        createdAt
        updatedAt
        userId
        __typename
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
        admin {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        adminId
        owner
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        students {
          items {
            institutionId
            id
            firstname
            lastname
            userRole
            email
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
          items {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      timetable {
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
          preference {
            studentId
            type
            enpointID
            deviceID
            id
            createdAt
            updatedAt
            userId
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          timetable {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            activities {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          studentPreferenceId
          studentTimetableId
          owner
          __typename
        }
        activities {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      enrollments {
        items {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          course {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentPreferenceId
      studentTimetableId
      owner
      __typename
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
        preference {
          studentId
          type
          enpointID
          deviceID
          id
          createdAt
          updatedAt
          userId
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        timetable {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          activities {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        studentPreferenceId
        studentTimetableId
        owner
        __typename
      }
      nextToken
      __typename
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
        preference {
          studentId
          type
          enpointID
          deviceID
          id
          createdAt
          updatedAt
          userId
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        timetable {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          activities {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        studentPreferenceId
        studentTimetableId
        owner
        __typename
      }
      activities {
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
          course {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
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
        student {
          institutionId
          id
          firstname
          lastname
          userRole
          email
          preference {
            studentId
            type
            enpointID
            deviceID
            id
            createdAt
            updatedAt
            userId
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          timetable {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            activities {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          studentPreferenceId
          studentTimetableId
          owner
          __typename
        }
        activities {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
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
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNotificationPreferance = /* GraphQL */ `
  query GetNotificationPreferance($id: ID!) {
    getNotificationPreferance(id: $id) {
      studentId
      type
      enpointID
      deviceID
      id
      createdAt
      updatedAt
      userId
      __typename
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
        type
        enpointID
        deviceID
        id
        createdAt
        updatedAt
        userId
        __typename
      }
      nextToken
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const lecturerByEmail = /* GraphQL */ `
  query LecturerByEmail(
    $email: ID!
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        preference {
          studentId
          type
          enpointID
          deviceID
          id
          createdAt
          updatedAt
          userId
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        timetable {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          activities {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        studentPreferenceId
        studentTimetableId
        owner
        __typename
      }
      nextToken
      __typename
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
        preference {
          studentId
          type
          enpointID
          deviceID
          id
          createdAt
          updatedAt
          userId
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        timetable {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          activities {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        studentPreferenceId
        studentTimetableId
        owner
        __typename
      }
      nextToken
      __typename
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
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        type
        enpointID
        deviceID
        id
        createdAt
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      adminId
      owner
      courses {
        items {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      students {
        items {
          institutionId
          id
          firstname
          lastname
          userRole
          email
          preference {
            studentId
            type
            enpointID
            deviceID
            id
            createdAt
            updatedAt
            userId
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          timetable {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            activities {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          studentPreferenceId
          studentTimetableId
          owner
          __typename
        }
        nextToken
        __typename
      }
      lecturer {
        items {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        adminId
        owner
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        students {
          items {
            institutionId
            id
            firstname
            lastname
            userRole
            email
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
          items {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        adminId
        owner
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        students {
          items {
            institutionId
            id
            firstname
            lastname
            userRole
            email
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
          items {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        preference {
          studentId
          type
          enpointID
          deviceID
          id
          createdAt
          updatedAt
          userId
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        timetable {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          activities {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        studentPreferenceId
        studentTimetableId
        owner
        __typename
      }
      course {
        id
        institutionId
        lecturerId
        coursecode
        coursename
        semester
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
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
        student {
          institutionId
          id
          firstname
          lastname
          userRole
          email
          preference {
            studentId
            type
            enpointID
            deviceID
            id
            createdAt
            updatedAt
            userId
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          timetable {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            activities {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          studentPreferenceId
          studentTimetableId
          owner
          __typename
        }
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        student {
          institutionId
          id
          firstname
          lastname
          userRole
          email
          preference {
            studentId
            type
            enpointID
            deviceID
            id
            createdAt
            updatedAt
            userId
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          timetable {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            activities {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          studentPreferenceId
          studentTimetableId
          owner
          __typename
        }
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        items {
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
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          course {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      activity {
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
          course {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      announcents {
        items {
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
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          body
          title
          type
          year
          createdAt
          anonouncementStatus {
            SMS
            PUSH
            EMAIL
            __typename
          }
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      lecturer {
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
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
        admin {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        adminId
        owner
        courses {
          items {
            id
            institutionId
            lecturerId
            coursecode
            coursename
            semester
            enrollments {
              nextToken
              __typename
            }
            activity {
              nextToken
              __typename
            }
            announcents {
              nextToken
              __typename
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
              owner
              __typename
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
              __typename
            }
            notification {
              courseid
              status
              endPoinId
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        students {
          items {
            institutionId
            id
            firstname
            lastname
            userRole
            email
            preference {
              studentId
              type
              enpointID
              deviceID
              id
              createdAt
              updatedAt
              userId
              __typename
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
              __typename
            }
            timetable {
              id
              studentId
              activityId
              createdAt
              updatedAt
              owner
              __typename
            }
            enrollments {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            studentPreferenceId
            studentTimetableId
            owner
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
          items {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      notification {
        courseid
        status
        endPoinId
        __typename
      }
      createdAt
      updatedAt
      owner
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
        coursename
        semester
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
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
        coursename
        semester
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
        coursename
        semester
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
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
              __typename
            }
          }
        }
        __typename
      }
      __typename
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
        enrollments {
          items {
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
              studentPreferenceId
              studentTimetableId
              owner
              __typename
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
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        activity {
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
            course {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        announcents {
          items {
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
              owner
              __typename
            }
            body
            title
            type
            year
            createdAt
            anonouncementStatus {
              SMS
              PUSH
              EMAIL
              __typename
            }
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        lecturer {
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
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
          admin {
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
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          adminId
          owner
          courses {
            items {
              id
              institutionId
              lecturerId
              coursecode
              coursename
              semester
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          students {
            items {
              institutionId
              id
              firstname
              lastname
              userRole
              email
              createdAt
              updatedAt
              studentPreferenceId
              studentTimetableId
              owner
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notification {
          courseid
          status
          endPoinId
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      body
      title
      type
      year
      createdAt
      anonouncementStatus {
        SMS
        PUSH
        EMAIL
        __typename
      }
      updatedAt
      __typename
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
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        body
        title
        type
        year
        createdAt
        anonouncementStatus {
          SMS
          PUSH
          EMAIL
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        body
        title
        type
        year
        createdAt
        anonouncementStatus {
          SMS
          PUSH
          EMAIL
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
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
        venue
        course {
          id
          institutionId
          lecturerId
          coursecode
          coursename
          semester
          enrollments {
            items {
              id
              studentId
              courseId
              year
              createdAt
              updatedAt
              owner
              __typename
            }
            nextToken
            __typename
          }
          activity {
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
              owner
              __typename
            }
            nextToken
            __typename
          }
          announcents {
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
              __typename
            }
            nextToken
            __typename
          }
          lecturer {
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
              __typename
            }
            courses {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            owner
            __typename
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
              __typename
            }
            adminId
            owner
            courses {
              nextToken
              __typename
            }
            students {
              nextToken
              __typename
            }
            lecturer {
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          notification {
            courseid
            status
            endPoinId
            __typename
          }
          createdAt
          updatedAt
          owner
          __typename
        }
        body
        title
        type
        year
        createdAt
        anonouncementStatus {
          SMS
          PUSH
          EMAIL
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
