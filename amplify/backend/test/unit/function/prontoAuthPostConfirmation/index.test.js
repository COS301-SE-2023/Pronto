const studentsEvent = require("../../../../function/prontoAuthPostConfirmation/src/events/students.event.json");
const moduleIterator = require("../../../../function/prontoAuthPostConfirmation/src/index");
const addToGroup = require("../../../../function/prontoAuthPostConfirmation/src/add-to-group");

describe("testing module iterator", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    const mockAddToGroupHandler = jest
      .fn(addToGroup.handler)
      .mockResolvedValue(studentsEvent);
    jest.mock(
      "../../../../function/prontoAuthPostConfirmation/src/index",
      () => ({
        handler: mockAddToGroupHandler,
      })
    );
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });
  test("should throw", async () => {
    await expect(moduleIterator.handler(studentsEvent)).rejects.toThrow(
      /^failed to add user to user group$/
    );
  });
  test("should return the event", async () => {
    const mockmoduleIterator = require("../../../../function/prontoAuthPostConfirmation/src/index");
    expect(await mockmoduleIterator.handler(studentsEvent)).toMatchObject(
      studentsEvent
    );
  });
});
