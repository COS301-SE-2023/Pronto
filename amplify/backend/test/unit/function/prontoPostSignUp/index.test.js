const studentsEvent = require("../../../../function/prontoPostSignUp/src/events/students.event.json");
const moduleIterator = require("../../../../function/prontoPostSignUp/src/index");
const addToGroup = require("../../../../function/prontoPostSignUp/src/add-to-group");

describe("testing module iterator", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    const mockAddToGroupHandler = jest
      .fn(addToGroup.handler)
      .mockResolvedValue(studentsEvent);
    jest.mock("../../../../function/prontoPostSignUp/src/index", () => ({
      handler: mockAddToGroupHandler,
    }));
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });
  test("should throw", async () => {
    await expect(moduleIterator.handler(studentsEvent)).rejects.toThrow(
      /^Failed to get User Group with userGroupName/
    );
  });
  test("should return the event", async () => {
    const mockmoduleIterator = require("../../../../function/prontoPostSignUp/src/index");
    expect(await mockmoduleIterator.handler(studentsEvent)).toMatchObject(
      studentsEvent
    );
  });
});
