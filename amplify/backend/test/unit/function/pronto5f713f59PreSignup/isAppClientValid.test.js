const isAppClientValid = require("../../../../function/pronto5f713f59PreSignup/src/isAppClientValid");
const ROLE = require("../../../../function/pronto5f713f59PreSignup/src/roles");
const adminEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json");
const lecturerEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json");
const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");

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
    }).toThrow(/^Unrecognised user pool app client ID=/);
  });
  test;
});

describe("is the app client id valid?", () => {
  test("should return false", () => {
    process.env.AppClientIdWeb = adminEvent.request.callerContext.clientId;
    expect(
      isAppClientValid(adminEvent.request.callerContext.clientId, ROLE.Student)
    ).toBe(false);
  });
  test("should return true", () => {
    process.env.AppClientIdWeb = adminEvent.request.callerContext.clientId;
    expect(
      isAppClientValid(adminEvent.request.callerContext.clientId, ROLE.Lecture)
    ).toBe(true);
  });
  test("should return false", () => {
    process.env.AppClientIdWeb = adminEvent.request.callerContext.clientId;
    expect(
      isAppClientValid(
        studentsEvent.request.callerContext.clientId,
        ROLE.Lecture
      )
    ).toBe(false);
  });
  test("should return true", () => {
    process.env.AppClientIdWeb = studentsEvent.request.callerContext.clientId;
    expect(
      isAppClientValid(
        studentsEvent.request.callerContext.clientId,
        ROLE.Student
      )
    ).toBe(false);
  });
});
