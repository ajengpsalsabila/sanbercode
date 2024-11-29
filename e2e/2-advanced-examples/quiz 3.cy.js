describe('Login Functionality - OrangeHRM', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  
    // Test Case 1: Login dengan username dan password valid
    it('TC_001: Pengguna login dengan username dan password benar', () => {
      cy.visit(baseUrl);
      cy.get('[name="username"]').type('Admin'); // Ganti dengan username yang valid
      cy.get('[name="password"]').type('admin123'); // Ganti dengan password yang valid
      cy.get('button[type="submit"]').click();
  
      // Verifikasi hasil
      cy.url().should('include', '/dashboard'); // Pastikan redirect ke halaman dashboard
    });
  
    // Test Case 2: Login dengan password salah
    it('TC_002: Pengguna login dengan password salah', () => {
      cy.visit(baseUrl);
      cy.get('[name="username"]').type('Admin');
      cy.get('[name="password"]').type('salah123'); // Password salah
      cy.get('button[type="submit"]').click();
  
      // Verifikasi hasil
      cy.contains('Invalid credentials').should('be.visible'); // Pesan error muncul
    });
  
    // Test Case 3: Login dengan username yang tidak terdaftar
    it('TC_003: Pengguna login dengan username yang tidak terdaftar', () => {
      cy.visit(baseUrl);
      cy.get('[name="username"]').type('fakeuser'); // Username tidak terdaftar
      cy.get('[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
  
      // Verifikasi hasil
      cy.contains('Invalid credentials').should('be.visible');
    });
  
    // Test Case 4: Tidak mengisi username dan password
    it('TC_004: Pengguna tidak memasukkan username dan password', () => {
      cy.visit(baseUrl);
      cy.get('button[type="submit"]').click();
  
      // Verifikasi hasil
      cy.contains('Required').should('be.visible'); // Pesan error untuk username dan password
    });
  
    // Test Case 5: Tidak mengisi username saja
    it('TC_005: Pengguna tidak memasukkan username', () => {
      cy.visit(baseUrl);
      cy.get('[name="password"]').type('admin123'); // Isi hanya password
      cy.get('button[type="submit"]').click();
  
      // Verifikasi hasil
      cy.contains('Required').should('be.visible'); // Pesan error untuk username
    });
  });
  