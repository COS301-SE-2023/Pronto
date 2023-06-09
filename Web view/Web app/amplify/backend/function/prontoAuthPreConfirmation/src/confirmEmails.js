import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;
let institutionDetails;
const getAndSetInstitutionDetails = async(institutionId) => {
  const query = /* GraphQL */ `
      query MyQuery($id: ID = ${institutionId}) {
        getInstitution(id: $id) {
          adminId
          domains
          lectureremails
        }
      }
    `;
  
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  };
  
  const request = new Request(GRAPHQL_ENDPOINT, options);
  let body;
  let response;
  
  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
        return {
            error: `Failed To retrieve institution details. id=${institutionId}.
             Info: ${body.errors}`
        };
    return institutionDetails = body.data.getInstitution;
  } catch (getEmailsQueryError) {
    return {
        error: `Failed To retrieve institution details. id=${institutionId}.
         Info: ${getEmailsQueryError}`
    };
  }
}

const getLectureEmailsFromInstitution = async (institutionId) => {
  if(!institutionDetails){
    const results = await getAndSetInstitutionDetails(institutionId);
    if(!results.error)
      return institutionDetails.lectureremails;
    throw new Error(results);
  }
  return institutionDetails.lectureremails;
}

const getInstitutionAdminId = async (institutionId) => {
  if(!institutionDetails){
    const results = await getAndSetInstitutionDetails(institutionId);
    if(!results.error)
      return institutionDetails.adminId;
    throw new Error(results);
  }
  return institutionDetails.adminId;
}
    
const isLectureEmailPartOfInstitution = async(email, institutionId) =>{
  try {
    const emailList = await getLectureEmailsFromInstitution(institutionId);
    return emailList.includes(email);
  } catch (getLectureEmailsFromInstitutionError) {
    throw new Error(getLectureEmailsFromInstitutionError)
  }
}

const isAdminAllocated = function(institutionId) {
  try {
    const adminId = getInstitutionAdminId(institutionId);
    return adminId != null;
  } catch (error) {
    
  }
}

module.exports ={
    isLectureEmailPartOfInstitution,
    isAdminAllocated
}