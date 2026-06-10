import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

// Links de navegação da sidebar — cada um aponta para uma rota real do app.
const NAV_LINKS = [
  { label: 'Início',              path: '/home',                icon: '🏠' },
  { label: 'Ações',               path: '/acoes',               icon: '📋' },
  { label: 'Calendário',          path: '/calendario',          icon: '📅' },
  { label: 'Cadastro de Ações',   path: '/cadastro-acoes',      icon: '➕' },
  { label: 'Inscrição',           path: '/inscricao-voluntario', icon: '🙋' },
  { label: 'Minhas Inscrições',   path: '/minhas-inscricoes',   icon: '📝' },
  { label: 'Painel de Inscrições', path: '/painel-inscricoes',  icon: '✅' },
  { label: 'Notificações',        path: '/notificacoes',        icon: '🔔' },
  { label: 'Mensagens',           path: '/mensagens',           icon: '✉️' },
  { label: 'Relatórios',          path: '/relatorios',          icon: '📊' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuarioLogado') || '';

  function handleSair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    navigate('/autenticacao');
  }

  return (
    <aside className="sidebar">
      <NavLink to="/home" className="sidebar-brand">
        <span className="sidebar-brand-icon">🏘️</span>
        <span className="sidebar-brand-name">Vizinhança Digital</span>
      </NavLink>

      <nav className="sidebar-nav">
        {NAV_LINKS.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <span className="sidebar-nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {usuario && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">{usuario.charAt(0)}</div>
            <span className="sidebar-username">{usuario}</span>
          </div>
        )}
        <button className="sidebar-sair" onClick={handleSair}>Sair</button>
      </div>
    </aside>
  );
}
