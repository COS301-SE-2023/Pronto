import { getAndSetInstitutionDetails } from "../../pronto5f713f59PreSignup/src/assertInstitutionInfo";
import { DATASTREAM_ACTIONS, CAMPAIN_NAME_SUFFIX } from "./constants";

/*on inst creation:
    build campain name
    create campain, if does not exist
    store campains
*/

/*on module codes update
    create module segment
    update compain
*/
const createCampainNames = (institutionName) => {
  formattedInstitutionName = institutionName.replaceAll(" ", "+");
  emailCampainName = formattedInstitutionName + CAMPAIN_NAME_SUFFIX.EMAIL;
  smsCampainName = formattedInstitutionName + CAMPAIN_NAME_SUFFIX.EMAIL;
  pushCampainName =
    formattedInstitutionName + CAMPAIN_NAME_SUFFIX.PUSH_NOTIFICATIONS;
  return {
    emailCampainName,
    smsCampainName,
    pushCampainName,
  };
};

const createPinpointCampain = async (institutionName) => {
  const campainNames = createCampainNames(institutionName);
  const createCampaignCommandInput = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    WriteCampaignRequest: {},
  };
};

const updateNotifications = async (UpdateOption) => {
  switch (UpdateOption) {
    case DATASTREAM_ACTIONS.INSTITUDE_CREATED:
      break;
    case DATASTREAM_ACTIONS.INSTITUDE_UPDATED:
      break;
    case DATASTREAM_ACTIONS.MODULE_CODES_UPDATED:
      break;

    default:
      break;
  }
};
