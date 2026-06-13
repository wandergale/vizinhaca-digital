const prisma = require("../config/prisma");

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
        await prisma.registration.update({
            where: { id: registrationId },
            data: { approved: true },
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
        await prisma.registration.update({
            where: { id: registrationId },
            data: { status: RegistrationStatus.REGECTED },
        });
        return registration;
    }
}

module.exports = RegistrationService;