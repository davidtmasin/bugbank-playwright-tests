# 🧪 Testes Automatizados com Playwright – BugBank

<img src="https://github.com/davidtmasin/portfolio-qa/blob/main/.medias/media-bugbank.png">

## 📌 Sobre o Projeto BugBank

O BugBank é uma aplicação web que simula uma aplicação real de um banco digital, permitindo que os usuários possam se cadastrar na plataforma, efetuar o login, realizar e receber transferências, e visualizar o extrato da conta.

Esta aplicação foi submetida a um momento de testes manuais onde, o processo dos testes foi documentado em um repositório no Github. Você pode conferir os detalhes em: https://github.com/davidtmasin/portfolio-qa/tree/main/TestesManuais/BugBank.

Para o objetivo de automação de testes neste projeto, listo a seguir, os documentos que serviram para a base dos testes:

- [Requisitos](https://github.com/davidtmasin/portfolio-qa/blob/main/TestesManuais/BugBank/1-Requisitos-do-Projeto.md)
- [Cenário e Casos de Teste](https://github.com/davidtmasin/portfolio-qa/blob/main/TestesManuais/BugBank/3-Cenarios-e-Casos-de-Teste.md)

## ✅ Funcionalidades Cobertas

As seguintes funcionalidades foram validadas manualmente e agora estão sendo automatizadas:

- [x] Login na plataforma
- [x] Cadastro de novo usuário
- [x] Transferência de valores entre contas
- [x] Visualização do extrato da conta

## 🎯 Objetivos

- Automatizar os principais fluxos funcionais do BugBank.
- Reduzir esforço manual em execuções repetitivas.
- Permitir execução automática dos testes via pipelines CI/CD.
- Execução de testes de regressão em alterações do sistema.

- ## 🛠 Tecnologias Utilizadas

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://docs.github.com/pt/actions)

## 🚀 Comandos Úteis

Instalando o Playwright

```bash
npm init playwright@latest


```

ou

```bash
npm init -y
npm install playwright
npx playwright install


```

Verificando a versão instalada

```bash
npx playwright --version


```

Atualizando o Playwright

```bash
npm init -D @playwright/test@latest


```

Execução dos testes (modo headless)

```bash
npx playwright test


```

Execução dos testes (modo headful)

```bash
npx playwright test --headed


```

Inicia o modo interativo de interface gráfica, permitindo explorar e executar os testes visualmente

```bash
npx playwright test --ui


```

Executa os testes apenas no navegador Chrome (Chromium). Útil para validar comportamentos específicos por navegador

```bash
npx playwright test --project=chromium


```

Executa os testes contidos em um arquivo específico

```bash
npx playwright test example


```

Execução de um teste específico

```bash
npx playwright test --grep "nome_do_caso_de_teste"


```



Inicia os testes em modo de depuração, com pausas e ferramentas visuais para inspecionar cada etapa

```bash
npx playwright test --debug


```

Gera automaticamente o código dos testes a partir de interações feitas no navegador. Excelente para criar cenários base rapidamente

```bash
npx playwright codegen


```



## 🧪 Estrutura do Projeto

.

├── tests/ # Casos de teste automatizados

├── pages/ # Page Objects (se aplicável)

├── playwright.config.ts

└── README.md

---

Retornar ao repositório [Playwright](https://github.com/davidtmasin/playwright).

Copyright © 2025 David Teixeira de Masin
