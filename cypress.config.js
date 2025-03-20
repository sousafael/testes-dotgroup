const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dotgroup.com.br',
    viewportWidth: 1280,  // Largura padrão de desktop
    viewportHeight: 800,  // Altura padrão de desktop
    setupNodeEvents(on, config) {
      // Configure listeners aqui, se necessário
    },
  },
});
