const GRAPHQL_ENDPOINT = process.env.API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_PRONTO_GRAPHQLAPIKEYOUTPUT;
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
    return institutionetails.admin.id;
  } catch (getInstitutionAdminIdError) {
    console.debug({ getInstitutionAdminIdError });
    throw new Error(`Failed to retrieve admin for the institution.`);
  }
};

const getInstitutionEmailDomains = async (institutionId) => {
  try {
    const institutionetails = await getAndSetInstitutionDetails(institutionId);
    return institutionetails.domains;
  } catch (getInstitutionEmailDomainsError) {
    console.debug(getInstitutionEmailDomainsError);
    throw new Error(`Failed to retrieve email domains for the institution.`);
  }
};

const isLectureEmailPartOfInstitution = async (email, institutionId) => {
  if (!email) throw new Error(`Invalid email = ${email}`);
  try {
    const emailList = await getLectureEmailsFromInstitution(institutionId);
    if (!emailList)
      throw Error(
        "Lecture email list was not provided, please contact your institution admin"
      );
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

const isStudentEmailDomainPartOfInstitution = async (
  studentEmail,
  institutionId
) => {
  try {
    const institutionDomains = await getInstitutionEmailDomains(institutionId);
    if (!institutionDomains)
      throw new Error(
        "The Allowed Email Domain for students has not been set for this institution. Please contact your admin"
      );
    console.table(institutionDomains);
    return Object.values(institutionDomains).includes(
      studentEmail.split("@")[1]
    );
  } catch (getInstitutionEmailDomainsError) {
    console.debug(getInstitutionEmailDomainsError);
    throw new Error(getInstitutionEmailDomainsError);
  }
};

module.exports = {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
  isStudentEmailDomainPartOfInstitution,
  getAndSetInstitutionDetails,
  getLectureEmailsFromInstitution,
  getInstitutionAdminId,
  getInstitutionEmailDomains,
};
