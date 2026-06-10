import api from './api';
import { acoesMock } from './mockData';

// Serviço de Ações Comunitárias.
// Endpoints reais no backend: GET /actions, GET /actions/:id, PUT /actions/:id
// Quando o backend não responde, retorna dados de exemplo (mock) para manter
// o fluxo de telas navegável.
const acaoService = {
  // Lista todas as ações
  async listar() {
    try {
      const { data } = await api.get('/actions');
      return Array.isArray(data) && data.length > 0 ? data : acoesMock;
    } catch (err) {
      return acoesMock;
    }
  },

  // Busca uma ação pelo id (usado para carregar a tela de edição/detalhe)
  async buscarPorId(id) {
    try {
      const { data } = await api.get(`/actions/${id}`);
      return data ?? acoesMock.find((a) => a.id === String(id));
    } catch (err) {
      return acoesMock.find((a) => a.id === String(id)) ?? null;
    }
  },

  // Atualiza uma ação existente — PUT /actions/:id
  async atualizar(id, dados) {
    try {
      const { data } = await api.put(`/actions/${id}`, dados);
      return data;
    } catch (err) {
      // Simula sucesso quando o backend não está disponível
      return { id, ...dados };
    }
  },
};

export default acaoService;
