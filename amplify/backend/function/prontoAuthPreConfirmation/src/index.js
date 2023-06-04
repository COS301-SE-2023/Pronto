/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_PRONTO_GRAPHQLAPIIDOUTPUT
	API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT
	API_PRONTO_GRAPHQLAPIKEYOUTPUT
	AUTH_PRONTOAUTH_USERPOOLID
	StudentsGroupName
	LecturersGroupName
	AdminGroupName
Amplify Params - DO NOT EDIT */
const { ROLES } = require('../../prontoAuthPostConfirmation/src/roles');
const isEmailPartOfInstitution = require('./confirmLectureEmail');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    if(!event.request.clientMetadata.role)
        throw new Error('User role not provided on ClientMetadata')
    switch (event.request.clientMetadata.role) {
        case ROLES.Admin:
            
            break;
        case ROLES.Lecture:
            
            break;
        case ROLES.Student:
            //call api
            //get email domains for the institution
            //check student domain
            //event.response.autoConfirmUser = isStudentDomainPartOfInstitution();
            break;
        default:
            break;
    }
    return event;
};
