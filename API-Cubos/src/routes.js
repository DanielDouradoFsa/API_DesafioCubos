const {Router} = require('express') //Requisitando a função do express resposável pela criação das rotas
const FilaController = require('./Controllers/FilaController') //Requisitando o controller usado para realizar as tarefas das rotas
const bodyParser = require("body-parser");//Requisitando o Body-Parses, ferramenta utilizada para conseguir trabalhar com os dados vindo do request das rotas

routes=Router()
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())//Utilizando o BodyParser nas rotas

routes.get('/', function(req, res) {
    res.send("Hello World!")
})
routes.post('/createUser',FilaController.create)//Rota responsável por criar um usuário
routes.get('/addToLine/:id',FilaController.addToLine);//Rota responsável por adicionar um usuário a fila
routes.post('/findPosition',FilaController.findPosition);//Rota responsável por encontrar a posição de um usuario na fila
routes.get('/showLine', FilaController.showLine);//Rota responsável por exibir os usuarios presentes na fila
routes.post('/filterLine', FilaController.filterLine);//Rota responsável por exibir os usuarios presentes na fila com base no genero especificado
routes.delete('/popLine', FilaController.popline);//Rota responsável por deletar o primeiro usuário da fila

module.exports = routes