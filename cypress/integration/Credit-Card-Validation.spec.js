// Credit-Card-Validation.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('CreditCardValidation', function(){ 
    beforeEach(function () {
    cy.visit('http://localhost:4200/')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'CreditCardValidation')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#numero-cartao').type('5502 3456 3204 3444')
        cy.get('#nome-cartao').type('PEDRO GAMA')
        cy.get('#validade-cartao').type('0232')
        cy.get('#codigo-seguranca').type('923')
        cy.get('#next-button').click()
        cy.get('#logradouro').type('Rua Safira, 77')
        cy.get('#bairro').type('Padre Eustáquio')
        cy.get('#municipio').type('Itaúna')
        cy.get('#estado').type('MG')
        cy.get('#second-next-button').click()
        cy.get('#success').should('be.visible')
    }) 
})