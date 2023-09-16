const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEY;
let institution = {
  details: null,
  id: null,
};

const getAndSetInstitutionDetails = async (institutionId) => {
  if (!institutionId)
    throw new Error(`Invalid Institution Id: InstitutionId = ${institutionId}`);
  if (institution.details && institution.id == institutionId)
    return institution.details;
  institution.id = institutionId;
  const query = /* GraphQL */ `
    query getInstitutionQuery($input: ID!) {
      getInstitution(id: $input) {
        name
        admin {
          id
          email
        }
        domains
        lectureremails
      }
    }
  `;
  const variables = {
    input: institution.id,
  };
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };
};

module.exports = {
  getAndSetInstitutionDetails,
};
