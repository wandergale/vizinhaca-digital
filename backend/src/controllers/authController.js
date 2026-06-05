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
    static async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await AuthService.register(name, email, password);

            return res.json({ id: user.id, email: user.email });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const token = await AuthService.login(email, password);

            return res.json({ token });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    static async me(req, res) {
        try {
            const user = await AuthService.me(req.user.id);

            return res.json(user);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }

    }
}

module.exports = AuthController;