import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_<YOUR_API_NAME>_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT;

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
}
