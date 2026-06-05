// TODO: implementar lógica de recuperação de senha ⚠️

const prisma = require('../config/prisma.js');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError.js');
const { validateEmail } = require('../utils/validators.js');
const { generateToken, verifyToken } = require('../utils/jwt.js');
const { hashPassword } = require('../utils/bcrypt.js');

class AuthService {
    static async register(name, email, password) {

        // criar usuário no banco com senha hasheada ✅
        if (!name || !email || !password) { throw new AppError('Todos os campos são obrigatórios', 400); }

        if (validateEmail(email) === false) { throw new AppError('Email inválido', 400); }

        if (validatePassword(password) === false) { throw new AppError('A senha deve conter pelo menos 6 caracteres', 400); }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) { throw new AppError('Email já cadastrado', 400); }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
        return user;

    }

    static async login(email, password) {

        // validar credenciais e gerar JWT ✅
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) { throw new AppError('Email ou senha inválidos', 401); }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) { throw new AppError('Email ou senha inválidos', 401); }

        const token = generateToken({ id: user.id, email: user.email, name: user.name });

        return token;

    }

    static async me(userId) {
        // retornar dados do usuário autenticado ✅

        if (!userId) { throw new AppError('Usuário não autenticado', 401); }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, email: true, role: true, registrations: true, actions: true }, // não retornar senha
        });
        return user;
    }


    // atualizar dados do usuário autenticado ✅
    static async updateMe(req, res) {
        try {
            const { name, email, password } = req.body;
            const userId = req.user.id;
            const updatedData = {};

            if (name) updatedData.name = name;
            if (email) {
                if (validateEmail(email) === false) { throw new AppError('Email inválido', 400); }
                updatedData.email = email;
            }
            if (password) {
                if (validatePassword(password) === false) { throw new AppError('A senha deve conter pelo menos 6 caracteres', 400); }
                updatedData.password = await hashPassword(password);
            }

            const user = await prisma.user.update({
                where: { id: userId },
                data: updatedData,
                select: { name: true, email: true, role: true, registrations: true, actions: true },
            });

            return user;
        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500);
        }
    }

    // remover usuário autenticado ✅
    static async deleteMe(req, res) {
        try {
            const userId = req.user.id;
            await prisma.user.delete({ where: { id: userId } });
        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500);
        }
    }

    // enviar email de recuperação de senha (pode ser apenas um log no console por enquanto) ⚠️
    static async recoverPassword(req, res) {
        try {
            const { email } = req.body;
            // lógica para enviar email de recuperação de senha (pode ser apenas um log no console por enquanto)
            console.log(`Enviando email de recuperação de senha para: ${email}`);
            return { message: 'Email de recuperação de senha enviado para ' + email + ' (simulado)' };
        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500);
        }
    }
}

module.exports = AuthService;