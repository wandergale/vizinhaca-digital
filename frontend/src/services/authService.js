import api from './api';

// Serviço de autenticação — POST /auth/login.
// Em caso de falha (backend indisponível), faz um login simulado (mock)
// para que o fluxo de telas continue navegável.
const authService = {
  async login(email, senha) {
    try {
      const { data } = await api.post('/auth/login', { email, password: senha });
      // Espera-se { token, user } — guarda o token para uso futuro
      if (data?.token) localStorage.setItem('token', data.token);
      const nome = data?.user?.name || email;
      localStorage.setItem('usuarioLogado', nome);
      return { ok: true, mock: false, nome };
    } catch (err) {
      // Login simulado: aceita qualquer e-mail/senha preenchidos
      localStorage.setItem('usuarioLogado', email);
      return { ok: true, mock: true, nome: email };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
  },
};

export default authService;
