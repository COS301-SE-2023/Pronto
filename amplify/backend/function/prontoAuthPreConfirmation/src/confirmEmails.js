import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;
let institutionDetails;
const getAndSetInstitutionDetails = async(institutionID) => {
  const query = /* GraphQL */ `
      query MyQuery($id: ID = ${institutionID}) {
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
            'error': `Failed To retrieve institution details. id=${institutionID}.
             Info: ${body.errors}`
        };
    return institutionDetails = body.data.getInstitution;
  } catch (getEmailsQueryError) {
    return {
        'error': `Failed To retrieve institution details. id=${institutionID}.
         Info: ${getEmailsQueryError}`
    };
  }
}

const getLectureEmailsFromInstitution = async (institutionID) => {
  if(!institutionDetails){
    const results = await getAndSetInstitutionDetails(institutionID);
    if(!results.error)
      return institutionDetails.lectureremails;
  }
  return institutionDetails.lectureremails;
}

const getInstitutionadminId = async (institutionID) => {
  
}
    
export const isLectureEmailPartOfInstitution = async(email, institutionID) =>{
    const emailList = await getLectureEmailsFromInstitution(institutionID);
    return !emailList.error ? emailList.includes(email) : emailList.error;
}

module.exports ={
    isLectureEmailPartOfInstitution
}