# Projeto de Testes Automatizados - DOT Digital Group

## 📌 Introdução
Este repositório contém testes automatizados utilizando **Cypress** para validar a navegação e acessibilidade do site da **DOT Digital Group**. O objetivo é garantir que a experiência do usuário seja fluida e acessível.

---

## 📌 História do Usuário
**Título:** Validar a navegação e acessibilidade do site da DOT Digital Group  

**Descrição:**  
Como um usuário que acessa o site da **DOT Digital Group**,  
Quero navegar pelos menus e verificar a acessibilidade das imagens,  
Para garantir que a experiência do usuário seja fluida e inclusiva.  

---

## 📌 Critérios de Aceite
✅ O site deve carregar corretamente e exibir o logo da empresa.  
✅ As imagens devem conter um atributo `alt` válido para acessibilidade.  
✅ O menu "Sobre" deve redirecionar corretamente para a página correspondente.  

---

## 📌 Casos de Teste

| ID  | Caso de Teste | Passos | Resultado Esperado |
|-----|--------------|--------|--------------------|
| CT01 | Carregar a página inicial corretamente | 1. Acessar a URL da DOT Digital Group <br> 2. Verificar o título da página <br> 3. Validar a exibição do logo | O título da página e o logo devem estar visíveis |
| CT02 | Validar acessibilidade das imagens | 1. Aguardar a presença de imagens no DOM <br> 2. Verificar se cada imagem tem o atributo `alt` preenchido | Todas as imagens devem conter um atributo `alt` válido |
| CT03 | Navegar para a página "Sobre" e validar o conteúdo | 1. Clicar no menu "Sobre" <br> 2. Verificar se a URL foi alterada <br> 3. Validar a presença do texto "Quem somos" | A página "Sobre" deve carregar corretamente |

---

## 📌 Estimativa de Tempo de Teste

**Método utilizado:** **T-Shirt Sizing (P, M, G)**  

| Tarefa | Tipo | Tempo Estimado |
|--------|------|---------------|
| Análise do site e estrutura de testes | Planejamento | **30 min** |
| Configuração do Cypress e ambiente | Configuração | **30 min** |
| Implementação dos testes automatizados | Desenvolvimento | **1h 30min** |
| Execução e depuração dos testes | Testes | **40 min** |
| Configuração do pipeline no GitHub Actions | CI/CD | **40 min** |
| Documentação e revisão | Documentação | **30 min** |
| **Total estimado:** | | **4h 20min** |

---

## 📌 Pipeline de Testes (GitHub Actions)
📂 **Arquivo:** `.github/workflows/cypress.yml`

```yaml
name: Cypress Tests

on:
  push:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Copiar testData.example.json para testData.json (se não existir)
        run: |
          if [ ! -f cypress/fixtures/testData.json ]; then
            cp cypress/fixtures/testData.example.json cypress/fixtures/testData.json
          fi

      - name: Run Cypress tests
        run: npx cypress run
```

---

## 📌 Como Executar os Testes Localmente

### **Pré-requisitos:**
- Node.js instalado (versão 14 ou superior)
- Cypress instalado globalmente ou no projeto (`npm install cypress --save-dev`)

### **Passos:**
1. Clone o repositório:
   ```bash
   git clone https://github.com/sousafael/testes-dotgroup.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute os testes no modo interativo:
   ```bash
   npx cypress open
   ```
5. Para rodar os testes no terminal:
   ```bash
   npx cypress run
   ```

---


