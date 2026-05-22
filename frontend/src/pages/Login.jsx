import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [tab, setTab] = useState('login');
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemLogin, setMensagemLogin] = useState('');
  const [mensagemCadastro, setMensagemCadastro] = useState('');
  const [modal, setModal] = useState({ aberto: false, texto: '', redirectAposFechar: false });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagemLogin('');
    try {
      const res = await api.post('/auth/login', { email: emailLogin, password: senhaLogin });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuarioLogado', emailLogin);
      setModal({ aberto: true, texto: 'Login realizado com sucesso!', redirectAposFechar: true });
    } catch {
      setMensagemLogin('Usuário ou senha inválidos.');
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagemCadastro('');
    if (senhaCadastro !== confirmarSenha) {
      setMensagemCadastro('As senhas não coincidem.');
      return;
    }
    try {
      await api.post('/auth/register', { email: emailCadastro, password: senhaCadastro });
      setModal({ aberto: true, texto: 'Cadastro realizado com sucesso.', redirectAposFechar: false });
    } catch {
      setMensagemCadastro('Erro ao realizar cadastro.');
    }
  };

  const fecharModal = () => {
    const redirecionar = modal.redirectAposFechar;
    setModal({ aberto: false, texto: '', redirectAposFechar: false });
    if (redirecionar) navigate('/actions');
  };

  return (
    <div className="auth-container">
      <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>

      <div className="auth-tabs">
        <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>
          Login
        </button>
        <button className={`auth-tab${tab === 'cadastro' ? ' active' : ''}`} onClick={() => setTab('cadastro')}>
          Criar Conta
        </button>
      </div>

      <div className="auth-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Usuário" width="80" />
      </div>

      {tab === 'login' && (
        <form className="auth-form" onSubmit={handleLogin}>
          <label>Email/Usuário</label>
          <input
            type="text"
            placeholder="Digite seu e-mail ou usuário"
            value={emailLogin}
            onChange={e => setEmailLogin(e.target.value)}
            required
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senhaLogin}
            onChange={e => setSenhaLogin(e.target.value)}
            required
            minLength={6}
          />
          <a href="#" className="auth-link">Esqueci minha senha</a>
          <button type="submit">Fazer Login</button>
          {mensagemLogin && <p style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>{mensagemLogin}</p>}
        </form>
      )}

      {tab === 'cadastro' && (
        <form className="auth-form" onSubmit={handleCadastro}>
          <label>Email/Usuário</label>
          <input
            type="text"
            placeholder="Digite seu e-mail ou usuário"
            value={emailCadastro}
            onChange={e => setEmailCadastro(e.target.value)}
            required
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senhaCadastro}
            onChange={e => setSenhaCadastro(e.target.value)}
            required
            minLength={6}
          />
          <label>Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit">Criar Conta</button>
          {mensagemCadastro && <p style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>{mensagemCadastro}</p>}
        </form>
      )}

      {modal.aberto && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-box">
            <span className="checkmark">✔</span>
            <p>{modal.texto}</p>
            <button onClick={fecharModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
