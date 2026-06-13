// TODO: implementar controller de autenticação
// - register: criar novo usuário com senha hasheada
// - login: validar credenciais e retornar JWT
// - me: retornar dados do usuário autenticado
// auth.controller.js
//
// ATENÇÃO: este controller deve ser simples, delegando a maior parte da lógica para o authService. 
// O controller é responsável por receber as requisições, extrair os dados do corpo, chamar os métodos do serviço e retornar as respostas adequadas. 
// O service é onde a lógica de negócio realmente acontece, como validação de dados, interação com o banco e geração de tokens.
//
const AuthService = require('../services/authService.js');

class AuthController {
    static async register(req, res, next) {
        const { name, email, password } = req.body;

        try {
            const user = await AuthService.register(name, email, password);

            return res.json({ id: user.id, email: user.email });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const token = await AuthService.login(email, password);

            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async me(req, res, next) {
        try {
            const user = await AuthService.me(req.user.id);

            return res.json(user);
        } catch (error) {
            next(error);
        }

    }

    static async updateMe(req, res, next) {
        try {
            const user = await AuthService.updateMe(req.user.id, req.body);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async deleteMe(req, res, next) {
        try {
            await AuthService.deleteMe(req.user.id);
            return res.json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    static async recoverPassword(req, res, next) {
        try {
            const result = await AuthService.recoverPassword(req.body.email);
            return res.json(result.message);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;