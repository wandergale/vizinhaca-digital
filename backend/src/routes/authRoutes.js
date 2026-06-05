const { Router } = require('express');
const { AuthController } = require('../controllers');

const router = Router();

// TODO: implementar rotas de autenticação
// POST /auth/register - cadastro de usuário ✅
// POST /auth/login    - login e geração de JWT ✅
// GET  /auth/me       - retornar usuário autenticado

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
//router.get('/me', AuthController.me); // TODO: proteger rota com middleware de autenticação

module.exports = router;
