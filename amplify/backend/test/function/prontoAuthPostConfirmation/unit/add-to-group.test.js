const addToGroup = require('../../../../function/prontoAuthPostConfirmation/src/add-to-group');
const adminEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/admin.event.json');
const lecturerEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/lecturers.event.json');
const studentsEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/students.event.json');

describe('input validation', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test(`Should throw Error('User role not provided on clientMetadata'`, async () => {
    const requestWithNullRole = {
      request: {
        callerContext: {},
        clientMetadata: {},
      },
    };
    await expect(addToGroup.handler(requestWithNullRole)).rejects.toThrow('User role not provided on clientMetadata');
  });
  test(`Should throw Error('ClientId not provided on callerContext'`, async () => {
    const requestWithNullclientId = {
      request: {
        callerContext: {},
        clientMetadata: {
          role: ' ',
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullclientId)).rejects.toThrow(
      /^ClientId not provided on callerContext$/,
    );
  });
  test(`Should throw Error('Invalid User Role'`, async () => {
    const requestWithInvalidRole = {
      request: {
        callerContext: {
          clientId: 'aClientId',
        },
        clientMetadata: {
          role: 'InvalidRole',
        },
      },
    };
    await expect(addToGroup.handler(requestWithInvalidRole)).rejects.toThrow(/^Invalid User Role$/);
  });
  test(`Should throw Error('Unrecognised user pool app client ID='`, async () => {
    const requestWithNullclientId = {
      request: {
        callerContext: {
          clientId: 'UnrecognisedId',
        },
        clientMetadata: {
          role: 'Lecture',
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullclientId)).rejects.toThrow(/Unrecognised user pool app client ID=/);
  });

  test(`Should throw Error('Failed to get User Group with userGroupName...for admin`, async () => {
    process.env.AdminGroupName = null;
    process.env.AppClientIdWeb = adminEvent.request.callerContext.clientId;
    await expect(addToGroup.handler(adminEvent)).rejects.toThrow(/Failed to get User Group with userGroupName/);
  });
});
test(`Should throw Error('Failed to get User Group with userGroupName...for students`, async () => {
  process.env.StudentsGroupName = null;
  process.env.AppClientId = studentsEvent.request.callerContext.clientId;
  await expect(addToGroup.handler(studentsEvent)).rejects.toThrow(/Failed to get User Group with userGroupName/);
});
test(`Should throw Error('Failed to get User Group with userGroupName...for lecturers`, async () => {
  process.env.LecturersGroupName = null;
  process.env.AppClientIdWeb = lecturerEvent.request.callerContext.clientId;
  await expect(addToGroup.handler(lecturerEvent)).rejects.toThrow(/Failed to get User Group with userGroupName/);
});
