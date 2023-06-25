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
});
