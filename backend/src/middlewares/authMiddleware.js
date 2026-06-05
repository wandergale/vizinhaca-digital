// TODO: implementar middleware de autenticação JWT
// - verificar header Authorization: Bearer <token>
// - validar e decodificar o JWT com JWT_SECRET
// - anexar req.user com os dados do usuário autenticado
// - retornar 401 se token ausente ou inválido
const { verifyToken } = require('../utils/jwt.js');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token não informado'
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            message: 'Token inválido'
        });
    }
}

module.exports = authMiddleware;