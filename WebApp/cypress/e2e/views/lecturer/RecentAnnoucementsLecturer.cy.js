describe("Testing Recent Annoucements Lecturer", () => {




    it("should display the recent annoucements", function () {
        //navigate to the recent announcements page without using visit
        cy.LecturerSignIn("andilengwenya2001@gmail.com", Cypress.env('LECTURER_PASSWORD'));
        cy.visit("/lecturer/announcement");

        //Check that the recent announcements is displayed
        cy.contains("Recent Announcements");

        //Check that the recent announcements paragraph is displayed
        cy.contains("This page allows you view the announcents you've made to students on the mobile app. You can delete or sort these announcements.");

        //check that the help button div with class help-icon is present
        cy.get('div[class="help-icon"]').should('have.length', 1);


    });


    //The test below checks that the navigation bar is present and has a logout button
    it("asserts nav bar structure", function () {
        cy.LecturerSignIn("yovab14312@tenjb.com", Cypress.env('LECTURER_PASSWORD'));
        cy.visit("/lecturer/announcement");
        //Check that the duv with classes vertical-navbar and col-4 and p-4 is present and has a Log Out button
        cy.contains("Log Out");
    });
});