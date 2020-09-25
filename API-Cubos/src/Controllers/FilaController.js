var fila = []//Lista contendo os usuarios cadastrados na fila
var users = []//Lista de usuários criados
var posição=1;//Variável utilizada para indicar a posição de um usuário na fila
var id=0;//Variável utilizada para atribuir um ID para cada usuário criado
exports.create = (req,res) =>{//Função responsável por adicionar um usuário a lista de usuário e retornar
    var erros=[]
    if(!req.body.nome || typeof req.body.nome== undefined|| req.body.nome==null)//Validando o nome recebido pela rota
        erros.push({erro:"Nome inválido"})
    if(!req.body.email|| typeof req.body.email== undefined|| req.body.email==null)//Validando o email recebido pela rota
        erros.push({erro:"Email inválido"})
    for(i=0;i<users.length;i++){
        if(users[i].dados.email==req.body.email)
            erros.push({text:"Endereço de email já utilizado"})//Validando se o email recebido pela rota já consta no sistema
    }
    if(!req.body.genero || typeof req.body.genero== undefined|| req.body.genero==null)//Validando o genero recebido pela rota
        erros.push({erro:"Genero inválido"})
    if(erros.length>0){//Verificando se houveram erros durante as validações, caso tenha, os erros são retornados.
        res.send(erros)
    }else{ 
        const dados = {
            "nome":req.body.nome,
            "email":req.body.email,
            "genero":req.body.genero
        }
        const user ={
            "id":id++,
            dados
        }
        users.push(user)
        return res.status(200).json(users)
    }
    
}
exports.addToLine = (req, res) => {//Função responsável por adicionar um usuário a fila
    for (i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            obj = {
                "posição": posição++,
                "usuario": users[i].dados
            }
            fila.push(obj)
            return res.status(200).json(obj.posição)
        }
    }
    res.send("Nenhum usuário encontrado com esse id")
}
exports.findPosition = (req, res) => {//Função responsável por buscar a posição de um usuários através do email dele
    var erros=[]
    if(!req.body.email|| typeof req.body.email== undefined|| req.body.email==null)//Validando o email recebido pela rota
        erros.push({erro:"Email inválido"})
    if(erros.length>0){
        res.send(erros)
    }else{ 
        for (i = 0; i < fila.length; i++) {
            if (fila[i].usuario.email == req.body.email) {
                return res.status(200).json(fila[i].posição)
            }
        }
        res.send("Nenhum usuário com esse email foi cadastrado na fila")
    }
}
exports.showLine = (req, res) => {//Função responsável por eixibir todos os usuários cadastrados na fila
    res.send(fila)
}
exports.filterLine = (req, res) => {//Função responsável por filtrar a fila com base no gênero dos usuários
    var erros=[]
    if(!req.body.genero|| typeof req.body.genero== undefined|| req.body.genero==null)//Validando o genero recebido pela rota
        erros.push({erro:"Email inválido"})
    if(erros.length>0){
        res.send(erros)
    }else{
        const usuariosGenero = []
        for (i = 0; i < fila.length; i++) {
            if (fila[i].usuario.genero == req.body.genero) {
                usuariosGenero.push(fila[i])
            }
        }
        if (usuariosGenero.length == 0) {
            res.send("Nenhum usuário com esse gênero foi cadastrado na fila")
        }
        res.send(usuariosGenero)
    }
}
exports.popline = (req, res) => {//Função responsálve por remover o primeiro usuário da fila
    if(fila.length>0){
        user = (fila.shift()).usuario
        console.log(fila)
        res.send(user)
    }
    res.send("Nenhum usuário está cadastrado na fila, não foi possível remover")
}
