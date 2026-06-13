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
const { ActionService } = require("../services");

class AcaoController {
    static async listActions(req, res, next) {
        try {
            const actions = await ActionService.listActions();
            res.json(actions);
        } catch (error) {
            next(error);
        }
    }

    static async getAction(req, res, next) {
        const { id } = req.body;
        try {
            const action = await ActionService.getAction(id);
            res.json(action);
        } catch (error) {
            next(error);
        }
    }

    static async createAction(req, res, next) {
        const { title, description, date, location } = req.body;
        try {
            const action = await ActionService.createAction({ title, description, date, location });
            res.json(action);
        } catch (error) {
            next(error);
        }
    }

    static async updateAction(req, res, next) {
        const { id } = req.params;
        const { title, description, date, location } = req.body;
        try {
            const action = await ActionService.updateAction(id, { title, description, date, location });
            res.json(action);
        } catch (error) {
            next(error);
        }
    }

    static async deleteAction(req, res, next) {
        const { id } = req.params;
        try {
            await ActionService.deleteAction(id);
            res.json({ message: 'Ação removida com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AcaoController;