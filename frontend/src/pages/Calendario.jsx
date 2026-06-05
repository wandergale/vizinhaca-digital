import { useState } from 'react';
import '../styles/calendario.css';

const acoes = [
  { titulo: "Mutirão de Limpeza", data: "2026-04-25", local: "Praça Central", prioridade: "alta" },
  { titulo: "Campanha de Doação", data: "2026-04-28", local: "Escola Municipal", prioridade: "media" },
  { titulo: "Plantio de Árvores", data: "2026-04-24", local: "Parque Verde", prioridade: "baixa" }
];

export default function Calendario() {
  const [visualizacao, setVisualizacao] = useState('mes');
  const [modalVisible, setModalVisible] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  function mostrarDetalhesRapidos(acao) {
    setAcaoSelecionada(acao);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
  }

  function abrirDetalhes() {
    window.location.href = "../html/detalhes-acao.html";
  }

  function renderizarCalendario() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    if (visualizacao === 'mes') return gerarCalendarioMes(ano, mes);
    if (visualizacao === 'semana') return gerarCalendarioSemana(hoje);
    return gerarCalendarioDia(hoje);
  }

  function gerarCalendarioMes(ano, mes) {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < primeiroDiaSemana; i++) {
      cells.push(<div key={`vazio-${i}`} className="dia" />);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const acao = acoes.find(a => {
        const dataAcao = new Date(a.data);
        return dataAcao.getDate() === dia && dataAcao.getMonth() === mes && dataAcao.getFullYear() === ano;
      });
      cells.push(
        <div key={dia} className="dia">
          {dia}
          {acao && (
            <span
              className={`acao ${acao.prioridade}`}
              onClick={() => mostrarDetalhesRapidos(acao)}
            >
              {acao.titulo}
            </span>
          )}
        </div>
      );
    }
    return cells;
  }

  function gerarCalendarioSemana(hoje) {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const diaAtual = new Date(hoje);
      diaAtual.setDate(hoje.getDate() + i);
      const acao = acoes.find(a => {
        const dataAcao = new Date(a.data);
        return dataAcao.toDateString() === diaAtual.toDateString();
      });
      cells.push(
        <div key={i} className="dia">
          {diaAtual.toLocaleDateString("pt-BR")}
          {acao && (
            <span
              className={`acao ${acao.prioridade}`}
              onClick={() => mostrarDetalhesRapidos(acao)}
            >
              {acao.titulo}
            </span>
          )}
        </div>
      );
    }
    return cells;
  }

  function gerarCalendarioDia(hoje) {
    const acao = acoes.find(a => {
      const dataAcao = new Date(a.data);
      return dataAcao.toDateString() === hoje.toDateString();
    });
    return (
      <div className="dia">
        {hoje.toLocaleDateString("pt-BR")}
        {acao && (
          <span
            className={`acao ${acao.prioridade}`}
            onClick={() => mostrarDetalhesRapidos(acao)}
          >
            {acao.titulo}
          </span>
        )}
      </div>
    );
  }

  const gridStyle = visualizacao === 'dia'
    ? { gridTemplateColumns: 'repeat(1, 1fr)' }
    : { gridTemplateColumns: 'repeat(7, 1fr)' };

  return (
    <div className="calendario-container">
      <h2>Calendário de Ações Comunitárias</h2>

      <div className="view-buttons">
        <button onClick={() => setVisualizacao('mes')}>Mês</button>
        <button onClick={() => setVisualizacao('semana')}>Semana</button>
        <button onClick={() => setVisualizacao('dia')}>Dia</button>
      </div>

      <div className="semana">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>

      <div id="calendario" style={gridStyle}>
        {renderizarCalendario()}
      </div>

      <div
        id="detalhesRapidos"
        className="modal"
        style={{ display: modalVisible ? 'block' : 'none' }}
      >
        <div className="modal-content">
          <h3 id="tituloAcao">{acaoSelecionada?.titulo}</h3>
          <p id="dataAcao">{acaoSelecionada ? `Data: ${acaoSelecionada.data}` : ''}</p>
          <p id="localAcao">{acaoSelecionada ? `Local: ${acaoSelecionada.local}` : ''}</p>
          <button onClick={abrirDetalhes}>Ver detalhes completos</button>
          <button onClick={fecharModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
