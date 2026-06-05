// TODO: implementar controller de autenticação
// - register: criar novo usuário com senha hasheada
// - login: validar credenciais e retornar JWT
// - me: retornar dados do usuário autenticado
// auth.controller.js
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
}

module.exports = AuthController;