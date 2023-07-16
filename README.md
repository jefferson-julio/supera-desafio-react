# Front-end do teste prático Supera

Esta é uma aplicação React que utiliza Next.js feita para o processo de seleção da empresa [Supera](https://www.supera.com.br).

## Estrutura dos diretórios

```
├── public # Arquivos estáticos
└── src/
    └── app/ # Página principal, estilização e layout geral da aplicação
        ├── components/ # Componentes reutilizáveis
        │   └── {Component}/ # Pasta com o nome do componente, ela abriga o código do componente e seu respectivo teste unitário
        ├── model # Interfaces e tipos Typescript para definição de entidades externas ou próprias
        └── services # Serviços da aplicação, a comunicação com servidores vai aqui
```

## Compilação

Rode o script ```build``` do package.json.

```bash
npm run build
```

Após o comando finalizar será criada uma pasta ```out/``` com o código e todos
os arquivos estáticos necessários para servir a aplicação.

## Testes

Este projeto utiliza [Cypress](https://cypress.io) para a realização dos testes de interface.

Para rodar os testes da aplicação simplesmente execute o script ```test``` do package.json

```bash
npm run test
```

É possível executar os testes manualmente e ter um feedback gráfico abrindo a
interface do Cypress. Para fazer isso, basta executar ```test:gui```

```bash
npm run test:gui
```
