import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import acaoService from '../services/acaoService';
import '../styles/home.css';

import { 
  FaClipboardList, FaPlus, FaUserCheck, FaRegListAlt, FaCheckSquare, 
  FaCalendarAlt, FaBell, FaEnvelope, FaChartBar 
} from 'react-icons/fa';

const ATALHOS = [
  { path: '/acoes',               icon: <FaClipboardList />, titulo: 'Ações',              desc: 'Veja todas as ações comunitárias disponíveis.' },
  { path: '/cadastro-acoes',      icon: <FaPlus />,          titulo: 'Cadastro de Ações',  desc: 'Crie e gerencie novas ações.' },
  { path: '/inscricao-voluntario', icon: <FaUserCheck />,    titulo: 'Inscrição',          desc: 'Inscreva-se como voluntário em uma ação.' },
  { path: '/minhas-inscricoes',   icon: <FaRegListAlt />,    titulo: 'Minhas Inscrições',  desc: 'Edite ou cancele suas inscrições.' },
  { path: '/painel-inscricoes',   icon: <FaCheckSquare />,   titulo: 'Painel de Inscrições', desc: 'Aprove ou rejeite inscrições (líder).' },
  { path: '/calendario',          icon: <FaCalendarAlt />,   titulo: 'Calendário',         desc: 'Visualize as ações por data.' },
  { path: '/notificacoes',        icon: <FaBell />,          titulo: 'Notificações',       desc: 'Acompanhe avisos e atualizações.' },
  { path: '/mensagens',           icon: <FaEnvelope />,      titulo: 'Mensagens',          desc: 'Envie mensagens em lote aos voluntários.' },
  { path: '/relatorios',          icon: <FaChartBar />,      titulo: 'Relatórios',         desc: 'Gere relatórios das ações.' },
];

export default function Home() {
  const usuario = localStorage.getItem('usuarioLogado') || 'voluntário';
  const [totalAcoes, setTotalAcoes] = useState(null);

  useEffect(() => {
    acaoService.listar()
      .then((acoes) => setTotalAcoes(acoes.length))
      .catch(() => setTotalAcoes(0));
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Que bom ter você por aqui, {usuario}</h1>
        <p>Seja muito bem-vindo ao Vizinhança Digital. Escolha por onde começar.</p>
      </header>

      <section className="home-stats">
        <div className="home-stat">
          <strong>{totalAcoes ?? '—'}</strong>
          <span>Ações disponíveis</span>
        </div>
        <div className="home-stat">
          <strong>{ATALHOS.length}</strong>
          <span>Áreas do sistema</span>
        </div>
      </section>

      <section className="home-grid">
        {ATALHOS.map((a) => (
          <Link key={a.path} to={a.path} className="home-card">
            <span className="home-card-icon">{a.icon}</span>
            <h3>{a.titulo}</h3>
            <p>{a.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
