describe("Testing sign In", () => {

  //Make use of the fixture to store the user data and use it in the test
  beforeEach(() => {
    cy.fixture("users.json").as("users");
  });

  /* The test below is responsible for signing in a student, this test uses the incorrect credentials
  and should result in a failed sign in
  */
  it("should not sign in lecturer", function () {
    cy.LecturerSignInFail(
      this.users.lecturers[0].email,
        process.env.LECTURER_PASSWORD
    );
  });


  /* The test below is responsible for signing in a student, this test uses the correct credentials
 and should result in a successful sign in
 */
  it("should sign in lecturer", function () {
    cy.LecturerSignIn(
        this.users.lecturers[1].email,
        "October01!"
    );
  });
});
