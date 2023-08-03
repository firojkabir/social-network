describe('Login and redirect to newsfeed', () => {
  it('Visits login page', () => {
    cy.visit('/');
    cy.contains('Login');
    cy.url().should('include', '/login');

    cy.get('#email').type('batman@gmail.com');
    cy.get('#password').type('asd123');
    cy.get('#login').click();

    cy.contains('Newsfeed');
    cy.url().should('include', '/posts');
  });
});
