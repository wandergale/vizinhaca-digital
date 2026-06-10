import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/autenticacao.css';

const usuariosIniciais = [
  { usuario: "wendell", senha: "123456", email: "wendell@gmail.com" },
  { usuario: "emerson", senha: "abcdef", email: "emerson@yahoo.com" },
  { usuario: "teste", senha: "senha123", email: "teste@hotmail.com" }
];

export default function Autenticacao() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [activeForm, setActiveForm] = useState('login');
  // Para onde navegar ao fechar a confirmação (ex.: '/home' após o login)
  const [destinoConfirmacao, setDestinoConfirmacao] = useState(null);

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [mensagemLogin, setMensagemLogin] = useState('');

  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemCadastro, setMensagemCadastro] = useState('');

  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState('');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mensagemAlteracao, setMensagemAlteracao] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [textoConfirmacao, setTextoConfirmacao] = useState('');

  function abrirConfirmacao(texto, destino = null) {
    setTextoConfirmacao(texto);
    setDestinoConfirmacao(destino);
    setModalVisible(true);
  }

  function fecharConfirmacao() {
    setModalVisible(false);
    if (destinoConfirmacao) {
      navigate(destinoConfirmacao);
    } else {
      setActiveForm('login');
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const encontrado = usuarios.find(u =>
      (u.usuario === emailLogin || u.email === emailLogin) && u.senha === senhaLogin
    );
    if (encontrado) {
      localStorage.setItem("usuarioLogado", encontrado.usuario);
      abrirConfirmacao("Login realizado com sucesso!", '/home');
      setMensagemLogin('');
    } else {
      setMensagemLogin('Usuário ou senha inválidos.');
    }
  }

  function handleCadastroSubmit(e) {
    e.preventDefault();
    if (senhaCadastro === confirmarSenha) {
      setUsuarios(prev => [...prev, { usuario: emailCadastro, senha: senhaCadastro, email: emailCadastro }]);
      abrirConfirmacao("Cadastro realizado com sucesso.");
      setMensagemCadastro('');
    } else {
      setMensagemCadastro('As senhas não coincidem.');
    }
  }

  function handleRecuperacaoSubmit(e) {
    e.preventDefault();
    const encontrado = usuarios.find(u => u.email === emailRecuperacao);
    if (encontrado) {
      abrirConfirmacao("Um link de recuperação foi enviado para " + emailRecuperacao);
      setMensagemRecuperacao('');
    } else {
      setMensagemRecuperacao('E-mail não encontrado no sistema.');
    }
  }

  function handleAlterarSenhaSubmit(e) {
    e.preventDefault();
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    const usuario = usuarios.find(u => u.usuario === usuarioLogado);

    if (!usuario) {
      setMensagemAlteracao('Nenhum usuário logado.');
      return;
    }
    if (usuario.senha !== senhaAtual) {
      setMensagemAlteracao('Senha atual incorreta.');
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      setMensagemAlteracao('As novas senhas não coincidem.');
      return;
    }
    setUsuarios(prev => prev.map(u =>
      u.usuario === usuarioLogado ? { ...u, senha: novaSenha } : u
    ));
    abrirConfirmacao("Senha alterada com sucesso!");
    setMensagemAlteracao('');
  }

  return (
    <div className="auth-page">
    <div className="login-container">
      <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>

      <div className="tabs">
        <button
          className={`tab${activeForm === 'login' ? ' active' : ''}`}
          onClick={() => setActiveForm('login')}
        >Login</button>
        <button
          className={`tab${activeForm === 'cadastro' ? ' active' : ''}`}
          onClick={() => setActiveForm('cadastro')}
        >Criar Conta</button>
      </div>

      <div className="icon">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Usuário" width="80" />
      </div>

      <form
        id="formLogin"
        className={`form${activeForm === 'login' ? ' ativo' : ''}`}
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="emailLogin">Email/Usuário</label>
        <input
          type="text"
          id="emailLogin"
          placeholder="Digite seu e-mail ou usuário"
          required
          value={emailLogin}
          onChange={e => setEmailLogin(e.target.value)}
        />

        <label htmlFor="senhaLogin">Senha</label>
        <input
          type="password"
          id="senhaLogin"
          placeholder="Digite a senha"
          required
          minLength="6"
          value={senhaLogin}
          onChange={e => setSenhaLogin(e.target.value)}
        />

        <a href="#" className="link" onClick={e => { e.preventDefault(); setActiveForm('recuperacao'); }}>
          Esqueci minha senha
        </a>
        <a href="#" className="link" onClick={e => { e.preventDefault(); setActiveForm('alterarSenha'); }}>
          Alterar minha senha
        </a>

        <button type="submit">Fazer Login</button>
        <p id="mensagemLogin" style={{ color: mensagemLogin ? 'red' : undefined }}>
          {mensagemLogin}
        </p>
      </form>

      <form
        id="formCadastro"
        className={`form${activeForm === 'cadastro' ? ' ativo' : ''}`}
        onSubmit={handleCadastroSubmit}
      >
        <label htmlFor="emailCadastro">Email/Usuário</label>
        <input
          type="text"
          id="emailCadastro"
          placeholder="Digite seu e-mail ou usuário"
          required
          value={emailCadastro}
          onChange={e => setEmailCadastro(e.target.value)}
        />

        <label htmlFor="senhaCadastro">Senha</label>
        <input
          type="password"
          id="senhaCadastro"
          placeholder="Digite a senha"
          required
          minLength="6"
          value={senhaCadastro}
          onChange={e => setSenhaCadastro(e.target.value)}
        />

        <label htmlFor="confirmarSenha">Confirmar Senha</label>
        <input
          type="password"
          id="confirmarSenha"
          placeholder="Confirme a senha"
          required
          minLength="6"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
        />

        <button type="submit">Criar Conta</button>
        <p id="mensagemCadastro" style={{ color: mensagemCadastro ? 'red' : undefined }}>
          {mensagemCadastro}
        </p>
      </form>

      <form
        id="formRecuperacao"
        className={`form${activeForm === 'recuperacao' ? ' ativo' : ''}`}
        onSubmit={handleRecuperacaoSubmit}
      >
        <h3>Esqueceu sua Senha?</h3>
        <p>Informe seu e-mail cadastrado e enviaremos um link para criar uma nova senha.</p>

        <label htmlFor="emailRecuperacao">Seu e-mail</label>
        <input
          type="email"
          id="emailRecuperacao"
          placeholder="Digite seu e-mail"
          required
          value={emailRecuperacao}
          onChange={e => setEmailRecuperacao(e.target.value)}
        />

        <button type="submit">Enviar Link de Recuperação →</button>
        <p id="mensagemRecuperacao" style={{ color: mensagemRecuperacao ? 'red' : undefined }}>
          {mensagemRecuperacao}
        </p>
      </form>

      <form
        id="formAlterarSenha"
        className={`form${activeForm === 'alterarSenha' ? ' ativo' : ''}`}
        onSubmit={handleAlterarSenhaSubmit}
      >
        <h3>Alterar Senha</h3>

        <label htmlFor="senhaAtual">Senha atual</label>
        <input
          type="password"
          id="senhaAtual"
          placeholder="Digite a senha atual"
          required
          minLength="6"
          value={senhaAtual}
          onChange={e => setSenhaAtual(e.target.value)}
        />

        <label htmlFor="novaSenha">Nova senha</label>
        <input
          type="password"
          id="novaSenha"
          placeholder="Digite a nova senha"
          required
          minLength="6"
          value={novaSenha}
          onChange={e => setNovaSenha(e.target.value)}
        />

        <label htmlFor="confirmarNovaSenha">Confirmar nova senha</label>
        <input
          type="password"
          id="confirmarNovaSenha"
          placeholder="Confirme a nova senha"
          required
          minLength="6"
          value={confirmarNovaSenha}
          onChange={e => setConfirmarNovaSenha(e.target.value)}
        />

        <button type="submit">Salvar alterações</button>
        <p id="mensagemAlteracao" style={{ color: mensagemAlteracao ? 'red' : undefined }}>
          {mensagemAlteracao}
        </p>
      </form>

      <p className="auth-alt-link">
        <Link to="/login">Entrar pelo login da API →</Link>
      </p>

      <div id="confirmacao" className="modal" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="checkmark">✔</span>
          <p id="textoConfirmacao">{textoConfirmacao}</p>
          <button onClick={fecharConfirmacao}>OK</button>
        </div>
      </div>
    </div>
    </div>
  );
}
