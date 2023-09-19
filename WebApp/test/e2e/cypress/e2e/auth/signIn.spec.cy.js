describe("Testing sign In", () => {
  // Load the environment variable for users.json data
  const usersJson = Cypress.env('E2E_USERS_JSON');

  // Check if the environment variable is set
  if (!usersJson) {
    throw new Error("E2E_USERS_JSON environment variable is not set.");
  }

  const users = JSON.parse(usersJson);

  /* The test below is responsible for signing in a student, this test uses the incorrect credentials
     and should result in a failed sign in
  */
  it("should not sign in lecturer", function () {
    cy.LecturerSignInFail(
        users.lecturers[0].email,
        users.lecturers[1].password
    );
  });

  /* The test below is responsible for signing in a student, this test uses the correct credentials
     and should result in a successful sign in
  */
  it("should sign in lecturer", function () {
    cy.LecturerSignIn(
        users.lecturers[1].email,
        users.lecturers[1].password
    );
  });
});

