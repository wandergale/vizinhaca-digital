// TODO: implementar controller de inscrições ✅
// - register: inscrever usuário autenticado em uma ação ✅
// - myRegistrations: listar inscrições do usuário autenticado ✅
// - cancel: cancelar inscrição do usuário autenticado ✅
// - details: detalhes de uma inscrição ✅
// - list: listar todas as inscrições (somente para líderes) ✅

const { RegistrationService } = require("../services");

// - cancel: cancelar inscrição do usuário autenticado
class RegistrationController {
    static async createRegistration(req, res) {
        const { actionId } = req.body;
        const userId = req.user.id;
        try {
            const registration = await RegistrationService.createRegistration(userId, actionId);
            return res.json(registration);
        } catch (error) {
            next(error);
        }
    }

    static async getMyRegistrations(req, res) {
        const userId = req.user.id;
        try {
            const registrations = await RegistrationService.getMyRegistrations(userId);
            return res.json(registrations);
        } catch (error) {
            next(error);
        }
    }

    static async cancelRegistration(req, res) {
        const registrationId = req.params.id;
        const userId = req.user.id;
        try {
            await RegistrationService.cancelRegistration(userId, registrationId);
            return res.json({ message: 'Inscrição cancelada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    static async getRegistrationById(req, res) {
        const registrationId = req.params.id;
        try {
            const registration = await RegistrationService.getRegistrationById(registrationId);
            return res.json(registration);
        } catch (error) {
            next(error);
        }
    }

    static async listRegistrations(req, res) {
        try {
            const registrations = await RegistrationService.listRegistrations();
            return res.json(registrations);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RegistrationController;