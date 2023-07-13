const GRAPHQL_ENDPOINT = process.env.API_API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_API_PRONTO_GRAPHQLAPIKEYOUTPUT;
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
      query MyQuery($id: ID = ${institutionId}) {
        getInstitution(id: $id) {
          adminId
          domains
          lectureremails
        }
      }
    `;

  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    console.table(body);
    if (body.ok) return (institution.details = body.data.getInstitution);
    console.table(body.message);
    throw new Error("API ERROR: Failed to retrieve data");
  } catch (getEmailsQueryError) {
    console.debug(getEmailsQueryError);
    throw new Error(`Failed To retrieve institution details.`);
  }
};

const getLectureEmailsFromInstitution = async (institutionId) => {
  try {
    const institutionetails = await getAndSetInstitutionDetails(institutionId);
    return institutionetails.lectureremails;
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(getAndSetInstitutionDetailsError);
    throw new Error(`Failed to retrieve list for the institution.`);
  }
};

const getInstitutionAdminId = async (institutionId) => {
  try {
    const institutionetails = await getAndSetInstitutionDetails(institutionId);
    return institutionetails.adminId;
  } catch (getInstitutionAdminIdError) {
    throw new Error(`Failed to retrieve admin for the institution.`);
  }
};

const isLectureEmailPartOfInstitution = async (email, institutionId) => {
  if (!email) throw new Error(`Invalid email = ${email}`);
  try {
    const emailList = await getLectureEmailsFromInstitution(institutionId);
    return emailList.includes(email);
  } catch (getLectureEmailsFromInstitutionError) {
    console.debug(getLectureEmailsFromInstitutionError);
    throw new Error(getLectureEmailsFromInstitutionError);
  }
};

const isAdminAllocated = async (institutionId) => {
  try {
    const adminId = await getInstitutionAdminId(institutionId);
    return adminId != null;
  } catch (getInstitutionAdminIdError) {
    console.debug(getInstitutionAdminIdError);
    throw new Error(getInstitutionAdminIdError);
  }
};

module.exports = {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
  getAndSetInstitutionDetails,
  getLectureEmailsFromInstitution,
  getInstitutionAdminId,
};
