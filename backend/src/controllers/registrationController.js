// TODO: implementar controller de inscrições ✅
// - register: inscrever usuário autenticado em uma ação ✅
// - myRegistrations: listar inscrições do usuário autenticado ✅
// - cancel: cancelar inscrição do usuário autenticado ✅
// - details: detalhes de uma inscrição ✅
// - list: listar todas as inscrições (somente para líderes) ✅

const { RegistrationService } = require("../services");
const AppError = require("../utils/appError");

function validateRegistrationId(id) {
    if (!id) {
        throw new AppError('ID da inscrição é obrigatório', 400);
    }
}

// - cancel: cancelar inscrição do usuário autenticado
class RegistrationController {
    static async createRegistration(req, res, next) {
        const { actionId } = req.body;
        const userId = req.user.id;
        console.log('Criando inscrição para usuário:', userId);
        try {
            const registration = await RegistrationService.createRegistration(userId, actionId);
            return res.json(registration);
        } catch (error) {
            next(error);
        }
    }

    static async getMyRegistrations(req, res, next) {
        const userId = req.user.id;
        try {
            const registrations = await RegistrationService.getMyRegistrations(userId);
            return res.json(registrations);
        } catch (error) {
            next(error);
        }
    }

    static async cancelRegistration(req, res, next) {
        const registrationId = req.params.id;
        const userId = req.user.id;
        try {
            validateRegistrationId(registrationId);
            await RegistrationService.cancelRegistration(userId, registrationId);
            return res.json({ message: 'Inscrição cancelada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    static async getRegistrationById(req, res, next) {
        const registrationId = req.params.id;
        try {
            validateRegistrationId(registrationId);
            const registration = await RegistrationService.getRegistrationById(registrationId);
            return res.json(registration);
        } catch (error) {
            next(error);
        }
    }

    static async listRegistrations(req, res, next) {
        try {
            const registrations = await RegistrationService.listRegistrations();
            return res.json(registrations);
        } catch (error) {
            next(error);
        }
    }

    static async approveRegistration(req, res, next) {
        const registrationId = req.params.id;
        try {
            validateRegistrationId(registrationId);
            await RegistrationService.approveRegistration(registrationId);
            return res.json({ message: 'Inscrição aprovada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    static async rejectRegistration(req, res, next) {
        const registrationId = req.params.id;
        try {
            validateRegistrationId(registrationId);
            await RegistrationService.rejectRegistration(registrationId);
            return res.json({ message: 'Inscrição rejeitada com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RegistrationController;