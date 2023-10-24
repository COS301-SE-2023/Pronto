const APPLICATION_STATUS = Object.freeze({
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  APPROVAL_FAILED: "APPROVAL_FAILED",
  GET_STATUS_FAILED: "GET_STATUS_FAILED",
});
const GRAPHQL = Object.freeze({
  OPERATION_TYPES: { MUTATION: "Mutation", QUERY: "Query" },
  FIELDNAME: "applicationInfo",
  ROOT_OBJECT: "AdminApplication",
});
module.exports = { APPLICATION_STATUS, GRAPHQL };
