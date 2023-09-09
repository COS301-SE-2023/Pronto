const {
  createCampainOperation,
  updateCamapaignOperation,
  deleteCampaignOperation,
} = require("./notificationsCampaign");

/* Handle different data streams */
const updateInstitudeResources = async (updateRequest, pinpointClient) => {
  switch (updateRequest.UpdateOption) {
    case DATASTREAM_EVENT_NAMES.INSTITUDE_CREATED:
      console.debug("INSTITUDE CREATED");
      try {
        const isCampainCreated = await createCampainOperation(
          updateRequest.institutionName,
          institutionId,
          pinpointClient
        );
        return isCampainCreated;
      } catch (sendAndHandleCreatePinpointCampaignError) {
        console.debug(`FAILED TO SEND or HANDLE CREATE PINPOINT REQUEST
        ERROR: ${sendAndHandleCreatePinpointCampaignError}`);
        return false;
      }
    case DATASTREAM_EVENT_NAMES.INSTITUDE_UPDATED:
      console.debug("INSTITUDE UPDATED");
      const { newImage, oldImage } = updateRequest.record.dynamodb;
      const oldInstiudeName = oldImage["name"];
      const newInstutudeName = updateRequest.institutionName;
      const campainId = newImage["notificationsCampaignId"];
      if (newInstutudeName != oldInstiudeName)
        try {
          const isCampaignUpdated = await updateCamapaignOperation(
            newInstutudeName,
            campainId
          );
          return isCampaignUpdated;
        } catch (updateCamapaignOperationError) {
          console.debug(`FAILED TO SEND or HANDLE UPDATE PINPOINT REQUEST
          ERROR: ${updateCamapaignOperationError}`);
          return false;
        }
      break;
    case DATASTREAM_EVENT_NAMES.INSTITUDE_DELETED:
      console.debug("INSITUDE UPDATED");
      try {
        const isCampaignDeleted = await deleteCampaignOperation(
          institutionId,
          campainId
        );
        return isCampaignDeleted;
      } catch (deleteCampaignOperationError) {
        console.debug(`FAILED TO SEND or HANDLE DELETE PINPOINT REQUEST
          ERROR: ${deleteCampaignOperationError}`);
        return false;
      }
    default:
      throw new Error(`UNKOWN DATA STREAM EVENT`);
  }
};
module.exports = {
  updateInstitudeResources,
};
