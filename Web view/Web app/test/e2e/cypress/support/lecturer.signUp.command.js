Cypress.Commands.add("LecturerSignUp", (userInput, reactSelectAttributes) => {
  cy.visit("/lecturer-login");

  // asserting UI layout
  cy.get("img[alt=Logo]").should("exist");
  cy.contains("Lecturer Login");
  cy.get("input[type=email]").should("have.length", 2);
  cy.get("input[type=password]").should("have.length", 3);
  cy.get("button[type=submit]").should("have.length", 2);
  cy.get(`a[type="text/html"]`).should("exist");
  cy.get("h1").should("have.length", 3);

  cy.contains("No Account?");
  cy.contains("Click here to verify a lecturer account");
  cy.get(`button:visible:contains("Sign Up")`).should("have.length", 1);

  cy.get("button[type=button]").eq(1).click();

  cy.contains("Have an account");
  cy.contains("Please sign in to access all of Pronto's features");
  cy.get('button:visible:contains("Sign In")').should("have.length", 1);

  cy.contains("Create Lecturer Account");
  cy.get("input[placeholder=Name]").should("have.length", 1);
  cy.get("input[placeholder=Surname]").should("have.length", 1);
  cy.contains(`${reactSelectAttributes.placeholder}`);
  cy.get(`input[class^=${reactSelectAttributes.classNamePrefix}]`).should(
    "have.length",
    1
  );

  // asserting input sequence
  cy.get("input[placeholder=Name").eq(0).type(userInput.name);
  cy.get("input[placeholder=Surname").type(userInput.surname);
  cy.get("input[type=email]").eq(0).type(userInput.email);
  cy.get(`input[class^=${reactSelectAttributes.classNamePrefix}]`).type(
    `${userInput.institutionName}{enter}`
  );
  cy.get("input[type=password]").eq(0).type(userInput.password);
  cy.get("input[type=password]").eq(1).type(userInput.password);
  cy.get("button[type=submit", { timeout: 5 * 1000 })
    .eq(0)
    .click({ force: true });

  //asserting routing
  cy.url({ timeout: 5 * 1000 }).should(
    "eq",
    `${Cypress.config().baseUrl}/lecturer-confirm-email`
  );
});
