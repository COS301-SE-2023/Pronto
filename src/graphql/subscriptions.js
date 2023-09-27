/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLecturer = /* GraphQL */ `
  subscription OnCreateLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onCreateLecturer(filter: $filter, owner: $owner) {
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
export const onUpdateLecturer = /* GraphQL */ `
  subscription OnUpdateLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onUpdateLecturer(filter: $filter, owner: $owner) {
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
export const onDeleteLecturer = /* GraphQL */ `
  subscription OnDeleteLecturer(
    $filter: ModelSubscriptionLecturerFilterInput
    $owner: String
  ) {
    onDeleteLecturer(filter: $filter, owner: $owner) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onCreateStudent(filter: $filter, owner: $owner) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onUpdateStudent(filter: $filter, owner: $owner) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onDeleteStudent(filter: $filter, owner: $owner) {
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
export const onCreateTimetable = /* GraphQL */ `
  subscription OnCreateTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onCreateTimetable(filter: $filter, owner: $owner) {
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
export const onUpdateTimetable = /* GraphQL */ `
  subscription OnUpdateTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onUpdateTimetable(filter: $filter, owner: $owner) {
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
export const onDeleteTimetable = /* GraphQL */ `
  subscription OnDeleteTimetable(
    $filter: ModelSubscriptionTimetableFilterInput
    $owner: String
  ) {
    onDeleteTimetable(filter: $filter, owner: $owner) {
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
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onCreateActivity(filter: $filter, owner: $owner) {
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
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onUpdateActivity(filter: $filter, owner: $owner) {
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
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity(
    $filter: ModelSubscriptionActivityFilterInput
    $owner: String
  ) {
    onDeleteActivity(filter: $filter, owner: $owner) {
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
export const onCreateNotificationPreferance = /* GraphQL */ `
  subscription OnCreateNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $userId: String
  ) {
    onCreateNotificationPreferance(filter: $filter, userId: $userId) {
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
export const onUpdateNotificationPreferance = /* GraphQL */ `
  subscription OnUpdateNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $userId: String
  ) {
    onUpdateNotificationPreferance(filter: $filter, userId: $userId) {
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
export const onDeleteNotificationPreferance = /* GraphQL */ `
  subscription OnDeleteNotificationPreferance(
    $filter: ModelSubscriptionNotificationPreferanceFilterInput
    $userId: String
  ) {
    onDeleteNotificationPreferance(filter: $filter, userId: $userId) {
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
export const onCreateInstitution = /* GraphQL */ `
  subscription OnCreateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onCreateInstitution(filter: $filter, owner: $owner) {
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
export const onUpdateInstitution = /* GraphQL */ `
  subscription OnUpdateInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onUpdateInstitution(filter: $filter, owner: $owner) {
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
export const onDeleteInstitution = /* GraphQL */ `
  subscription OnDeleteInstitution(
    $filter: ModelSubscriptionInstitutionFilterInput
    $owner: String
  ) {
    onDeleteInstitution(filter: $filter, owner: $owner) {
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
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onCreateAdmin(filter: $filter, owner: $owner) {
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
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onUpdateAdmin(filter: $filter, owner: $owner) {
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
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onDeleteAdmin(filter: $filter, owner: $owner) {
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
export const onCreateEnrollment = /* GraphQL */ `
  subscription OnCreateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onCreateEnrollment(filter: $filter, owner: $owner) {
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
export const onUpdateEnrollment = /* GraphQL */ `
  subscription OnUpdateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onUpdateEnrollment(filter: $filter, owner: $owner) {
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
export const onDeleteEnrollment = /* GraphQL */ `
  subscription OnDeleteEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
    $owner: String
  ) {
    onDeleteEnrollment(filter: $filter, owner: $owner) {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onCreateCourse(filter: $filter, owner: $owner) {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onUpdateCourse(filter: $filter, owner: $owner) {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onDeleteCourse(filter: $filter, owner: $owner) {
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
export const onCreateAnnouncement = /* GraphQL */ `
  subscription OnCreateAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onCreateAnnouncement(filter: $filter, lecturerId: $lecturerId) {
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
export const onUpdateAnnouncement = /* GraphQL */ `
  subscription OnUpdateAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onUpdateAnnouncement(filter: $filter, lecturerId: $lecturerId) {
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
export const onDeleteAnnouncement = /* GraphQL */ `
  subscription OnDeleteAnnouncement(
    $filter: ModelSubscriptionAnnouncementFilterInput
    $lecturerId: String
  ) {
    onDeleteAnnouncement(filter: $filter, lecturerId: $lecturerId) {
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
