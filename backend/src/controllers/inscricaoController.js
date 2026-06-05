// TODO: implementar controller de inscrições
// - register: inscrever usuário autenticado em uma ação
// - myRegistrations: listar inscrições do usuário autenticado

const { RegistrationService } = require("../services");

// - cancel: cancelar inscrição do usuário autenticado
class RegistrationController {
    static async createRegistration(req, res) {
        const { actionId } = req.body;
        const userId = req.user.id;
        const registration = await RegistrationService.createRegistration(userId, actionId);
        return res.json(registration);
    }
}

module.exports = RegistrationController;