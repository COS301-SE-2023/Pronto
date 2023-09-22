const GRAPHQL = Object.freeze({
  OPERATION_TYPES: { MUTATION: "Mutation", QUERY: "Query" },
  FIELDNAME: "announcementStatus",
  ROOT_OBJECT: "Announcement",
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
