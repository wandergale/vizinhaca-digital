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
}

module.exports = RegistrationService;