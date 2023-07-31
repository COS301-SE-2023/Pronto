import { faker } from "@faker-js/faker";

Cypress.Commands.add("createTestUser", function () {
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const email = name + surname + ".Pronto.Test.User.Lecturer@up.ac.za";
  const password = "@" + faker.internet.password({ length: 20 });
  const institutionName = "university of pretoria";
  const user = {
    name: name,
    surname: surname,
    email: email,
    password: password,
    institutionName: institutionName,
  };
  const users = JSON.parse(JSON.stringify(this.users));
  users.lecturers.push(user);
  cy.writeFile("test/e2e/cypress/fixtures/users.json", users);
});
