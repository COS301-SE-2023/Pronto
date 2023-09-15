describe("testing features", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.visit("/lecture-homepage");
  });

  it("asserts Edit Module Information tab", function () {
    console.table(this.users.lecturers);
    cy.LecturerSignIn(
      this.users.lecturers[2].email,
      this.users.lecturers[2].password
    );
    cy.get(`button[class="content-button"]`, { timeout: 5 * 1000 }).should(
      "have.length",
      3
    );
  });
});
