import api from './api';

// Serviço de Mensagens em lote.
// POST /messages  - envia uma mensagem para os voluntários de uma ação
// GET  /messages  - histórico de mensagens enviadas
const mensagemService = {
  // Envia uma mensagem em lote.
  // Se houver anexo, envia como multipart/form-data; caso contrário, JSON.
  async enviar(payload) {
    if (payload instanceof FormData) {
      const { data } = await api.post('/messages', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    }
    const { data } = await api.post('/messages', payload);
    return data;
  },

  // Histórico de mensagens enviadas
  async historico() {
    const { data } = await api.get('/messages');
    return data;
  },
};

export default mensagemService;
