const isAppClientValid = require("../../../../amplify/backend/function/pronto5f713f59PreSignup/src/isAppClientValid");
const ROLE = require("../../../../amplify/backend/function/pronto5f713f59PreSignup/src/roles");
const adminEvent = require("../../../../amplify/backend/function/pronto5f713f59PreSignup/src/events/admin.event.json");
const lecturerEvent = require("../../../../amplify/backend/function/pronto5f713f59PreSignup/src/events/lecturers.event.json");
const studentsEvent = require("../../../../amplify/backend/function/pronto5f713f59PreSignup/src/events/students.event.json");

describe("input validation", () => {
  test("should throw Invalid User Role", () => {
    const nullClientID = null;
    const nullRole = null;
    expect(() => {
      isAppClientValid(nullClientID, nullRole);
    }).toThrow("Invalid User Role");
  });
  test("should throw Unrecognised user pool app client ID", () => {
    const nullClientID = null;
    expect(() => {
      isAppClientValid(nullClientID, ROLE.Lecture);
    }).toThrow(/^Unrecognised user pool app client ID/);
  });
});

describe("is the app client id valid?", () => {
  test("should return false", () => {
    process.env.AppClientIdWeb = adminEvent.callerContext.clientId;
    expect(
      isAppClientValid(adminEvent.callerContext.clientId, ROLE.Student)
    ).toBe(false);
  });
  test("should return true", () => {
    process.env.AppClientIdWeb = adminEvent.callerContext.clientId;
    expect(
      isAppClientValid(adminEvent.callerContext.clientId, ROLE.Lecture)
    ).toBe(true);
  });
  test("should return false", () => {
    process.env.AppClientIdWeb = adminEvent.callerContext.clientId;
    expect(
      isAppClientValid(studentsEvent.callerContext.clientId, ROLE.Lecture)
    ).toBe(false);
  });
  test("should return true", () => {
    process.env.AppClientIdWeb = studentsEvent.callerContext.clientId;
    expect(
      isAppClientValid(studentsEvent.callerContext.clientId, ROLE.Student)
    ).toBe(false);
  });
});
