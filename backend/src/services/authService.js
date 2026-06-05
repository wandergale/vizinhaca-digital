// auth.service.js
const prisma = require('../config/prisma.js');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError.js');
const { validateEmail } = require('../utils/validators.js');

class AuthService {
    static async register(name, email, password) {

        // criar usuário no banco com senha hasheada ✅
        if (!name || !email || !password) { throw new AppError('Todos os campos são obrigatórios', 400); }

        if (validateEmail(email) === false) { throw new AppError('Email inválido', 400); }

        if (password.length < 6) { throw new AppError('A senha deve conter pelo menos 6 caracteres', 400); }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) { throw new AppError('Email já cadastrado', 400); }

        const hashedPassword = await bcrypt.hash(password, 10); // TODO: hashear senha com bcrypt

        const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
        return user;

    }

    static async login(email, password) {

        // validar credenciais e gerar JWT
        const user = await prisma.user.findUnique({
            where: { email },
        });
        // TODO: comparar senhas (hasheada)
        // TODO: gerar JWT
        return token;

    }
}

module.exports = AuthService;