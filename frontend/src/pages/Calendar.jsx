import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const acoesMock = [
  { titulo: 'Mutirão de Limpeza', data: '2026-04-25', local: 'Praça Central', prioridade: 'alta' },
  { titulo: 'Campanha de Doação', data: '2026-04-28', local: 'Escola Municipal', prioridade: 'media' },
  { titulo: 'Plantio de Árvores', data: '2026-04-24', local: 'Parque Verde', prioridade: 'baixa' },
];

function Calendar() {
  const [visualizacao, setVisualizacao] = useState('mes');
  const [modalAcao, setModalAcao] = useState(null);

  const hoje = new Date();

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const acaoNoDia = (data) =>
    acoesMock.find(a => new Date(a.data + 'T00:00:00').toDateString() === data.toDateString());

  const renderMes = () => {
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const celulas = [];

    for (let i = 0; i < primeiroDiaSemana; i++) {
      celulas.push(<div key={`v${i}`} className="dia-cell" />);
    }
    for (let dia = 1; dia <= ultimoDia; dia++) {
      const data = new Date(ano, mes, dia);
      const acao = acaoNoDia(data);
      celulas.push(
        <div key={dia} className="dia-cell">
          <strong>{dia}</strong>
          {acao && (
            <span className={`acao-tag ${acao.prioridade}`} onClick={() => setModalAcao(acao)}>
              {acao.titulo}
            </span>
          )}
        </div>
      );
    }
    return celulas;
  };

  const renderSemana = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      const acao = acaoNoDia(data);
      return (
        <div key={i} className="dia-cell">
          <strong>{data.toLocaleDateString('pt-BR')}</strong>
          {acao && (
            <span className={`acao-tag ${acao.prioridade}`} onClick={() => setModalAcao(acao)}>
              {acao.titulo}
            </span>
          )}
        </div>
      );
    });
  };

  const renderDia = () => {
    const acao = acaoNoDia(hoje);
    return (
      <div className="dia-cell" style={{ minHeight: 120 }}>
        <strong>{hoje.toLocaleDateString('pt-BR')}</strong>
        {acao && (
          <span className={`acao-tag ${acao.prioridade}`} onClick={() => setModalAcao(acao)}>
            {acao.titulo}
          </span>
        )}
      </div>
    );
  };

  const colunas = visualizacao === 'dia' ? 1 : 7;

  return (
    <div className="layout">
      <Sidebar ativo="Calendário" />
      <main className="content">
        <div className="calendario-container">
          <h2>Calendário de Ações Comunitárias</h2>

          <div className="view-buttons">
            <button className="btn-secondary" onClick={() => setVisualizacao('mes')}>Mês</button>
            <button className="btn-secondary" onClick={() => setVisualizacao('semana')}>Semana</button>
            <button className="btn-secondary" onClick={() => setVisualizacao('dia')}>Dia</button>
          </div>

          {visualizacao === 'mes' && (
            <div className="semana-header">
              {diasSemana.map(d => <div key={d}>{d}</div>)}
            </div>
          )}

          <div className="calendario-grid" style={{ gridTemplateColumns: `repeat(${colunas}, 1fr)` }}>
            {visualizacao === 'mes' && renderMes()}
            {visualizacao === 'semana' && renderSemana()}
            {visualizacao === 'dia' && renderDia()}
          </div>
        </div>
      </main>

      {modalAcao && (
        <div className="modal-overlay" onClick={() => setModalAcao(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>{modalAcao.titulo}</h3>
            <p>Data: {modalAcao.data}</p>
            <p>Local: {modalAcao.local}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
              <button className="btn-primary">Ver detalhes completos</button>
              <button className="btn-secondary" onClick={() => setModalAcao(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
