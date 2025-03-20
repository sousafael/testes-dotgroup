/// <reference types="cypress" />
import 'cypress-real-events/support';
import 'cypress-xpath';

// Comando para carregar testData corretamente
Cypress.Commands.add('loadTestData', function () {
    return cy.readFile('cypress/fixtures/testData.json', { timeout: 2000, failOnError: false })
        .then((data) => {
            if (data) {
                cy.wrap(data).as('testData'); 
            } else {
                cy.log('⚠️ testData.json não encontrado, carregando testData.example.json');
                return cy.fixture('testData.example.json').then((fallbackData) => {
                    cy.wrap(fallbackData).as('testData'); 
                });
            }
        });
});

// Comando para validar a presença do logo da empresa
Cypress.Commands.add('validateLogo', () => {
    cy.get('@testData').then((data) => {
        cy.get(`img[alt="${data.logoAlt}"]`, { timeout: 8000 })
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
    });
});

// Comando para validar acessibilidade das imagens
Cypress.Commands.add('validateAccessibilityImages', () => {
    cy.get('img').each(($img) => {
        cy.wrap($img)
            .should('have.attr', 'alt')
            .and('not.be.empty');
    });
});

// Comando para navegar até uma página via menu
Cypress.Commands.add('navigateTo', (menuItem) => {
    cy.get('@testData').then((data) => {
        const expectedUrl = data[menuItem];
        const validationText = data.textoSobre;

        cy.get(`nav.fusion-main-menu a[href="${expectedUrl}"]`, { timeout: 8000 })
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.log(`Clicou no menu para acessar: ${expectedUrl}`);

        cy.location('href', { timeout: 10000 }).should('eq', expectedUrl);
        cy.contains(validationText, { timeout: 10000 }).should('be.visible');

        cy.log(`Página ${expectedUrl} carregada corretamente!`);
    });
});