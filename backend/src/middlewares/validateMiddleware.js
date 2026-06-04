// TODO: implementar middleware de controle de acesso por role
// - receber role(s) permitido(s) como parâmetro
// - verificar se req.user.role está entre os permitidos
// - retornar 403 se não tiver permissão
// Uso: router.post('/', authMiddleware, roleMiddleware('LEADER'), createAction)
