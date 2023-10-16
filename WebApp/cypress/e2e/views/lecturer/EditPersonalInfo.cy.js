describe("Lecturer - Edit Personal Info", () => {



    //Test to make sure that all the elements are present
    it("should display all the elements", () => {
        cy.LecturerSignIn("andilengwenya2001@gmail.com", Cypress.env('LECTURER_PASSWORD'));
        cy.visit("/lecturer/personal-info");
        cy.wait(10000);
        //Check that the header is present
        cy.get(`h1[class="moduleHead"]`).contains("Personal Information");

        //Check that the paragraph description is present
        cy.get(`p`).contains("This page allows you to edit the information we have stored for you. Click on a dropdown to get started!");

        //Check that the image is present
        cy.get(`img[alt="ModulesImage"]`).should("exist");


    });

});