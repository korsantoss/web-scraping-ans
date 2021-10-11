# Web Scraping - ANS

Projeto realizado para um desafio de estágio: download do arquivo .pdf "Componente Organizacional" no site da Agência Nacional de Saúde Suplementar (ANS).

### :gear: Configuração Inicial

Para rodar o projeto é necessário instalar o [Node.js](https://nodejs.org/)

Baixe os arquivos do projeto.
Dentro da pasta do projeto abra o terminal e rode os seguintes comandos:

- para instalar todas as dependências `npm install`
- para rodar o projeto `node server.js`

### :pushpin: Endpoints

| Método | Rota | Paramêtro | Descrição                                           |
| ------ | ---- | --------- | --------------------------------------------------- |
| GET    | /    | nenhum    | Realiza o download do Componente Organizacional.pdf |

Retornos:

- File downloaded successfully
- Download failed!

### :books: Dependências utilizadas

- [Express](https://www.npmjs.com/package/express)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [nodejs-file-downloader](https://www.npmjs.com/package/nodejs-file-downloader)
