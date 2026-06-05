const prisma = require('../config/prisma.js');
const AppError = require('../utils/appError.js');

class ActionsService {
    static async listActions() {
        // lógica para listar ações
        const actions = await prisma.action.findMany({});

        if (!actions) {
            throw new AppError('Nenhuma ação encontrada', 404);
        }

        return actions;
    }

    static async getAction(id) {
        // lógica para buscar ação por ID
        const action = await prisma.action.findUnique({ where: { id } });

        if (!action) {
            throw new AppError('Ação não encontrada', 404);
        }

        return action;
    }

    static async createAction(data) {
        // lógica para criar nova ação
        const action = await prisma.action.create({ data });

        if (!action) {
            throw new AppError('Erro ao criar ação', 500);
        }

        return action;
    }

    static async updateAction(id, data) {
        // lógica para atualizar ação
        const action = await prisma.action.update({ where: { id }, data });

        if (!action) {
            throw new AppError('Ação não encontrada', 404);
        }

        return action;
    }

    static async deleteAction(id) {
        // lógica para remover ação
        const action = await prisma.action.delete({ where: { id } });

        if (!action) {
            throw new AppError('Ação não encontrada', 404);
        }

        return;
    }
}

module.exports = ActionsService;