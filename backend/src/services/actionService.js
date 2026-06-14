const prisma = require('../config/prisma.js');
const AppError = require('../utils/appError.js');
const NotificationsService = require('./notificationService.js');

function validateActionId(id) {
    if (!id) {
        throw new AppError('ID da ação é obrigatório', 400);
    }
}

function actionNotFound(id) {
    throw new AppError(`Ação com ID ${id} não encontrada`, 404);
}

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
        validateActionId(id);
        // lógica para buscar ação por ID
        const action = await prisma.action.findUnique({ where: { id } });

        if (!action) {
            actionNotFound(id);
        }

        return action;
    }

    static async ActionUsers(id) {
        validateActionId(id);
        // lógica para buscar usuários inscritos em uma ação
        const users = await prisma.registration.findMany({
            where: { actionId: id },
            include: { user: true }, // incluir detalhes do usuário
        });

        return users.map(registration => registration.user);
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
            actionNotFound(id);
        }

        const users = action.users; // Supondo que a ação tenha um campo 'users' com os usuários inscritos
        for (const user of users) {
            await NotificationsService.sendNotification(
                user.id,
                'Ação Atualizada',
                `A ação "${action.title}" foi atualizada. Verifique os detalhes para mais informações.`,
            );
        }

        return action;
    }

    static async deleteAction(id) {
        // lógica para remover ação
        const action = await prisma.action.delete({ where: { id } });

        if (!action) {
            actionNotFound(id);
        }

        return;
    }
}

module.exports = ActionsService;