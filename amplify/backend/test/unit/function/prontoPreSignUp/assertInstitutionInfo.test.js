const {
  isLectureEmailPartOfInstitution,
  isAdminAllocated,
  isStudentEmailDomainPartOfInstitution,
  getAndSetInstitutionDetails,
  getLectureEmailsFromInstitution,
  getInstitutionAdminId,
  getInstitutionEmailDomains,
} = require("../../../../function/prontoPreSignUp/src/assertInstitutionInfo");
const institutionDetails = {
  adminId: "someAdminId",
  lectureremails: ["someLecturerEmail1", "someLecturerEmail2"],
  domains: ["tuks.co.za", "up.ac.za"],
};

describe("Input Validation and Error handling", () => {
  test(`should throw "Invalid Institution Id: InstitutionId =  null"`, async () => {
    const nullInstitutionId = null;

    await expect(
      getAndSetInstitutionDetails(nullInstitutionId)
    ).rejects.toThrow(/^Invalid Institution Id: InstitutionId =/);
  });
  test(`should throw "Failed To retrieve institution details"`, async () => {
    global.Request = jest.fn((input, options) => null);
    const someInstitutionId = "someInstitutionId";

    await expect(
      getAndSetInstitutionDetails(someInstitutionId)
    ).rejects.toThrow(/^Failed To retrieve institution details/);
  });
  test(`should throw "Failed to retrieve list for the institution"`, async () => {
    const someInstitutionId = "someInstitutionId";

    await expect(
      getLectureEmailsFromInstitution(someInstitutionId)
    ).rejects.toThrow(/^Failed to retrieve list for the institution/);
  });
  test(`should throw "Failed to retrieve admin for the institution"`, async () => {
    const someInstitutionId = "someInstitutionId";

    await expect(getInstitutionAdminId(someInstitutionId)).rejects.toThrow(
      /Failed to retrieve admin for the institution/
    );
  });
  test(`should throw "Invalid email"`, async () => {
    await expect(isLectureEmailPartOfInstitution(null)).rejects.toThrow(
      /^Invalid email/
    );
  });
  test(`should throw "Failed To retrieve institution details...Failed to retrieve list for the institution"`, async () => {
    const someInstitutionId = "someInstitutionId";
    const someEmail = "someEmail";
    await expect(
      isLectureEmailPartOfInstitution(someEmail, someInstitutionId)
    ).rejects.toThrow(/Failed to retrieve list for the institution/);
  });
  test(`should throw "Failed to retrieve list for the institution"`, async () => {
    const someInstitutionId = "someInstitutionId";

    await expect(
      getLectureEmailsFromInstitution(someInstitutionId)
    ).rejects.toThrow(/^Failed to retrieve list for the institution/);
  });

  test(`should throw "Failed to retrieve admin for the institution...Failed To retrieve institution details" on isAdminAllocated`, async () => {
    const someInstitutionId = "someInstitutionId";
    await expect(isAdminAllocated(someInstitutionId)).rejects.toThrow(
      /Failed to retrieve admin for the institution/
    );
  });
  test(`should throw "Failed to retrieve email domains for the institution."`, async () => {
    const someInstitutionId = "someInstitutionId";
    await expect(getInstitutionEmailDomains(someInstitutionId)).rejects.toThrow(
      /Failed to retrieve email domains for the institution./
    );
  });
  test(`should throw "Failed to retrieve email domains for the institution"`, async () => {
    const someInstitutionId = "someInstitutionId";
    const someEmail = "someEmail";
    await expect(
      isStudentEmailDomainPartOfInstitution(someEmail, someInstitutionId)
    ).rejects.toThrow(/Failed to retrieve email domains for the institution/);
  });
});
describe("Testing GraphQL API Calls", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });
  test("should throw Failed to retrieve list for the institution", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ok: false }),
      })
    );
    const someInstitutionId = "someInstitutionId";
    const someEmail = "someEmail";
    await expect(
      isLectureEmailPartOfInstitution(someEmail, someInstitutionId)
    ).rejects.toThrow(/Failed to retrieve list for the institution./);
  });
  test("should retrieve data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ok: true,
            data: { getInstitution: institutionDetails },
          }),
      })
    );
    const someInstitutionId = "someInstitutionId";
    const someEmail = "someEmail";
    const someStudentEmail = "a@tuks.co.za";
    expect(await isAdminAllocated(someEmail, someInstitutionId)).toBe(true);
    expect(
      await isLectureEmailPartOfInstitution(someEmail, someInstitutionId)
    ).toBe(false);
    expect(
      await isStudentEmailDomainPartOfInstitution(
        someStudentEmail,
        someInstitutionId
      )
    ).toBe(true);
  });
});
