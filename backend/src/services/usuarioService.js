// usuários são criados automaticamente via autenticação social, então não precisamos de um service completo para eles, 
// mas podemos criar um método para buscar usuário por ID, caso seja necessário

const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

class UsersService {

    static async getUserById(userId) {
        // Lógica para buscar usuário por ID
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }

        return user;
    }

    static async getUserByEmail(email) {
        // Lógica para buscar usuário por email
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }
        return user;
    }

    static async listUsers() {
        // Lógica para listar todos os usuários (pode ser usado para admin)
        const users = await prisma.user.findMany();
        if (!users) {
            throw new AppError('Nenhum usuário encontrado', 404);
        }
        return users;
    }
}

module.exports = UsersService;