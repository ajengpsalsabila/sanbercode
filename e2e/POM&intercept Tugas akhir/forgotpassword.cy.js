describe('OrangeHRM Tests - Forgot Password', () => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const validUsername = 'Admin';
    
    beforeEach(() => {
      cy.visit(url); // Mengakses halaman login sebelum setiap pengujian
    });
  
    // Page Objects
    const elements = {
      // Forgot Password
      forgotPasswordLink: () => cy.contains('Forgot your password?'),
      resetPasswordUsernameField: () => cy.get('[name="username"]'),
      resetButton: () => cy.contains('Reset Password'),
      successMessage: () => cy.contains('Reset Password link sent successfully'),
      errorMessage: () => cy.get('.oxd-alert-content'),
    };
  
    it('TC03: Should reset password for valid username', () => {
      elements.forgotPasswordLink().click(); // Klik link 'Forgot your password?'
      
      // Pastikan URL API untuk reset password sesuai
      cy.intercept('POST', '**/auth/forgotPassword').as('forgotPassword');
      
      // Isi field dengan username yang valid
      elements.resetPasswordUsernameField().type(validUsername);
      
      // Klik tombol reset password
      elements.resetButton().click();
      

      
      // Pastikan pesan sukses muncul setelah reset
      elements.successMessage().should('be.visible').and('contain', 'Reset Password link sent successfully');
    });
  
    it('TC03: Should show error for invalid username', () => {
      elements.forgotPasswordLink().click(); // Klik link 'Forgot your password?'
      
      // Pastikan URL API untuk reset password sesuai
      cy.intercept('POST', '**/auth/forgotPassword').as('forgotPassword');
      
      // Isi field dengan username yang invalid
      elements.resetPasswordUsernameField().type('InvalidUsername');
      
      // Klik tombol reset password
      elements.resetButton().click();
      
      // Tunggu request selesai dan validasi responsnya
      cy.wait('@forgotPassword', { timeout: 10000 }).its('response.statusCode').should('eq', 400); // Atur kode status sesuai error yang diharapkan
      
      // Pastikan pesan error muncul
      elements.errorMessage().should('be.visible').and('contain', 'Invalid username'); // Ganti sesuai pesan error yang diharapkan
    });
  });
  