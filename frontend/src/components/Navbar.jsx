import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const NAV_LINKS = [
  { label: 'Início',           path: '/home' },
  { label: 'Ações',            path: '/acoes' },
  { label: 'Calendário',       path: '/calendario' },
  { label: 'Cadastro de Ações', path: '/cadastro-acoes' },
  { label: 'Inscrição',        path: '/inscricao-voluntario' },
  { label: 'Minhas Inscrições', path: '/minhas-inscricoes' },
  { label: 'Painel',           path: '/painel-inscricoes' },
  { label: 'Notificações',     path: '/notificacoes' },
  { label: 'Mensagens',        path: '/mensagens' },
  { label: 'Relatórios',       path: '/relatorios' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuarioLogado') || '';

  function handleSair() {
    localStorage.removeItem('usuarioLogado');
    navigate('/autenticacao');
  }

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
        <div className="navbar-brand-icon">🏘️</div>
        <span className="navbar-brand-name">Vizinhança Digital</span>
      </Link>

      <ul className="navbar-links">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={path}>
            <Link to={path} className={pathname === path ? 'active' : ''}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-right">
        {usuario && (
          <>
            <div className="navbar-avatar">{usuario.charAt(0)}</div>
            <span className="navbar-username">{usuario}</span>
          </>
        )}
        <button className="navbar-sair" onClick={handleSair}>Sair</button>
      </div>
    </nav>
  );
}
