describe('Login Functionality with Intercept - OrangeHRM', () => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const validUsername = 'Admin';
    const validPassword = 'admin123';
    const invalidPassword = 'wrongpassword';
    const unregisteredUsername = 'fakeuser';
  
    beforeEach(() => {
      cy.visit(url); // Mengakses halaman login
  
      // Intercept untuk login API
      cy.intercept('POST', '**/auth/login').as('loginRequest');
    });
  
    it("TC01: Should login with valid username and password", () => {
      cy.get('[name="username"]').type(validUsername); // Input username valid
      cy.get('[name="password"]').type(validPassword); // Input password valid
  
      // Intercept untuk endpoint tambahan setelah login berhasil
      cy.intercept('GET', '**/action-summary').as('actionSummary');
      cy.intercept('GET', '**/time-at-work*').as('timeAtWork');
  
      cy.get('[type="submit"]').click(); // Klik tombol login
  
      // Tunggu request selesai dan validasi responsnya
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
      cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
      cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200);
  
      // Validasi berhasil login
      cy.get('h6').contains('Dashboard').should('have.text', 'Dashboard');
    });
  
    it('TC_002: Pengguna login dengan password salah', () => {
      cy.get('[name="username"]').type(validUsername); // Mengisi username
      cy.get('[name="password"]').type(invalidPassword); // Mengisi password salah
      cy.get('button[type="submit"]').click(); // Klik tombol login
  
      // Tunggu request API dan pastikan respons gagal (401)
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(401); // Validasi status kode respons
      });
  
      // Validasi pesan error muncul
      cy.contains('Invalid credentials').should('be.visible');
    });
  
    it('TC_003: Pengguna login dengan username tidak terdaftar', () => {
      cy.get('[name="username"]').type(unregisteredUsername); // Mengisi username tidak terdaftar
      cy.get('[name="password"]').type(validPassword); // Mengisi password
      cy.get('button[type="submit"]').click(); // Klik tombol login
  
      // Tunggu request API dan pastikan respons gagal (401)
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(401); // Validasi status kode respons
      });
  
      // Validasi pesan error muncul
      cy.contains('Invalid credentials').should('be.visible');
    });
  
    it('TC_004: Pengguna login dengan field username kosong', () => {
      cy.get('[name="password"]').type(validPassword); // Mengisi password saja
      cy.get('button[type="submit"]').click(); // Klik tombol login
  
      // Pastikan tidak ada request API yang dilakukan
      cy.get('.oxd-input-group__message').should('contain', 'Required'); // Validasi pesan error pada username
    });
  
    it('TC_005: Pengguna login dengan field password kosong', () => {
      cy.get('[name="username"]').type(validUsername); // Mengisi username saja
      cy.get('button[type="submit"]').click(); // Klik tombol login
  
      // Pastikan tidak ada request API yang dilakukan
      cy.get('.oxd-input-group__message').should('contain', 'Required'); // Validasi pesan error pada password
    });
  });
  