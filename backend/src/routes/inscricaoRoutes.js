const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { RegistrationController } = require('../controllers');

const router = Router();

// TODO: implementar rotas de inscrições
// POST   /registrations           - inscrever usuário em uma ação
// GET    /registrations/my        - listar inscrições do usuário autenticado
// DELETE /registrations/:id       - cancelar inscrição

router.post('/', authMiddleware, RegistrationController.createRegistration);

module.exports = router;
