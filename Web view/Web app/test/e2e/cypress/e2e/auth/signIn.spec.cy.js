import users from "../../fixtures/users.json";

describe("Testing sign In", () => {
  it("should sign in lecturer", () => {
    cy.signIn(users[0].email, users[0].password);
  });
});
