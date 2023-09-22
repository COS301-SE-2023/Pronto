let courseEnrollments;

const getEndPointsByCourseId = async (courseId) => {
  if (!courseId)
    throw new Error(`Invalid courseId Id: courseId = ${institutionId}`);
  if (
    courseEnrollments &&
    courseEnrollments.enrollments.items.courseId == institutionId
  )
    return courseEnrollments;
  const getEndPointsByCourseIdQuery = /* GraphQL */ `
      query getCourse {
        getCourse(id: $input) {
          enrollments() {
            items {
              student {
                preference {
                  endPointAddress
                  type
                }
              }
            courseId
            }
          }
        }
      }
    `;
  const variables = {
    input: courseId,
  };
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ getEndPointsByCourseIdQuery, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  try {
    const response = await fetch(request);
    const body = await response.json();
    console.debug(`graphQL Resonse: ${JSON.stringify(body)}`);
    if (body.data) return (institution.details = body.data.getCourse);
    throw new Error("API ERROR: Failed to retrieve data");
  } catch (getAndSetEndPointsByCourseIdError) {
    console.debug(getAndSetEndPointsByCourseIdError);
    throw new Error(`Failed To retrieve institution details.`);
  }
};

const getEndPointAddresses = async (courseId) => {
  const enrollments = await getEndPointsByCourseId(courseId);
  return enrollments.map((items) => ({
    [items.student.preference.endPointAddress]: {
      ChannelType: items.student.preference.endPointAddress.type,
    },
  }));
};

module.exports = { getEndPointAddresses };
