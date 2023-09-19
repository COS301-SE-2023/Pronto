Cypress.Commands.add("LecturerSignInFail", (email, password) => {
  cy.visit("/lecturer/login");

  // asserting UI layout
  cy.get("img[alt=Logo]").should("exist");
  cy.contains("Lecturer Login");
  cy.get("input[type=email]").should("have.length", 2);
  cy.get("input[type=password]").should("have.length", 3);
  cy.get("button[type=submit]").should("have.length", 2);
  cy.get(`a[type="text/html"]`).should("exist");

  cy.contains("No Account?");
  cy.contains("Click here to verify a lecturer account");
  cy.get("button[type=button]").should("exist");

  // asserting input sequence
  cy.get("input[type=email]").eq(1).type(email);
  cy.get("input[type=password]").eq(2).type(`${password}`);
  cy.get("button[type=submit").eq(1).click();

  /*asserting routing
  cy.url({ timeout: 10 * 1000 }).should(
    "eq",
    `${Cypress.config().baseUrl}/lecturer/dashboard`
  );
  cy.contains("Courses");*/
  cy.contains("No Account?");
  cy.contains("Click here to verify a lecturer account");

});


Cypress.Commands.add("LecturerSignIn", (email, password) => {
  cy.visit("/lecturer/login");
console.log(password);
  // asserting UI layout
  cy.get("img[alt=Logo]").should("exist");
  cy.contains("Lecturer Login");
  cy.get("input[type=email]").should("have.length", 2);
  cy.get("input[type=password]").should("have.length", 3);
  cy.get("button[type=submit]").should("have.length", 2);
  cy.get(`a[type="text/html"]`).should("exist");

  cy.contains("No Account?");
  cy.contains("Click here to verify a lecturer account");
  cy.get("button[type=button]").should("exist");

  // asserting input sequence
  cy.get("input[type=email]").eq(1).type(email);
  cy.get("input[type=password]").eq(2).type(`${password}`);
  cy.get("button[type=submit").eq(1).click();


  cy.url({ timeout: 10 * 1000 }).should(
    "eq",
    `${Cypress.config().baseUrl}/lecturer/dashboard`
  );



});
