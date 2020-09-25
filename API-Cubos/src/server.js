var express = require('express');//Requisição do framework Express
const routes = require('./routes');//Requisitação das rotas criadas
const app = express()

app.use(routes)//Adicionando as rotas criadas no servidor da aplicação

app.listen(8081)//Informando em qual porta o servidor será executado