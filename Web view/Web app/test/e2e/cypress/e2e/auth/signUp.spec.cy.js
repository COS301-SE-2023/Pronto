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

  it(`should test if lecturer email is part of institution`, function () {
    cy.createTestUser();
    cy.get("button[type=button]").eq(1).click();

    const lectureTestUser = this.users.lecturers.pop();
    cy.get("input[placeholder=Name").eq(0).type(lectureTestUser.name);
    cy.get("input[placeholder=Surname").type(lectureTestUser.surname);
    cy.get("input[type=email]").eq(0).type(lectureTestUser.email);
    cy.get(`input[class^=${this.reactSelectAttributes.classNamePrefix}]`).type(
      `${lectureTestUser.institutionName}{enter}`
    );
    cy.get("input[type=password]").eq(0).type(lectureTestUser.password);
    cy.get("input[type=password]").eq(1).type(lectureTestUser.password);
    cy.get("button[type=submit").eq(0).click({ force: true });

    //assert error message
    cy.xpath('//*[@id="root"]/div[2]/div/div[1]/form/p', {
      timeout: 5 * 1000,
    }).should("exist");
    cy.contains(this.authErrors.LECTUEREREMAILERROR);
  });
});
