const { Router } = require('express');
const { ActionController } = require('../controllers/index.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const roleMiddleware = require('../middlewares/validateMiddleware.js');

const router = Router();

// TODO: implementar rotas de ações comunitárias
// GET    /actions         - listar todas as ações ✅
// GET    /actions/:id     - detalhar uma ação ✅
// POST   /actions         - criar nova ação (LEADER)
// PUT    /actions/:id     - editar ação (LEADER)
// DELETE /actions/:id     - remover ação (LEADER)

// GET /actions - listar ações com filtros e paginação
router.get('/', authMiddleware, ActionController.listActions);
router.get('/:id', authMiddleware, ActionController.getAction);
router.get('/:id/users', authMiddleware, ActionController.ActionUsers);

// POST /actions - criar nova ação
router.post('/', [authMiddleware, roleMiddleware('LEADER')], ActionController.createAction);

// PUT /actions/:id - atualizar ação
router.put('/:id', [authMiddleware, roleMiddleware('LEADER')], ActionController.updateAction);

// DELETE /actions/:id - remover ação
router.delete('/:id', [authMiddleware, roleMiddleware('LEADER')], ActionController.deleteAction);

module.exports = router;
