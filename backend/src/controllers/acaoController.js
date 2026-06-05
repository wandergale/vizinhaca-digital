// TODO: implementar controller de ações comunitárias
// - listActions: listar todas as ações com filtros e paginação
// - getAction: buscar ação por ID
// - createAction: criar nova ação (apenas LEADER)
// - updateAction: atualizar ação (apenas LEADER)
// - deleteAction: remover ação (apenas LEADER)
//
// ATENÇÃO: este controller deve ser simples, delegando a maior parte da lógica para o authService. 
// O controller é responsável por receber as requisições, extrair os dados do corpo, chamar os métodos do serviço e retornar as respostas adequadas. 
// O service é onde a lógica de negócio realmente acontece, como validação de dados, interação com o banco e geração de tokens.
//
class AcaoController {
    static async listActions(req, res) {
        const actions = await ActionService.listActions();
        res.json(actions);
    }

    static async getAction(req, res) {
        const { id } = req.body;
        const action = await ActionService.getAction(id);
        res.json(action);
    }
}

module.exports = AcaoController;