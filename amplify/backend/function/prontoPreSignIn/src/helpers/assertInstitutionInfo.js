const ROLES = require("../roles");
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

  const request = new Request(GRAPHQL_ENDPOINT, options);
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    console.debug(`graphQL Resonse: ${JSON.stringify(body)}`);
    if (body.data) return (institution.details = body.data.getInstitution);
    throw new Error("API ERROR: Failed to retrieve data");
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(getAndSetInstitutionDetailsError);
    throw new Error(`Failed To retrieve institution details.`);
  }
};

const isInstitideAdminOrLecturer = async (email, institutionId, role) => {
  if (!email || !institutionId)
    throw new Error(`Invalid institution Id or email`);
  try {
    const institutionetails = await getAndSetInstitutionDetails(institutionId);
    if (!institutionetails)
      throw new Error(`Failed To retrieve institution details`);
    switch (role) {
      case ROLES.Admin:
        if (!institutionetails.admin)
          throw new Error(`Institude does not have an admin,\n
        Please request for one on AgileArchitectsCapstone@gmail.com\n
        More info on: {path/to/pronto/web/about/institude/admin}`);
        return institutionetails.admin.email === mail;
      case ROLES.Lecture:
        if (!institutionetails.lectureremails)
          throw new Error(
            "Lecture email list was not provided, please contact your institution admin"
          );
        return institutionetails.lectureremails.includes(email);
      default:
        throw new Error("Invalid role");
    }
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(`ERROR CONFIRMING ADMIN OR LECTURER PRESIGNIP INFORMATION.\n
    DETAILS: ${getAndSetInstitutionDetailsError}`);
    throw new Error("FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE");
  }
};

module.exports = {
  getAndSetInstitutionDetails,
  isInstitideAdminOrLecturer,
};
