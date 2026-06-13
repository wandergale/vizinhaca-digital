const UsersService = require("../services/usuarioService");

class UsersController {

    static async getAll(req, res, next) {
        try {
            const users = await UsersService.listUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        const userId = req.params.id;
        try {
            const user = await UsersService.getUserById(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getByEmail(req, res, next) {
        const email = req.query.email;
        try {
            const user = await UsersService.getUserByEmail(email);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsersController;