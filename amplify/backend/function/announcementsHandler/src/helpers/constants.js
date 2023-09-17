const GRAPHQL = Object.freeze({
  OBJECT_TYPES: { MUTATION: "mutation", QUERY: "Query" },
  FIELD_TYPES: {
    UPDATE_ANNOUNCEMENT: "updateAnnouncement",
    DELETE_ANNOUNCEMENT: "deleteAnnouncement",
    CREATE_ANNOUNCEMENT: "createAnnouncement",
  },
});

module.exports = {
  GRAPHQL,
};
