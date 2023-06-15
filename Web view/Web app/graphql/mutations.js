
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

