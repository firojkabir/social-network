describe('Register page to create new user', () => {
  it('Visits register page', () => {
    cy.visit('/register');
    cy.contains('Register user');

    cy.get('#name').type('Stokes');
    cy.get('#email').type('stokes@gmail.com');
    cy.get('#password').type('asd123');
    cy.get('#confirm-password').type('asd123');
    cy.get('#age').type('23');
    cy.get('#country').type('US');
    // cy.contains('Invalid email address.');
    cy.get('#signup').click();

    cy.contains('Login');
    cy.url().should('include', '/login');
  });
});
