describe("Testing sign Up", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.fixture("react-select-attributes.json").as("reactSelectAttributes");
    cy.visit("/lecturer-login");
  });

  it("should sign up lecturer", function () {
    cy.LecturerSignUp(this.users.lecturers[0], this.reactSelectAttributes);
  });
});

describe("Testing sign up input and error handling", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    cy.fixture("users.json").as("users");
    cy.fixture("react-select-attributes.json").as("reactSelectAttributes");
    cy.fixture("auth.errors.json").as("authErrors");
    cy.visit("/lecturer-login");
    cy.get("button[type=button]").eq(1).click();
  });

});
