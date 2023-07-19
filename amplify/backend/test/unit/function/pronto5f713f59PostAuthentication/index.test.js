const studentsEvent = require("../../../../function/pronto5f713f59PostAuthentication/src/events/students.event.json");
const moduleIterator = require("../../../../function/pronto5f713f59PostAuthentication/src/index");
const addToGroup = require("../../../../function/pronto5f713f59PostAuthentication/src/add-to-group");

describe("testing module iterator", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    const mockAddToGroupHandler = jest
      .fn(addToGroup.handler)
      .mockResolvedValue(studentsEvent);
    jest.mock(
      "../../../../function/pronto5f713f59PostAuthentication/src/index",
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
      /^Failed to get User Group with userGroupName/
    );
  });
  test("should return the event", async () => {
    const mockmoduleIterator = require("../../../../function/pronto5f713f59PostAuthentication/src/index");
    expect(await mockmoduleIterator.handler(studentsEvent)).toMatchObject(
      studentsEvent
    );
  });
});
