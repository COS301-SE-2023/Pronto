describe("Testing sign In", () => {
  // Load the environment variable for users.json data
  const lecturerPassword= Cypress.env('LECTURER_PASSWORD');

  // Check if the environment variable is set
  if (!lecturerPassword) {
    throw new Error("The lecturers password environment variable is not set.");
  }


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
        lecturerPassword
    );
  });
});

