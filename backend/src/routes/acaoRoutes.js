const { Router } = require('express');
const { AcaoController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// TODO: implementar rotas de ações comunitárias
// GET    /actions         - listar todas as ações ✅
// GET    /actions/:id     - detalhar uma ação ✅
// POST   /actions         - criar nova ação (LEADER)
// PUT    /actions/:id     - editar ação (LEADER)
// DELETE /actions/:id     - remover ação (LEADER)

router.get('/', authMiddleware, AcaoController.listActions);
router.get('/:id', authMiddleware, AcaoController.getAction);

module.exports = router;
