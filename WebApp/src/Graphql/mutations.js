export const createLecturer=`mutation CreateLecturer(
  $input: CreateLecturerInput!
  $condition: ModelLecturerConditionInput
) {
  createLecturer(input: $input, condition: $condition) {
    id
    institutionId
    firstname
    lastname
    email
    courses {
      items{
        id
        coursecode
      }
    }
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
    createdAt
    updatedAt
  }
}`
export const createAnnouncement=`mutation CreateAnnouncement(
  $input: CreateAnnouncementInput!
  $condition: ModelAnnouncementConditionInput
) {
  createAnnouncement(input: $input, condition: $condition) {
    id
    courseId
    title
    body
    course{
      coursecode
    }
    date
  }
}
`
export const updateAnnouncement=`mutation UpdateAnnouncement(
  $input: UpdateAnnouncementInput!
  $condition: ModelAnnouncementConditionInput
) {
  updateAnnouncement(input: $input, condition: $condition) {
    id
    courseId
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
    }
    createdAt
    updatedAt
  }
}`
export const createAdmin=`mutation CreateAdmin(
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
    institution {
      id
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
}
`

export const createInstitution=`mutation CreateInstitution(
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
    domains
    adminId     
    createdAt
    updatedAt
  }
}
`
export const updateInstitution=`mutation UpdateInstitution(
  $input: UpdateInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  updateInstitution(input: $input, condition: $condition) {
    id
    name
    location
    pageUrl
    logo
    campusMapUrl
    openingTime
    closingTime
    minimumDuration
    lectureremails
    coursecodes
    domains
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

}`

export const deleteAnnouncement=`mutation DeleteAnnouncement(
  $input: DeleteAnnouncementInput!
  $condition: ModelAnnouncementConditionInput
) {
  deleteAnnouncement(input: $input, condition: $condition) {
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
}
`
export const updateAdmin=`mutation UpdateAdmin(
  $input: UpdateAdminInput!
  $condition: ModelAdminConditionInput
) {
  updateAdmin(input: $input, condition: $condition) {
    id
    institutionId
    institution{
      id
      name
      domains
      logo
      lectureremails
      courses{
        items{
          coursecode
          id
        }
      }
    }
    firstname
    lastname
    userRole
    email
    createdAt
    updatedAt
    owner
  }
}`


export const createCourse=`mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
    id
    institutionId
    lecturerId
    coursecode
    semester
    createdAt
    updatedAt
  }
}`

export const updateActivity=`mutation UpdateActivity(
  $input: UpdateActivityInput!
  $condition: ModelActivityConditionInput
) {
  updateActivity(input: $input, condition: $condition) {
    id
    courseId
    activityname
    createdAt
    updatedAt
    coordinates
  }
}`