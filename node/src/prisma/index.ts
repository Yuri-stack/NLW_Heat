import { PrismaClient } from "@prisma/client";

// Faz a conexão com o nosso "Banco de Dados" do Prisma
const prismaClient = new PrismaClient();

export default prismaClient;