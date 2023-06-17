export const createLecturer =`mutation CreateLecturer(
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
                            ;
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
      _version
      _deleted
      _lastChangedAt
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
  }
}
`
;

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
    admin {
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
    adminId
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
}`
;
export const getInstitution=`query GetInstitution($id: ID!) {
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
    domains
    admin {
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
    adminId
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
`
;