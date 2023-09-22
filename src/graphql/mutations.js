/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateInstitution = /* GraphQL */ `
  mutation UpdateInstitution(
    $input: UpdateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    updateInstitution(input: $input, condition: $condition) {
      id
      name
      location
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
export const deleteInstitution = /* GraphQL */ `
  mutation DeleteInstitution(
    $input: DeleteInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    deleteInstitution(input: $input, condition: $condition) {
      id
      name
      location
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
export const createAdmin = /* GraphQL */ `
  mutation CreateAdmin(
    $input: CreateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    createAdmin(input: $input, condition: $condition) {
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
export const updateAdmin = /* GraphQL */ `
  mutation UpdateAdmin(
    $input: UpdateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    updateAdmin(input: $input, condition: $condition) {
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
export const deleteAdmin = /* GraphQL */ `
  mutation DeleteAdmin(
    $input: DeleteAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    deleteAdmin(input: $input, condition: $condition) {
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
export const createLecturer = /* GraphQL */ `
  mutation CreateLecturer(
    $input: CreateLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    createLecturer(input: $input, condition: $condition) {
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
export const updateLecturer = /* GraphQL */ `
  mutation UpdateLecturer(
    $input: UpdateLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    updateLecturer(input: $input, condition: $condition) {
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
export const deleteLecturer = /* GraphQL */ `
  mutation DeleteLecturer(
    $input: DeleteLecturerInput!
    $condition: ModelLecturerConditionInput
  ) {
    deleteLecturer(input: $input, condition: $condition) {
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
export const createEnrollment = /* GraphQL */ `
  mutation CreateEnrollment(
    $input: CreateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    createEnrollment(input: $input, condition: $condition) {
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
export const updateEnrollment = /* GraphQL */ `
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {
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
export const deleteEnrollment = /* GraphQL */ `
  mutation DeleteEnrollment(
    $input: DeleteEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    deleteEnrollment(input: $input, condition: $condition) {
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
export const createTimetable = /* GraphQL */ `
  mutation CreateTimetable(
    $input: CreateTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    createTimetable(input: $input, condition: $condition) {
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
export const updateTimetable = /* GraphQL */ `
  mutation UpdateTimetable(
    $input: UpdateTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    updateTimetable(input: $input, condition: $condition) {
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
export const deleteTimetable = /* GraphQL */ `
  mutation DeleteTimetable(
    $input: DeleteTimetableInput!
    $condition: ModelTimetableConditionInput
  ) {
    deleteTimetable(input: $input, condition: $condition) {
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
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
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
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
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
export const createAnnouncement = /* GraphQL */ `
  mutation CreateAnnouncement(
    $input: CreateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    createAnnouncement(input: $input, condition: $condition) {
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
export const updateAnnouncement = /* GraphQL */ `
  mutation UpdateAnnouncement(
    $input: UpdateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    updateAnnouncement(input: $input, condition: $condition) {
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
export const deleteAnnouncement = /* GraphQL */ `
  mutation DeleteAnnouncement(
    $input: DeleteAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    deleteAnnouncement(input: $input, condition: $condition) {
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
export const createNotificationPreferance = /* GraphQL */ `
  mutation CreateNotificationPreferance(
    $input: CreateNotificationPreferanceInput!
    $condition: ModelNotificationPreferanceConditionInput
  ) {
    createNotificationPreferance(input: $input, condition: $condition) {
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
export const updateNotificationPreferance = /* GraphQL */ `
  mutation UpdateNotificationPreferance(
    $input: UpdateNotificationPreferanceInput!
    $condition: ModelNotificationPreferanceConditionInput
  ) {
    updateNotificationPreferance(input: $input, condition: $condition) {
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
export const deleteNotificationPreferance = /* GraphQL */ `
  mutation DeleteNotificationPreferance(
    $input: DeleteNotificationPreferanceInput!
    $condition: ModelNotificationPreferanceConditionInput
  ) {
    deleteNotificationPreferance(input: $input, condition: $condition) {
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
export const createInstitution = /* GraphQL */ `
  mutation CreateInstitution(
    $input: CreateInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    createInstitution(input: $input, condition: $condition) {
      id
      name
      location
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
