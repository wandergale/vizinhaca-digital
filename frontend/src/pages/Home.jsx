import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import acaoService from '../services/acaoService';
import '../styles/home.css';

// Cartões de navegação que dão acesso a todas as telas do sistema.
const ATALHOS = [
  { path: '/acoes',               icon: '📋', titulo: 'Ações',              desc: 'Veja todas as ações comunitárias disponíveis.' },
  { path: '/cadastro-acoes',      icon: '➕', titulo: 'Cadastro de Ações',  desc: 'Crie e gerencie novas ações.' },
  { path: '/inscricao-voluntario', icon: '🙋', titulo: 'Inscrição',         desc: 'Inscreva-se como voluntário em uma ação.' },
  { path: '/minhas-inscricoes',   icon: '📝', titulo: 'Minhas Inscrições',  desc: 'Edite ou cancele suas inscrições.' },
  { path: '/painel-inscricoes',   icon: '✅', titulo: 'Painel de Inscrições', desc: 'Aprove ou rejeite inscrições (líder).' },
  { path: '/calendario',          icon: '📅', titulo: 'Calendário',         desc: 'Visualize as ações por data.' },
  { path: '/notificacoes',        icon: '🔔', titulo: 'Notificações',       desc: 'Acompanhe avisos e atualizações.' },
  { path: '/mensagens',           icon: '✉️', titulo: 'Mensagens',          desc: 'Envie mensagens em lote aos voluntários.' },
  { path: '/relatorios',          icon: '📊', titulo: 'Relatórios',         desc: 'Gere relatórios das ações.' },
];

export default function Home() {
  const usuario = localStorage.getItem('usuarioLogado') || 'voluntário';
  const [totalAcoes, setTotalAcoes] = useState(null);

  useEffect(() => {
    acaoService.listar().then((acoes) => setTotalAcoes(acoes.length)).catch(() => setTotalAcoes(0));
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Olá, {usuario} 👋</h1>
        <p>Bem-vindo ao Vizinhança Digital. Escolha por onde começar.</p>
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
