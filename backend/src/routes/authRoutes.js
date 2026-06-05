const { Router } = require('express');
const { AuthController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// TODO: implementar rotas de autenticação
// POST /auth/register - cadastro de usuário ✅
// POST /auth/login    - login e geração de JWT ✅
// GET  /auth/me       - retornar usuário autenticado ✅
// PUT  /auth/me       - atualizar usuário autenticado ✅
// DELETE /auth/me     - remover usuário autenticado ✅

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);
router.put('/me', authMiddleware, AuthController.updateMe);
router.delete('/me', authMiddleware, AuthController.deleteMe);
router.put('/recover', AuthController.recoverPassword);

module.exports = router;
