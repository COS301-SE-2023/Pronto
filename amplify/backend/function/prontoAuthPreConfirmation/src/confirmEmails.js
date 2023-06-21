const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;
let institutionDetails;
const getAndSetInstitutionDetails = async (institutionId) => {
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (!body.errors) return (institutionDetails = body.data.getInstitution);
  } catch (getEmailsQueryError) {
    console.debug(getEmailsQueryError);
    throw new Error(`Failed To retrieve institution details. id=${institutionId}.`);
  }
};

const getLectureEmailsFromInstitution = async (institutionId) => {
  if (!institutionId) {
    throw new Error(`Invalid Institution Id: InstitutionId = ${institutionId}`);
  }
  try {
    const results = await getAndSetInstitutionDetails(institutionId);
    return institutionDetails.lectureremails;
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(getAndSetInstitutionDetailsError);
    throw new Error(`Failed to retrieve list of emails for the institution. Info: ${getAndSetInstitutionDetailsError}`);
  }
};

const getInstitutionAdminId = async (institutionId) => {
  if (!institutionDetails) {
    const results = await getAndSetInstitutionDetails(institutionId);
    if (!results.error) return institutionDetails.adminId;
    throw new Error(results);
  }
  return institutionDetails.adminId;
};

const isLectureEmailPartOfInstitution = async (email, institutionId) => {
  try {
    const emailList = await getLectureEmailsFromInstitution(institutionId);
    return emailList.includes(email);
  } catch (getLectureEmailsFromInstitutionError) {
    throw new Error(getLectureEmailsFromInstitutionError);
  }
};

const isAdminAllocated = function (institutionId) {
  try {
    const adminId = getInstitutionAdminId(institutionId);
    return adminId != null;
  } catch (error) {}
};

module.exports = {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
};
