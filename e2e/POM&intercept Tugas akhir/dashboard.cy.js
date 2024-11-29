describe('OrangeHRM Tests - Dashboard', () => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const validUsername = 'Admin';
    const validPassword = 'admin123';
  
    beforeEach(() => {
      cy.visit(url); // Mengakses halaman login sebelum setiap pengujian
    });
  
    // Page Objects
    const elements = {
      // Login
      usernameField: () => cy.get('[name="username"]'),
      passwordField: () => cy.get('[name="password"]'),
      submitButton: () => cy.get('[type="submit"]'),
      dashboardTitle: () => cy.get('h6').contains('Dashboard'),
      dashboardMenu: () => cy.contains('Dashboard'),
      quickLaunchSection: () => cy.get('.orangehrm-quick-launch'),
      timeAtWork: () => cy.get('.time-at-work'),
    };
  
    it('TC04: Should display dashboard components after login', () => {
      // Intercepting API requests for dashboard and time-at-work
      cy.intercept('GET', '**/auth/*').as('actionSummary'); // Menangkap semua request yang ke URL yang sesuai
      cy.intercept('GET', '**/auth/time-at-work*').as('timeAtWork'); // Intercept URL untuk time-at-work
  
      // Mengisi field login
      elements.usernameField().type(validUsername);
      elements.passwordField().type(validPassword);
      elements.submitButton().click();
  
      // Menunggu request actionSummary dan memverifikasi responsnya
      cy.wait('@actionSummary', { timeout: 15000 }).then((interception) => {
        console.log('Intercepted action-summary request:');
        console.log('Request URL:', interception.request.url); // Log URL request
        console.log('Request Body:', interception.request.body); // Log data request
        console.log('Response Status Code:', interception.response.statusCode); // Log status code dari respons
        console.log('Response Body:', interception.response.body); // Log body respons
        expect(interception.response.statusCode).to.eq(200); // Pastikan status code 200
      });
  
      // Menunggu request timeAtWork dan memverifikasi responsnya
      cy.wait('@timeAtWork', { timeout: 15000 }).then((interception) => {
        console.log('Intercepted time-at-work request:');
        console.log('Request URL:', interception.request.url); // Log URL request
        console.log('Request Body:', interception.request.body); // Log data request
        console.log('Response Status Code:', interception.response.statusCode); // Log status code dari respons
        console.log('Response Body:', interception.response.body); // Log body respons
        expect(interception.response.statusCode).to.eq(200); // Pastikan status code 200
      });
  
      // Validasi apakah elemen-elemen dashboard ada
      elements.dashboardMenu().should('be.visible').and('contain', 'Dashboard'); // Memeriksa menu dashboard
      elements.quickLaunchSection().should('exist'); // Memeriksa apakah bagian Quick Launch ada
      elements.timeAtWork().should('exist'); // Memeriksa apakah bagian Time at Work ada
    });
  
    it('TC05: Should show error for invalid login credentials', () => {
      elements.usernameField().type('InvalidUsername'); // Username salah
      elements.passwordField().type('InvalidPassword'); // Password salah
      elements.submitButton().click();
  
      // Memeriksa error message
      cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
    });
  });
  