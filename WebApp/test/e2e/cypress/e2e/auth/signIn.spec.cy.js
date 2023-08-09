describe("Testing sign In", () => {
  beforeEach(() => {
    cy.fixture("users.json").as("users");
  });

  it("should sign in lecturer", function () {
    cy.LecturerSignIn(
      this.users.lecturers[0].email,
      this.users.lecturers[0].password
    );
  });
});
