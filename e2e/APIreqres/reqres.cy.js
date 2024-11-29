describe('API Testing with Cypress - ReqRes', () => {
    const baseUrl = 'https://reqres.in';

    // Test GET: List Users
    it('GET - List Users', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/api/users?page=2`
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body).to.have.property('page', 2); // Validate page number
            expect(response.body.data).to.be.an('array'); // Validate response is an array
        });
    });

    // Test GET: Single User
    it('GET - Single User', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/api/users/2`
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body.data).to.have.property('id', 2); // Validate user ID
        });
    });

    // Test POST: Create User
    it('POST - Create User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/users`,
            body: {
                name: 'morpheus',
                job: 'leader'
            }
        }).then((response) => {
            expect(response.status).to.eq(201); // Validate status code
            expect(response.body).to.have.property('name', 'morpheus'); // Validate name
            expect(response.body).to.have.property('job', 'leader'); // Validate job
        });
    });

    // Test PUT: Update User
    it('PUT - Update User', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/api/users/2`,
            body: {
                name: 'morpheus',
                job: 'zion resident'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body).to.have.property('job', 'zion resident'); // Validate job
        });
    });

    // Test PATCH: Partial Update User
    it('PATCH - Partial Update User', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/api/users/2`,
            body: {
                job: 'zion leader'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body).to.have.property('job', 'zion leader'); // Validate job
        });
    });

    // Test DELETE: Delete User
    it('DELETE - Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/api/users/2`
        }).then((response) => {
            expect(response.status).to.eq(204); // Validate status code
        });
    });

    // Test POST: Register User
    it('POST - Register User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/register`,
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body).to.have.property('id'); // Validate ID is returned
            expect(response.body).to.have.property('token'); // Validate token is returned
        });
    });

    // Test POST: Login User
    it('POST - Login User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/login`,
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Validate status code
            expect(response.body).to.have.property('token'); // Validate token is returned
        });
    });

    // Test POST: Login User with Invalid Credentials
    it('POST - Login User with Invalid Credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api/login`,
            failOnStatusCode: false, // Allow Cypress to handle failed response
            body: {
                email: 'eve.holt@reqres.in',
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Validate status code
            expect(response.body).to.have.property('error', 'Missing password'); // Validate error message
        });
    });
});
