import { serverHttp } from "./app";

//  Definindo a porta que vai rodar a aplicação
serverHttp.listen(4000, () => 
    console.log(`Server is running on Port 4000`)
)