import api from './api';

// Serviço de Notificações.
// GET /notifications/:usuarioId   - notificações de um usuário
// PATCH /notifications/:id/lida    - marca uma notificação como lida
const notificacaoService = {
  // Lista as notificações de um usuário
  async listarPorUsuario(usuarioId) {
    const { data } = await api.get(`/notifications/${usuarioId}`);
    return data;
  },

  // Marca uma notificação como lida
  async marcarComoLida(id) {
    const { data } = await api.patch(`/notifications/${id}/lida`);
    return data;
  },
};

export default notificacaoService;
