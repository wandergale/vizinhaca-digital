const prisma = require('../config/prisma.js');

class ActionsService {
    static async listActions() {
        // lógica para listar ações
        const actions = await prisma.action.findMany({});
        return actions;
    }

    static async getAction(id) {
        // lógica para buscar ação por ID
        const action = await prisma.action.findUnique({ where: { id } });
        return action;
    }
}

module.exports = ActionsService;