describe("Testing lecturer home page", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.fixture("lecture.view.nav.attributes.json").as("navAttributes");
    cy.visit("/lecture-homepage");
  });

  it("asserts nav bar structure", function () {
    cy.LecturerSignIn(
      this.users.lecturers[0].email,
      this.users.lecturers[0].password
    );
    cy.get(`a[class="nav-link"]`).should("have.length", 3);
    cy.get(`a[href="${this.navAttributes.EDITPERSONAL.HREF}"]`)
      .should("have.length", 1)
      .children()
      .contains(this.navAttributes.EDITPERSONAL.LABEL);
    cy.get(`a[href="${this.navAttributes.RECENTANNOUNCEMENTS.HREF}"]`)
      .should("have.length", 1)
      .children()
      .contains(this.navAttributes.RECENTANNOUNCEMENTS.LABEL);
    cy.get(`a[href="${this.navAttributes.EDITMODULE.HREF}"]`)
      .should("have.length", 1)
      .children()
      .contains(this.navAttributes.EDITMODULE.LABEL);
  });

});
