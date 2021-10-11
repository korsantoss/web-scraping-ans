// web-scraping-ans
// Projeto realizado para um desafio de estágio: download do arquivo .pdf "Componente Organizacional" no site www.gov.br

const express = require("express");
const server = express();
const puppeteer = require("puppeteer");
const path = require("path");
const Downloader = require("nodejs-file-downloader");

// rota para realizar o download do pdf
server.get("/", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false }); // headless: true define que a janela do navegador nao sera exibida. Caso queira a exibicao headless: false

    const [page] = await browser.pages();

    //ir para a pagina "Padrao para Troca de Informaccao de Saude Suplementar"
    await page.goto(
      "https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss",
    );

    // obter a url do Padrao TISS mais recente
    const linkPadraoTiss = await page.evaluate(() => {
      return document
        .querySelector("#parent-fieldname-text > p:nth-child(4) > a")
        .getAttribute("href");
    });

    //navegar para a pagina Padrao TISS
    await page.goto(linkPadraoTiss);

    // obtem a url de download do arquivo Componente Organizacional
    const linkDownload = await page.evaluate(() => {
      return document
        .querySelector(
          "#parent-fieldname-text > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a",
        )
        .getAttribute("href");
    });

    const fileDirectory = "files/"; // diretorio onde o pdf ira ficar
    const fileName = path.basename(linkDownload); // define o final da url como o nome do arquivo

    // passando as configs para o construtor do Downloader
    const downloader = new Downloader({
      url: linkDownload,
      directory: fileDirectory, // caso a pasta files nao exista o package cria automaticamente
      fileName: fileName,
      cloneFiles: false, // caso o arquivo ja exista, sera substituido
    });

    await downloader.download(); //metodo para fazer o download do arquivo

    res.send("<h2>File downloaded successfully</h2>"); // caso tudo ocorra bem, sera enviado uma msg de sucesso como resposta
  } catch (e) {
    res.send(`<h2>Download failed!</h2><p>Error: ${e.message}</p>`); // caso ocorra algum erro, sera enviado a msg de erro como resposta
  } finally {
    await browser.close(); // o browser sera fechado independente do sucesso ou error
  }
});

// definição da porta
const port = 5000;
server.listen(port, () => {
  console.log("Server running ☜(⌒▽⌒)☞");
});
