const { describe } = require('node:test');
const addToGroup = require('../add-to-group');
const adminEvent = require('../events/admin.event.json');
const lecturerEvent = require('../events/lecturers.event.json');
const studentsEvent = require('../events/students.event.json');

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
        callerContext: {
          clientMetadata: {},
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullRole)).rejects.toThrow('User role not provided on clientMetadata');
  });
  test(`Should throw Error('ClientId not provided on callerContext'`, async () => {
    const requestWithNullclientId = {
      request: {
        callerContext: {
          clientMetadata: {
            role: ' ',
          },
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
          clientMetadata: {
            role: 'InvalidRole',
          },
        },
      },
    };
    await expect(addToGroup.handler(requestWithInvalidRole)).rejects.toThrow(/^Invalid User Role$/);
  });
  test(`Should throw Error('Unrecognised user pool app client ID='`, async () => {
    const requestWithNullclientId = {
      request: {
        callerContext: {
          clientMetadata: {
            role: 'Lecture',
          },
          clientId: 'UnrecognisedId',
        },
      },
    };
    await expect(addToGroup.handler(requestWithNullclientId)).rejects.toThrow(/Unrecognised user pool app client ID=/);
  });

  test(`Should throw Error('Failed to get User Group with userGroupName...`, async () => {
    process.env.AdminGroupName = null;
    process.env.AppClientIdWeb = adminEvent.request.callerContext.clientId;
    await expect(addToGroup.handler(adminEvent)).rejects.toThrow(/Failed to get User Group with userGroupName/);
  });
});
describe('add to group', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  test(`Should add admin to group`, async () => {
    const mockAddToGroupHandler = jest.fn(addToGroup.handler).mockResolvedValue(adminEvent);
    expect(await mockAddToGroupHandler(adminEvent)).toMatchObject(adminEvent);
  });

  test(`Should add student to group`, async () => {
    const mockAddToGroupHandler = jest.fn(addToGroup.handler).mockResolvedValue(studentsEvent);
    expect(await mockAddToGroupHandler(studentsEvent)).toMatchObject(studentsEvent);
  });
  test(`Should add lecturer to group`, async () => {
    const mockAddToGroupHandler = jest.fn(addToGroup.handler).mockResolvedValue(lecturerEvent);
    expect(await mockAddToGroupHandler(lecturerEvent)).toMatchObject(lecturerEvent);
  });
});
