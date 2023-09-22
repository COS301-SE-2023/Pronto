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

    cy.get("img[alt=Logo]").should("have.length", 1);
    cy.get(`div[class="lecturer-name"]`)
      .should("have.length", 1)
      .contains(this.users.lecturers[0].name + this.users.lecturers[0].surname);
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

  it("asserts nav routing", function () {
    cy.LecturerSignIn(
      this.users.lecturers[0].email,
      this.users.lecturers[0].password
    );

    cy.get(`a[href="${this.navAttributes.EDITPERSONAL.HREF}"]`).click();
    cy.url({ timeout: 10 * 1000 }).should(
      "eq",
      `${Cypress.config().baseUrl + "/" + this.navAttributes.EDITPERSONAL.HREF}`
    );
    cy.go("back");

    cy.get(`a[href="${this.navAttributes.RECENTANNOUNCEMENTS.HREF}"]`).click();
    cy.url({ timeout: 10 * 1000 }).should(
      "eq",
      `${
        Cypress.config().baseUrl +
        "/" +
        this.navAttributes.RECENTANNOUNCEMENTS.HREF
      }`
    );
    cy.go("back");

    cy.get(`a[href="${this.navAttributes.EDITMODULE.HREF}"]`).click();
    cy.url({ timeout: 10 * 1000 }).should(
      "eq",
      `${Cypress.config().baseUrl + this.navAttributes.EDITMODULE.HREF}`
    );
  });
});