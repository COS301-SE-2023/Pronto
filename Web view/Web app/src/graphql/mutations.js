export const createLecturer=`mutation CreateLecturer(
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
      domains
      adminId
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
}`
export const deleteLecturer=`mutation DeleteLecturer(
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
                                    domains
                                    adminId
                                    createdAt
                                    updatedAt
                                    }
                                courses {
                                    nextToken
                                    startedAt
                                }
                                    createdAt
                                    updatedAt
                                    owner
                            }
                        }`                            
                        ;


export const updateCourse=`mutation UpdateCourse(
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
      domains
      adminId
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
}`