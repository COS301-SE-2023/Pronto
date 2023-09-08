const {
  createCourseCodeSegmentName,
  createCourseCodeSegmentCommandInput,
} = require("../../../../../function/updateCourseResources/src/helpers/updateCourseResources");

const institutionName = "University OF Pretoria";
const moduleCode = "COS301";

describe("Testing helper functions", () => {
  test("testing createCourseCodeSegmentName", () => {
    const formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");
    const formattedCourseCodeCode = moduleCode
      .toLowerCase()
      .replaceAll(" ", "+");
    const expectedCourseCodeSegmentName =
      formattedInstitutionName +
      ":" +
      formattedCourseCodeCode +
      ":notifications:segment";
    const receivedCourseCodeSegmentName = createCourseCodeSegmentName(
      institutionName,
      moduleCode
    );
    expect(receivedCourseCodeSegmentName).toEqual(
      expectedCourseCodeSegmentName
    );
  });
  test("testing createCourseCodeSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      WriteSegmentRequest: {
        Name: createCourseCodeSegmentName(institutionName, moduleCode),
        SegmentGroups: {
          Groups: [
            {
              Dimensions: [
                {
                  Attributes: {
                    Values: [moduleCode],
                    AttributeType: "INCLUSIVE",
                  },
                  Behavior: {
                    Recency: {
                      Duration: "DAY_30",
                      RecencyType: "ACTIVE",
                    },
                  },
                  Demographic: {
                    Channel: {
                      Values: ["EMAIL"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
                {
                  Attributes: {
                    Values: [moduleCode],
                    AttributeType: "INCLUSIVE",
                  },
                  Behavior: {
                    Recency: {
                      Duration: "DAY_30",
                      RecencyType: "ACTIVE",
                    },
                  },
                  Demographic: {
                    Channel: {
                      Values: ["SMS"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
                {
                  Attributes: {
                    Values: [moduleCode],
                    AttributeType: "INCLUSIVE",
                  },
                  Behavior: {
                    Recency: {
                      Duration: "DAY_30",
                      RecencyType: "ACTIVE",
                    },
                  },
                  Demographic: {
                    Channel: {
                      Values: ["PUSH"],
                      DimensionType: "INCLUSIVE",
                    },
                  },
                },
              ],
              Type: "ANY",
            },
          ],
          Include: "ANY",
        },
      },
    };
    const receivedSegmentCommandInput = createCourseCodeSegmentCommandInput(
      institutionName,
      moduleCode
    );
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
});
