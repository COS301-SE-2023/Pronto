describe("Testing lecturer home page", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    cy.visit("/lecture-homepage");
  });

  it("asserts nav bar structure and routing", function () {
    cy.get(`a[class="nav-link]`).should("have.length", 3);
  });
});
