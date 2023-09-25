export const createLecturer = `mutation CreateLecturer(
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

export const deleteLecturer = `mutation DeleteLecturer(
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
                                
                                courses {
                                    nextToken
                                }
                            }
                        }`
  ;


export const updateCourse = `mutation UpdateCourse(
  $input: UpdateCourseInput!
  $condition: ModelCourseConditionInput
) {
  updateCourse(input: $input, condition: $condition) {
    id
    institutionId
    lecturerId
    coursecode
  }
}`

export const createAnnouncement = `mutation CreateAnnouncement(
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
export const updateAnnouncement = `mutation UpdateAnnouncement(
  $input: UpdateAnnouncementInput!
  $condition: ModelAnnouncementConditionInput
) {
  updateAnnouncement(input: $input, condition: $condition) {
    id
    courseId
    date
    venue
  }
}`
export const createAdmin = `mutation CreateAdmin(
  $input: CreateAdminInput!
  $condition: ModelAdminConditionInput
) {
  createAdmin(input: $input, condition: $condition) {
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
  }
}
`

export const createInstitution = `mutation CreateInstitution(
  $input: CreateInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  createInstitution(input: $input, condition: $condition) {
    id
    name
    admin{
      email
      name
    }
    lectureremails
    coursecodes
    domains
    adminId     
  }
}
`
export const updateInstitution = `mutation UpdateInstitution(
  $input: UpdateInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  updateInstitution(input: $input, condition: $condition) {
    id
    name
    logo
    lectureremails
    domains
    adminId
  }

}`

export const deleteAnnouncement = `mutation DeleteAnnouncement(
  $input: DeleteAnnouncementInput!
  $condition: ModelAnnouncementConditionInput
) {
  deleteAnnouncement(input: $input, condition: $condition) {
    id
  }
}
`
export const updateAdmin = `mutation UpdateAdmin(
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
  }
}`


export const createCourse = `mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
    id
    institutionId
    lecturerId
    coursecode
  }
}`

export const updateActivity = `mutation UpdateActivity(
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


export const createActivity=`mutation CreateActivity(
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
  }
}`


export const deleteCourse = `mutation DeleteCourse(
  $input: DeleteCourseInput!
  $condition: ModelCourseConditionInput
) {
  deleteCourse(input: $input, condition: $condition) {
    id
    institutionId
    lecturerId
    coursecode
    coursename
  }

}`

export const deleteInstitution =
  `mutation DeleteInstitution(
    $input: DeleteInstitutionInput!
    $condition: ModelInstitutionConditionInput
  ) {
    deleteInstitution(input: $input, condition: $condition) {
      id
      name
      lectureremails
      logo
      domains
      adminId
      owner
      courses {
        nextToken
      }
      
    }
  }
;`



export const createAdminApplication = /* GraphQL */ `
  mutation CreateAdminApplication(
    $input: CreateAdminApplicationInput!
    $condition: ModelAdminApplicationConditionInput
  ) {
    createAdminApplication(input: $input, condition: $condition) {
      id
      name
      email
      status
    }
  }
`;

export const updateAdminApplication = /* GraphQL */ `
  mutation UpdateAdminApplication(
    $input: UpdateAdminApplicationInput!
    $condition: ModelAdminApplicationConditionInput
  ) {
    updateAdminApplication(input: $input, condition: $condition) {
      id
      name
      email
      status
    }
  }
`;

