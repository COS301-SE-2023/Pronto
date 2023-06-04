import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;

const getLectureEmailsFromInstitution = async (institutionID) =>{
    const query = /* GraphQL */ `
    query MyQuery {
      getInstitution(id: institutionID) {
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
                'error': `Failed To retrieve emails from institution with id=${institutionID}.
                 Info: ${body.errors}`
            };
        return body.data.getInstitution?.lectureremails;
      } catch (getEmailsQueryError) {
        return {
            'error': `Failed To retrieve emails from institution with id=${institutionID}.
             Info: ${getEmailsQueryError}`
        };
      }
}
    
export const isEmailPartOfInstitution = async(email, institutionID) =>{
    const emailList = await getLectureEmailsFromInstitution(institutionID);
    return !emailList.error ? emailList.includes(email) : emailList.error;
}

module.exports ={
    isEmailPartOfInstitution
}