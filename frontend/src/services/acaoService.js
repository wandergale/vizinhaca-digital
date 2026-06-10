import api from './api';

// Serviço de Ações Comunitárias.
// Endpoints reais no backend: GET /actions, GET /actions/:id, PUT /actions/:id
const acaoService = {
  // Lista todas as ações
  async listar() {
    const { data } = await api.get('/actions');
    return data;
  },

  // Busca uma ação pelo id (usado para carregar a tela de edição)
  async buscarPorId(id) {
    const { data } = await api.get(`/actions/${id}`);
    return data;
  },

  // Atualiza uma ação existente — PUT /actions/:id
  async atualizar(id, dados) {
    const { data } = await api.put(`/actions/${id}`, dados);
    return data;
  },
};

export default acaoService;
