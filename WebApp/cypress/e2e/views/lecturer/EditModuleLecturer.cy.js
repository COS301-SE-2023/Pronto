describe("Testing lecturer home page", () => {



    it("access the modules page and ensure all renders correctly", function () {
        cy.fixture("lecture-view-nav-attributes.json").as("navAttributes");
        //sign in to start the tests
        cy.LecturerSignIn("andilengwenya2001@gmail.com", Cypress.env('LECTURER_PASSWORD'));

        cy.get(`a[href="/lecturer/modules"]`).click();
        cy.url({timeout: 10 * 1000}).should("eq", `${Cypress.config().baseUrl + 'lecturer/modules'}`);


        //check that the header is present
        cy.get(`h1[class="moduleHead"]`)
            .should("have.length", 1)
            .contains("Courses");

        //Check that the description is present
        cy.get(`p`)
            .should("have.length", 1)
            .contains("This page allows you to manage your registered modules. Click on a module to post reminders, due dates or update lecture venues.");

        //Check that the image is present
        cy.get(`img[alt="ModulesImage"]`)
            .should("exist");

        //Check that the modules belonging to the lecturer are present after loading
        cy.get(`button[class="content-button"]`)
            .should("have.length", 1)
            .contains("COS314");


        cy.get(`button[class="content-button"]`).first().click();

    });

});