const adminEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json');
const lecturerEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json');
const studentsEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/students.event.json');
const assertInstitutionInfoModule = require('../../../../function/prontoAuthPreConfirmation/src/assertInstitutionInfo');
const preAuthHandler = require('../../../../function/prontoAuthPreConfirmation/src/index');

describe('Input Validation and Error handling', () => {
  test(`should throw "User role not provided on ClientMetadata"`, async () => {
    const eventWithNullRole = {
      request: {
        clientMetadata: {},
      },
    };
    await expect(preAuthHandler.handler(eventWithNullRole)).rejects.toThrow(
      /^User role not provided on ClientMetadata$/,
    );
  });
  test('should throw "Invalid User Role"', async () => {
    const studentEventWithAdminInvalidRole = JSON.parse(JSON.stringify(studentsEvent));
    studentEventWithAdminInvalidRole.request.clientMetadata.role = 'invalidRole';
    await expect(preAuthHandler.handler(studentEventWithAdminInvalidRole)).rejects.toThrow(/Invalid User Role/);
  });
  test('should throw "Unrecognised user pool app client ID"', async () => {
    const studentEventWithAdminInvalidClientId = JSON.parse(JSON.stringify(studentsEvent));
    studentEventWithAdminInvalidClientId.request.callerContext.clientId = 'Invalid';
    console.table(studentEventWithAdminInvalidClientId);
    await expect(preAuthHandler.handler(studentEventWithAdminInvalidClientId)).rejects.toThrow(
      /Unrecognised user pool app client ID/,
    );
  });
  test(`should throw "Cannot authenticate users from this app client: Students Should use the mobile app and Admin/Lectures should use the web app"`, async () => {
    const studentEventWithAdminRole = JSON.parse(JSON.stringify(studentsEvent));
    studentEventWithAdminRole.request.clientMetadata.role = 'Admin';
    await expect(preAuthHandler.handler(studentEventWithAdminRole)).rejects.toThrow(
      'Cannot authenticate users from this app client: Students Should use the mobile app and Admin/Lectures should use the web app',
    );
  });
  test('should throw "API ERROR: Failed to retrieve data for admin role"', async () => {
    await expect(preAuthHandler.handler(adminEvent)).rejects.toThrow(/API ERROR: Failed to retrieve data$/);
  });
  test('should throw "API ERROR: Failed to retrieve data for lecture role"', async () => {
    await expect(preAuthHandler.handler(lecturerEvent)).rejects.toThrow(/API ERROR: Failed to retrieve data$/);
  });
});

describe('testing returned values', () => {
  test('should return event', async () => {
    expect(await preAuthHandler.handler(studentsEvent)).toMatchObject(studentsEvent);
  });
});
