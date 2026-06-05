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

    static async createAction(data) {
        // lógica para criar nova ação
        const action = await prisma.action.create({ data });
        return action;
    }

    static async updateAction(id, data) {
        // lógica para atualizar ação
        const action = await prisma.action.update({ where: { id }, data });
        return action;
    }

    static async deleteAction(id) {
        // lógica para remover ação
        await prisma.action.delete({ where: { id } });
        return;
    }
}

module.exports = ActionsService;