const {
  createModuleSegmentName,
  createModuleSegmentCommandInput,
} = require("../../../../../function/updateCourseResources/src/helpers/createModuleSegment");

const institutionName = "University OF Pretoria";
const moduleCode = "COS301";

describe("Testing helper functions", () => {
  test("testing createModuleSegmentName", () => {
    const formattedInstitutionName = institutionName
      .toLowerCase()
      .replaceAll(" ", "+");
    const formattedModuleCode = moduleCode.toLowerCase().replaceAll(" ", "+");
    const expectedModuleSegmentName =
      formattedInstitutionName +
      ":" +
      formattedModuleCode +
      ":notifications:segment";
    const receivedModuleSegmentName = createModuleSegmentName(
      institutionName,
      moduleCode
    );
    expect(receivedModuleSegmentName).toEqual(expectedModuleSegmentName);
  });
  test("testing createModuleSegmentCommandInput", () => {
    const expectedSegmentCommandInput = {
      WriteSegmentRequest: {
        Name: createModuleSegmentName(institutionName, moduleCode),
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
    const receivedSegmentCommandInput = createModuleSegmentCommandInput(
      institutionName,
      moduleCode
    );
    expect(receivedSegmentCommandInput).toEqual(expectedSegmentCommandInput);
  });
});
