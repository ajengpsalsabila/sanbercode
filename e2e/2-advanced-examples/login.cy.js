/// <reference types="cypress" />

describe('Login Feature', ()=> {
    it('User Login with valid credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('h6').contains("Dashboard").should('have.text','Dashboard');
    })
})