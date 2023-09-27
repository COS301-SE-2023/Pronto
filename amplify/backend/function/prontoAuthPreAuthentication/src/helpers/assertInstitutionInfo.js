const ROLES = require("../roles");
const GRAPHQL_ENDPOINT = process.env.API_PRONTO_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_PRONTO_GRAPHQLAPIKEYOUTPUT;
let emails = {
  lecturerByEmail: {
    items: [],
  },
  adminByEmail: {
    items: [],
  },
};

const isEmailAddressPatternValid = (enailAddress) => {
  const emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailAddressPattern.test(enailAddress);
};

const getAdminAndLecturerEmails = async (email) => {
  if (!email || !isEmailAddressPatternValid(email))
    throw new Error(`Invalid email address. Emaail: ${email}`);
  if (
    (emails.lecturers.items.length > 0 && emails.lecturers.items[0] == email) ||
    (emails.adminByEmail.items.length > 0 &&
      emails.adminByEmail.items[0] == email)
  )
    return emails;
  const query = /* GraphQL */ `
    query ($lecturerInput: String!, $adminInput: String!) {
      lecturerByEmail(email: $lecturerInput) {
        items {
          email
        }
      }
      adminByEmail(email: $adminInput) {
        items {
          email
        }
      }
    }
  `;
  const variables = {
    adminInput: email,
    lecturerInput: email,
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
  try {
    const response = await fetch(request);
    const body = await response.json();
    console.debug(`graphQL Resonse: ${JSON.stringify(body)}`);
    if (body.data) return (emails = body.data);
    throw new Error("API ERROR: Failed to retrieve data");
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(getAndSetInstitutionDetailsError);
    throw new Error(`Failed To retrieve email list details.`);
  }
};

const isUserAdminOrLecturer = async (email, role) => {
  if (!email || !isEmailAddressPatternValid(email) || !role)
    throw new Error(`Invalid email address. Email = ${email}`);
  try {
    const emails = await getAdminAndLecturerEmails(email);
    if (!emails) throw new Error(`Failed To retrieve institution details`);
    switch (role) {
      case ROLES.Admin:
        if (!emails.adminByEmail.items.length)
          throw new Error(`Institude does not have an admin,\n
        Please request for one on AgileArchitectsCapstone@gmail.com\n
        More info on: https://www.prontotimetable.co.za/`);
        return (
          emails.adminByEmail.items[0] === mail &&
          emails.adminByEmail.items.length === 1
        );
      case ROLES.Lecture:
        if (!emails.lecturers.items.length)
          throw new Error(
            "Lecture email list was not provided, please contact your institution admin"
          );
        return emails.lecturerByEmail.items.includes(email);
      case ROLES.Super:
        return process.env.PRONTO_ADMIN_EMAIL === email;
      default:
        return false;
    }
  } catch (getAndSetInstitutionDetailsError) {
    console.debug(`ERROR CONFIRMING ADMIN OR LECTURER PRESIGNIP INFORMATION.\n
    DETAILS: ${getAndSetInstitutionDetailsError}`);
    throw new Error("FAILED TO VALIDATE ADMIN or LECTURER USER ROLE TYPE");
  }
};

module.exports = {
  getAdminAndLecturerEmails,
  isUserAdminOrLecturer,
};
