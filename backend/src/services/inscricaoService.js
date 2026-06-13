const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const NotificationsService = require("../services/notifications");

class RegistrationService {
    static async createRegistration(userId, actionId) {
        // Lógica para criar uma nova inscrição
        const registration = await prisma.registration.create({
            data: {
                userId,
                actionId,
            },
        });
        return registration;
    }

    static async getMyRegistrations(userId) {
        // Lógica para listar inscrições do usuário autenticado
        const registrations = await prisma.registration.findMany({
            where: { userId },
            include: { action: true }, // incluir detalhes da ação
        });
        return registrations;
    }

    static async cancelRegistration(userId, registrationId) {
        // Lógica para cancelar inscrição do usuário autenticado
        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
        });
        if (!registration) {
            throw new AppError('Inscrição não encontrada', 404);
        }
        if (registration.userId !== userId) {
            throw new AppError('Você não tem permissão para cancelar esta inscrição', 403);
        }
        await prisma.registration.delete({
            where: { id: registrationId },
        });
        return registration;
    }

    static async getRegistrationById(registrationId) {
        // Lógica para buscar inscrição por ID
        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
            include: { action: true, user: true }, // incluir detalhes da ação e do usuário
        });
        return registration;
    }

    static async listRegistrations() {
        // Lógica para listar todas as inscrições (pode ser usado para admin)
        const registrations = await prisma.registration.findMany({
            include: { action: true, user: true }, // incluir detalhes da ação e do usuário
        });
        return registrations;
    }

    static async aproveRegistration(registrationId) {
        // Lógica para aprovar uma inscrição (pode ser usado por líderes)
        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
        });
        if (!registration) {
            throw new AppError('Inscrição não encontrada', 404);
        }

        // Temporariamente, vamos apenas enviar uma notificação para o usuário.
        const action = await prisma.action.findUnique({
            where: { id: registration.actionId },
        });
        await NotificationsService.sendNotification({
            userId: registration.userId,
            title: 'Inscrição Aprovada',
            message: `Sua inscrição para a ação ${action.title} foi aprovada!`,
        });

        await prisma.registration.update({
            where: { id: registrationId },
            data: { status: RegistrationStatus.APPROVED },
        });
        return registration;
    }

    static async rejectRegistration(registrationId) {
        // Lógica para rejeitar uma inscrição (pode ser usado por líderes)
        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
        });
        if (!registration) {
            throw new AppError('Inscrição não encontrada', 404);
        }

        const action = await prisma.action.findUnique({
            where: { id: registration.actionId },
        });

        await NotificationsService.sendNotification({
            userId: registration.userId,
            title: 'Inscrição Rejeitada',
            message: `Sua inscrição para a ação ${action.title} foi rejeitada.`,
        });

        await prisma.registration.update({
            where: { id: registrationId },
            data: { status: RegistrationStatus.REJECTED },
        });
        return registration;
    }
}

module.exports = RegistrationService;