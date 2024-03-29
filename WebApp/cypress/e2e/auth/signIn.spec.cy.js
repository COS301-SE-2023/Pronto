describe("Testing sign In", () => {


  /* The test below is responsible for signing in a student, this test uses the incorrect credentials
     and should result in a failed sign in
  */
  it("should not sign in lecturer", function () {
    cy.LecturerSignInFail(
        "randomEmail@gmail.com",
        "randomPassword"
    );
  });

  /* The test below is responsible for signing in a student, this test uses the correct credentials
     and should result in a successful sign in
  */
  it("should sign in lecturer", function () {

    cy.LecturerSignIn(
        "andilengwenya2001@gmail.com",
        Cypress.env("CYPRESS_LECTURER_PASSWORD")
    );
  });
});

