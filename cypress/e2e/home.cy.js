/// <reference types="cypress-xpath" />

describe('Validações Gerais do Site - DOT Digital Group', () => {
    
  beforeEach(function () {
      cy.loadTestData(); // Garante que os dados são carregados

      // Espera pelo alias e salva no contexto do teste
      cy.get('@testData').then((data) => {
          this.testData = data;
      });

      cy.viewport(1280, 800);

      // Ignora erros não críticos do site
      Cypress.on('uncaught:exception', (err, runnable) => {
          if (err.message.includes('waypoint is not a function')) {
              return false; // Ignora o erro e continua os testes
          }
          return true;
      });
  });

  it('CT01 - Deve garantir que a página inicial carregue corretamente', function () {
      cy.visit(this.testData.site);
      cy.title().should('include', 'Educação Corporativa Digital - Edtech • DOT Digital Group');

      cy.get(`img[alt="${this.testData.logoAlt}"]`, { timeout: 8000 })
          .should('be.visible')
          .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
          });

      cy.log('O logo da empresa foi validado!');
  });

  it('CT02 - Deve validar acessibilidade das imagens', () => {
    // Aguarda dinamicamente até que qualquer elemento <img> esteja presente no DOM
    cy.get('body').then(($body) => {
        if ($body.find('img').length > 0) {
            cy.get('img', { timeout: 10000 }) // limite de tempo para garantir o carregamento
                .should('exist')
                .should('be.visible')
                .each(($img) => {
                    cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
                });

            cy.log('Todas as imagens possuem atributo ALT válido!');
        } else {
            cy.log('Nenhuma imagem <img> encontrada, pode ser carregada como background ou dentro de iframe.');
        }
    });
});

  it('CT03 - Deve navegar para a página "Sobre" ao clicar no menu e validar o conteúdo', function () {
      cy.visit(this.testData.site);
      cy.get('nav.fusion-main-menu', { timeout: 8000 }).should('be.visible');

      cy.get(`nav.fusion-main-menu a[href="${this.testData.menuSobre}"]`, { timeout: 8000 })
          .first()
          .should('be.visible')
          .click({ force: true });

      cy.log('Clique no menu "Sobre" realizado com sucesso!');

      cy.location('href', { timeout: 10000 }).should('eq', this.testData.menuSobre);
      cy.contains(this.testData.textoSobre, { timeout: 10000 }).should('be.visible');

      cy.log('Página "Sobre" carregada corretamente!');
  });
});
