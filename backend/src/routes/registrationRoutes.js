const { Router } = require('express');
const { RegistrationController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/validateMiddleware');

const router = Router();

// TODO: implementar rotas de inscrições
// POST   /registrations           - inscrever usuário em uma ação ✅
// GET    /registrations/my        - listar inscrições do usuário autenticado ✅
// DELETE /registrations/:id       - cancelar inscrição ✅
// GET    /registrations/:id       - detalhes de uma inscrição ✅
// GET    /registrations           - listar todas as inscrições (somente para líderes) ✅

// GET /registrations - listar ou detalhar inscrições
router.get('/my', authMiddleware, RegistrationController.getMyRegistrations);
router.get('/:id', authMiddleware, RegistrationController.getRegistrationById);
router.get('/', [authMiddleware, roleMiddleware('LEADER')], RegistrationController.listRegistrations);

// POST /registrations - inscrever usuário em uma ação
router.post('/', authMiddleware, RegistrationController.createRegistration);

// PUT /registrations - aprovar ou rejeitar inscrição (somente para líderes)
router.put('/:id/approve', [authMiddleware, roleMiddleware('LEADER')], RegistrationController.approveRegistration);
router.put('/:id/reject', [authMiddleware, roleMiddleware('LEADER')], RegistrationController.rejectRegistration);

// DELETE /registrations/:id - cancelar inscrição
router.delete('/:id', authMiddleware, RegistrationController.cancelRegistration);

module.exports = router;
