import api from './api';

// Serviço de Inscrições.
// GET /registrations lista todas as inscrições (somente líderes).
// As rotas de aprovar/rejeitar seguem o contrato do fluxo de aprovação;
// quando o backend ainda não as expõe, a tela mantém o estado localmente.
const inscricaoService = {
  // Lista todas as inscrições
  async listar() {
    const { data } = await api.get('/registrations');
    return data;
  },

  // Aprova uma inscrição — PATCH /registrations/:id/aprovar
  async aprovar(id) {
    const { data } = await api.patch(`/registrations/${id}/aprovar`);
    return data;
  },

  // Rejeita uma inscrição — PATCH /registrations/:id/rejeitar
  async rejeitar(id) {
    const { data } = await api.patch(`/registrations/${id}/rejeitar`);
    return data;
  },
};

export default inscricaoService;
