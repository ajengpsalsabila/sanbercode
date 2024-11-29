describe('OrangeHRM Tests - Login, Forgot Password, Dashboard', () => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const validUsername = 'Admin';
    const validPassword = 'admin123';
    const invalidPassword = 'wrongpassword';
  
    beforeEach(() => {
      cy.visit(url); // Mengakses halaman login sebelum setiap pengujian
    });
  
    // Page Objects
    const elements = {
      // Login
      usernameField: () => cy.get('[name="username"]'),
      passwordField: () => cy.get('[name="password"]'),
      submitButton: () => cy.get('[type="submit"]'),
      errorMessage: () => cy.get('.oxd-alert-content'),
      dashboardTitle: () => cy.get('h6').contains('Dashboard'),
      // Forgot Password
      forgotPasswordLink: () => cy.contains('Forgot your password?'),
      resetPasswordUsernameField: () => cy.get('[name="username"]'),
      resetButton: () => cy.contains('Reset Password'),
      successMessage: () => cy.contains('Reset Password link sent successfully'),
      // Dashboard
      dashboardMenu: () => cy.contains('Dashboard'),
      quickLaunchSection: () => cy.get('.orangehrm-quick-launch'),
      timeAtWork: () => cy.get('.time-at-work'),
    };
  
    // Test Cases
  
    it('TC01: Should login with valid credentials', () => {
      cy.intercept('GET', '**/time-at-work*').as('timeAtWork');
      elements.usernameField().type(validUsername);
      elements.passwordField().type(validPassword);
      elements.submitButton().click();
  
      cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200);
      elements.dashboardTitle().should('have.text', 'Dashboard');
    });
  
    it('TC02: Should show error with invalid credentials', () => {
      elements.usernameField().type(validUsername);
      elements.passwordField().type(invalidPassword);
      elements.submitButton().click();
  
      elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials');
    });
      
      it('TC05: Should show error for empty username or password', () => {
        elements.passwordField().type(validPassword); // Only fill password
        elements.submitButton().click();
    
        cy.get('.oxd-input-group__message').should('contain', 'Required'); // Username error
    
        cy.reload();
    
        elements.usernameField().type(validUsername); // Only fill username
        elements.submitButton().click();
    
        cy.get('.oxd-input-group__message').should('contain', 'Required'); // Password error
      });
    });