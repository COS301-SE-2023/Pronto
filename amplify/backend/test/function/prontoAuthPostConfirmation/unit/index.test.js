const studentsEvent = require('../../../../function/prontoAuthPostConfirmation/src/events/students.event.json');
const moduleIterator = require('../../../../function/prontoAuthPostConfirmation/src/index');
const addToGroup = require('../../../../function/prontoAuthPostConfirmation/src/add-to-group');

describe('testing module iterator', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    const mockAddToGroupHandler = jest.fn(addToGroup.handler).mockResolvedValue(studentsEvent);
    jest.mock('../../../../function/prontoAuthPostConfirmation/src/index', () => ({
      handler: mockAddToGroupHandler,
    }));
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });
  test('should return the event', async () => {
    expect(await moduleIterator.handler(studentsEvent)).toMatchObject(studentsEvent);
  });
});
