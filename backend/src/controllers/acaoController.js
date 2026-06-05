// TODO: implementar controller de ações comunitárias
// - listActions: listar todas as ações com filtros e paginação
// - getAction: buscar ação por ID
// - createAction: criar nova ação (apenas LEADER)
// - updateAction: atualizar ação (apenas LEADER)
// - deleteAction: remover ação (apenas LEADER)
class AcaoController {
    static async listActions(req, res) {
        res.json({ message: 'Listar todas as ações' });
    }

    static async getAction(req, res) {
        const { id } = req.body;
        res.json({ message: `Detalhar ação com ID ${id}` });
    }
}

module.exports = AcaoController;