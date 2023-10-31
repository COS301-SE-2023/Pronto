const GRAPHQL = Object.freeze({
  OBJECT_TYPES: { MUTATION: "mutation", QUERY: "Query" },
  FIELD_TYPES: {
    UPDATE_ANNOUNCEMENT: "updateAnnouncement",
    DELETE_ANNOUNCEMENT: "deleteAnnouncement",
    CREATE_ANNOUNCEMENT: "createAnnouncement",
  },
});
const NOTIFICATIONS_STATUS = Object.freeze({
  SENT: "SENT",
  DISABLED: "DISABLED",
  FAILED: "FAILED",
  UNAVAILABLE: "UNAVAILABLE",
});
module.exports = {
  GRAPHQL,
  NOTIFICATIONS_STATUS,
};
