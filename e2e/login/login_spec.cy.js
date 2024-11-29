import LoginPage from './login_page.cy';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  it('should login successfully with valid credentials', () => {
    loginPage.visit();
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('admin123');
    loginPage.clickLogin();

    // Verify successful login (e.g., check URL or element)
    cy.url().should('include', '/dashboard');
  });

  it('should show an error message with invalid credentials', () => {
    loginPage.visit();
    loginPage.enterUsername('InvalidUser');
    loginPage.enterPassword('InvalidPass');
    loginPage.clickLogin();

    // Verify error message
    loginPage.getErrorMessage().should('have.text', 'Invalid credentials');
  });
});
