import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/login.css';

// Login conectado à API (POST /auth/login), com fallback simulado.
// Redireciona para a Home após autenticar.
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const res = await authService.login(email, senha);
      if (res.ok) navigate('/home');
    } catch (err) {
      setErro('Não foi possível entrar. Verifique suas credenciais.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-icon">🏘️</div>
        <h1>Vizinhança Digital</h1>
        <p className="login-sub">Entre com sua conta</p>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>

        {erro && <p className="login-erro">{erro}</p>}

        <Link to="/autenticacao" className="login-alt">
          Criar conta ou recuperar senha →
        </Link>
      </form>
    </div>
  );
}
