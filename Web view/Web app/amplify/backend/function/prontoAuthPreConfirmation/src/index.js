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
import ROLES from './roles.js';
import { isLectureEmailPartOfInstitution,
        isAdminAllocated
} from './confirmEmails.js';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    if(!event.request.clientMetadata.role)
        throw new Error('User role not provided on ClientMetadata')
    event.response.autoConfirmUser = false;
    try {        
        switch (event.request.clientMetadata.role) {
            case ROLES.Admin:
                if(isAdminAllocated(event.request.clientMetadata.institutionId)){
                    event.response.autoConfirmUser = false;
                    throw new Error(`Institution has an admin already. institutionId=${event.request.clientMetadata.institutionId}`);
                }
                event.response.autoConfirmUser = true;
                break;
            case ROLES.Lecture:
                const isLectureEmailPartOfInstitution = isLectureEmailPartOfInstitution(
                    event.request.userAttributes.email,
                    event.request.clientMetadata.institutionId
                );
                if(isLectureEmailPartOfInstitution){
                    event.response.autoConfirmUser = true;
                }
                event.response.autoConfirmUser = false;
                throw new Error(`Lecturer email is not part of the Institution. institutionId=${event.request.clientMetadata.institutionId}`);
            case ROLES.Student:
                //call api
                //get email domains for the institution
                //check student domain
                //event.response.autoConfirmUser = isStudentDomainPartOfInstitution();
                event.response.autoConfirmUser = false;
                break;
            default:
                break;
        }
    } catch (apiHandlerError) {
        //db error, add error handling mechanisms
        throw new Error(apiHandlerError); //send error to client
    }
    return event;
};
