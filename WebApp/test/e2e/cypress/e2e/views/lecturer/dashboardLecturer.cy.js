describe("Testing lecturer home page", () => {


    beforeEach(() => {
        cy.fixture("lecture.view.nav.attributes.json").as("navAttributes");

    });

    it("asserts nav bar structure", function () {
        cy.LecturerSignIn("yovab14312@tenjb.com", Cypress.env('LECTURER_PASSWORD'))
        cy.fixture("lecture.view.nav.attributes.json").as("navAttributes");
        // Check that the name of the lecturer is displayed
        cy.get(`div[class="lecturer-name"]`)
            .should("have.length", 1)
            .contains("Human" + " Person");

        // Check that all the navigation bar elements are present and have the correct text
        cy.get(`a`).should("have.length", 4);
        cy.get(`a[href="${this.navAttributes.EDITPERSONAL.HREF}"]`)
            .should("have.length", 1)
            .children()
            .contains(this.navAttributes.EDITPERSONAL.LABEL);
       /* cy.get(`a[href="${this.navAttributes.RECENTANNOUNCEMENTS.HREF}"]`)
            .should("have length", 1)
            .children()
            .contains(this.navAttributes.RECENTANNOUNCEMENTS.LABEL);
        cy.get(`a[href="${this.navAttributes.EDITMODULE.HREF}"]`)
            .should("have length", 1)
            .children()
            .contains(this.navAttributes.EDITMODULE.LABEL);
        cy.get(`a[href="${this.navAttributes.DASHBOARD.HREF}"]`)
            .should("have length", 1)
            .children()
            .contains(this.navAttributes.DASHBOARD.LABEL);*/

        // Check that the logout button is present and has the correct text
        cy.get('[data-testid="LogoutButton"]')
            .then(($btn) => {
                cy.wrap($btn).should('be.visible').and('be.enabled')
            });
    });

    it("check that all the images are displayed on the dashboard", function () {
        cy.LecturerSignIn("yovab14312@tenjb.com", Cypress.env('LECTURER_PASSWORD'))
        // Get All the images on the page
        cy.get('img[alt="Edit Module Info"]').should('have.length', 1);
        cy.get('img[alt="Announcements"]').should('have.length', 1);
        cy.get('img[alt="PersonalInfp"]').should('have.length', 1);
    });

    it("asserts nav routing", function () {
        cy.LecturerSignIn("yovab14312@tenjb.com", Cypress.env('LECTURER_PASSWORD'))
        cy.LecturerSignIn("yovab14312@tenjb.com", Cypress.env('LECTURER_PASSWORD'))
        cy.get(`a[href="${this.navAttributes.EDITPERSONAL.HREF}"]`).click();
        cy.url({ timeout: 10 * 1000 }).should("eq", `${Cypress.config().baseUrl}lecturer/personal-info`);
        cy.go("back");

        cy.get(`a[href="${this.navAttributes.RECENTANNOUNCEMENTS.HREF}"]`).click();
        cy.url({ timeout: 10 * 1000 }).should("eq", `${Cypress.config().baseUrl}lecturer/announcement`);
        cy.go("back");

        cy.get(`a[href="${this.navAttributes.EDITMODULE.HREF}"]`).click();
        cy.url({ timeout: 10 * 1000 }).should("eq", `${Cypress.config().baseUrl}lecturer/modules`);
        cy.go("back");

        cy.get(`a[href="${this.navAttributes.DASHBOARD.HREF}"]`).click();
        cy.url({ timeout: 10 * 1000 }).should("eq", `${Cypress.config().baseUrl}lecturer/dashboard`);
        cy.go("back");
    });
});
