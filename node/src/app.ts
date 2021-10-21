import "dotenv/config"  // Importação de bib. que permite manipular arquivo .env
import express from "express"; 
import http from "http"; 
import cors from "cors"; 

import { Server } from "socket.io";

import { router } from "./routes";

const app = express()
app.use(cors())

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors: { origin: "*" }
})

io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(express.json()) // Indica para o axios que ele deve entender requisições JSON
app.use(router)

// Definindo a rota que vai fazer o login no Github
app.get("/github", (request, response) => {
    // Redireciona para tela de autenticação do Github
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

// Definindo rota que retorna os dados do User logado no Github
app.get("/signin/callback", (request, response) => {
    const { code } = request.query  // Code do User que vem pela URL (Ex: http://localhost:4000?Chave=Valor)
    return response.json(code)
})

export { serverHttp, io }