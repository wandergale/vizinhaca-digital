import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

import { 
  FaHome, FaClipboardList, FaCalendarAlt, FaPlus, FaUserCheck, 
  FaRegListAlt, FaCheckSquare, FaBell, FaEnvelope, FaChartBar, FaUsers 
} from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Início',              path: '/home',                icon: <FaHome /> },
  { label: 'Ações',               path: '/acoes',               icon: <FaClipboardList /> },
  { label: 'Calendário',          path: '/calendario',          icon: <FaCalendarAlt /> },
  { label: 'Cadastro de Ações',   path: '/cadastro-acoes',      icon: <FaPlus /> },
  { label: 'Inscrição',           path: '/inscricao-voluntario', icon: <FaUserCheck /> },
  { label: 'Minhas Inscrições',   path: '/minhas-inscricoes',   icon: <FaRegListAlt /> },
  { label: 'Painel de Inscrições', path: '/painel-inscricoes',  icon: <FaCheckSquare /> },
  { label: 'Notificações',        path: '/notificacoes',        icon: <FaBell /> },
  { label: 'Mensagens',           path: '/mensagens',           icon: <FaEnvelope /> },
  { label: 'Relatórios',          path: '/relatorios',          icon: <FaChartBar /> },
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
        <span className="sidebar-brand-icon"><FaUsers /></span>
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
