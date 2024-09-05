/* eslint-disable no-undef */
describe('Login Form Success', () => {
  it('should submit the form successfully and navigate to success page', () => {
    cy.visit('http://localhost:5173/'); 
    cy.get('input[name="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').check();
    cy.get('button').should('not.be.disabled');
    cy.get('button').click();
    cy.url().should('include', '/success');
    cy.contains('Successfull!');
  });
});

describe('Invalid Email', () => {
  it('should display error message for invalid email and keep the button disabled', () => {
    cy.visit('http://localhost:5173/'); 
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').check();
    cy.get('.invalid-feedback').should('have.length', 1); 
    cy.get('.invalid-feedback').contains('Please enter a valid email address'); 
    cy.get('button').should('be.disabled');
  });
});

describe('Invalid Email and Password', () => {
  it('should display error messages for both email and password and keep the button disabled', () => {
    cy.visit('http://localhost:5173/'); 
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('12345');
    cy.get('input[name="terms"]').check();
    cy.get('.invalid-feedback').should('have.length', 2); 
    cy.get('.invalid-feedback').contains('Please enter a valid email address'); 
    cy.get('.invalid-feedback').contains('Password must be at least 8 characters long'); 
    cy.get('button').should('be.disabled');
  });
});
describe('Terms Not Accepted', () => {
  it('should keep the submit button disabled if terms are not accepted', () => {
    cy.visit('http://localhost:5173/'); 
    cy.get('input[name="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').should('not.be.checked'); 
    cy.get('button').should('be.disabled');
  });
});