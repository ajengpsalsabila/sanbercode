class LoginPage {
    visit() {
      cy.visit('https://opensource-demo.orangehrmlive.com/');
    }
  
    enterUsername(username) {
      cy.get('#txtUsername').type(username);
    }
  
    enterPassword(password) {
      cy.get('#txtPassword').type(password);
    }
  
    clickLogin() {
      cy.get('#btnLogin').click();
    }
  
    getErrorMessage() {
      return cy.get('#spanMessage');
    }
  }
  
  export default LoginPage;
  