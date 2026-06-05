// auth.service.js
const prisma = require('../config/prisma.js');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError.js');
const { validateEmail } = require('../utils/validators.js');
const { generateToken, verifyToken } = require('../utils/jwt.js');

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

        if (!user) { throw new AppError('Email ou senha inválidos', 401); }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { throw new AppError('Email ou senha inválidos', 401); }

        const token = generateToken({ id: user.id, email: user.email, name: user.name });

        return token;

    }

    static async me(token) {
        // retornar dados do usuário autenticado
        const userId = decoded.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                name: true,
                role: true,
                actions: true,
                registration: true
            }
        });
        return user;
    }
}

module.exports = AuthService;