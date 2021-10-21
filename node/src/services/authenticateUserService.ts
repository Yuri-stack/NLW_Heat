import axios from "axios"
import prismaClient from "../prisma"
import { sign } from "jsonwebtoken"

/*  FLUXO DO SERVICE
    Receber um code(String)
    Recuperar o access_token no Github (Token que o Github disp. para pegarmos info do user que acessou o app)
    Recuperar info do User no Github
    Verificar se o user existe no db
        Sim = Gera um Token
        Não = Cria no db, e gera um Token
    Retornar o Token com as info do user logado
*/

interface IAccessTokenResponse{
    access_token: string
}

interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService{
    async execute(code: string){
        const url = "https://github.com/login/oauth/access_token"

        // Função que vai ser usada para recuperar o access_token no Github
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: { "Accept": "application/json" }
        })

        // Com o access_token, essa função vai fazer uma requisição ao Github para pegar todos os dados
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: { authorization: `Bearer ${ accessTokenResponse.access_token }` }
        })

        const { login, id, avatar_url, name } = response.data

        // Faz uma pesquisa no banco e verifica se o Id passado já existe
        let user = await prismaClient.user.findFirst({ 
            where: { github_id: id }
        })

        // Se não existe, crie esse novo User
        if(!user){
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return { token, user }
    }
}

export { AuthenticateUserService }