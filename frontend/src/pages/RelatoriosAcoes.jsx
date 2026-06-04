import { useState, useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';
import { jsPDF } from 'jspdf';
import '../styles/relatorios-acoes.css';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const acoesIniciais = [
  { titulo: "Revitalização Praça Central", data: "2026-05-11", local: "Praça Central", prioridade: "Alta", inscritos: 120, presenca: 95 },
  { titulo: "Pintura Escola Norte", data: "2026-05-18", local: "Escola Norte", prioridade: "Média", inscritos: 85, presenca: 92 },
  { titulo: "Limpeza Parque Águas", data: "2026-05-25", local: "Parque Águas", prioridade: "Baixa", inscritos: 60, presenca: 88 }
];

export default function RelatoriosAcoes() {
  const [filtrados, setFiltrados] = useState(acoesIniciais);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [local, setLocal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [acaoModal, setAcaoModal] = useState(null);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    renderGrafico(filtrados);
  }, [filtrados]);

  function renderGrafico(lista) {
    if (!canvasRef.current) return;
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    const ctx = canvasRef.current.getContext("2d");
    const contagem = { Alta: 0, Média: 0, Baixa: 0 };
    lista.forEach(acao => contagem[acao.prioridade]++);
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Alta", "Média", "Baixa"],
        datasets: [{
          label: "Ações por Prioridade",
          data: [contagem.Alta, contagem.Média, contagem.Baixa],
          backgroundColor: ["#e74c3c", "#f1c40f", "#2ecc71"]
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }

  function calcularResumo(lista) {
    const voluntariosUnicos = lista.reduce((acc, a) => acc + a.inscritos, 0);
    const horasTotais = lista.reduce((acc, a) => acc + (a.inscritos * (a.presenca / 100) * 4), 0);
    return {
      acoes: lista.length,
      voluntarios: voluntariosUnicos,
      inscricoes: voluntariosUnicos,
      horasInscricoes: voluntariosUnicos * 4,
      horasTotais: Math.round(horasTotais)
    };
  }

  const resumo = calcularResumo(filtrados);

  function aplicarFiltros() {
    let resultado = acoesIniciais;
    if (inicio) resultado = resultado.filter(a => a.data >= inicio);
    if (fim) resultado = resultado.filter(a => a.data <= fim);
    if (prioridade) resultado = resultado.filter(a => a.prioridade === prioridade);
    if (local) resultado = resultado.filter(a => a.local === local);
    setFiltrados(resultado);
  }

  function abrirDetalhes(index) {
    setAcaoModal(filtrados[index]);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
  }

  function exportarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Relatório de Ações Comunitárias", 20, 20);
    doc.setFontSize(12);
    doc.text(`Ações Realizadas: ${resumo.acoes}`, 20, 40);
    doc.text(`Voluntários Únicos: ${resumo.voluntarios}`, 20, 50);
    doc.text(`Total Inscrições: ${resumo.inscricoes}`, 20, 60);
    doc.text(`Horas Inscrições: ${resumo.horasInscricoes}`, 20, 70);
    doc.text(`Horas Totais: ${resumo.horasTotais}`, 20, 80);
    let y = 100;
    acoesIniciais.forEach(acao => {
      doc.text(
        `${acao.titulo} - ${acao.data} - ${acao.local} - ${acao.prioridade} - Inscritos: ${acao.inscritos} - Presença: ${acao.presenca}%`,
        20, y
      );
      y += 10;
    });
    doc.save("relatorio-acoes.pdf");
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav className="sidebar">
        <h2>Sistema de Cadastro e Agendamento de Ações Comunitárias</h2>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Administração</a></li>
          <li><a href="#">Períodos</a></li>
          <li><a href="#">Agendamentos</a></li>
          <li><a href="#">Ações</a></li>
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Sair</a></li>
        </ul>
      </nav>

      <main className="conteudo">
        <h1>Relatórios das Ações Comunitárias</h1>

        <section className="filtros">
          <div>
            <label>Período:</label>
            <input type="date" id="inicio" value={inicio} onChange={e => setInicio(e.target.value)} /> -
            <input type="date" id="fim" value={fim} onChange={e => setFim(e.target.value)} />
          </div>
          <div>
            <label>Prioridade:</label>
            <select id="prioridade" value={prioridade} onChange={e => setPrioridade(e.target.value)}>
              <option value="">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
          <div>
            <label>Localização:</label>
            <select id="local" value={local} onChange={e => setLocal(e.target.value)}>
              <option value="">Todos</option>
              <option value="Centro Comunitário Norte">Centro Comunitário Norte</option>
              <option value="Praça Central">Praça Central</option>
              <option value="Escola Norte">Escola Norte</option>
              <option value="Parque Águas">Parque Águas</option>
            </select>
          </div>
          <button id="gerar" onClick={aplicarFiltros}>Gerar Relatório</button>
          <button id="exportar-pdf" onClick={exportarPDF}>Exportar PDF</button>
        </section>

        <section className="resumo">
          <div className="box">Ações Realizadas: <strong id="acoes">{resumo.acoes}</strong></div>
          <div className="box">Voluntários Únicos: <strong id="voluntarios">{resumo.voluntarios}</strong></div>
          <div className="box">Total Inscrições: <strong id="inscricoes">{resumo.inscricoes}</strong></div>
          <div className="box">Horas Inscrições: <strong id="horas-inscricoes">{resumo.horasInscricoes}</strong></div>
          <div className="box">Horas Totais: <strong id="horas-totais">{resumo.horasTotais}</strong></div>
        </section>

        <section className="grafico">
          <canvas id="graficoPrioridades" ref={canvasRef} width="500" height="300" />
        </section>

        <section className="relatorios">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data Final</th>
                <th>Local</th>
                <th>Prioridade</th>
                <th>Inscritos</th>
                <th>Presença (%)</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody id="tabela-relatorios">
              {filtrados.map((acao, index) => (
                <tr key={index}>
                  <td>{acao.titulo}</td>
                  <td>{acao.data}</td>
                  <td>{acao.local}</td>
                  <td>{acao.prioridade}</td>
                  <td>{acao.inscritos}</td>
                  <td>{acao.presenca}%</td>
                  <td>
                    <button className="detalhe" onClick={() => abrirDetalhes(index)}>
                      Relatório Detalhado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <div
        id="modal"
        className="modal"
        style={{ display: modalVisible ? 'block' : 'none' }}
      >
        <div className="modal-box">
          <span id="modal-fechar" onClick={fecharModal}>&times;</span>
          <div id="modal-conteudo">
            {acaoModal && (
              <>
                <h2>{acaoModal.titulo}</h2>
                <p><strong>Data:</strong> {acaoModal.data}</p>
                <p><strong>Local:</strong> {acaoModal.local}</p>
                <p><strong>Prioridade:</strong> {acaoModal.prioridade}</p>
                <p><strong>Inscritos:</strong> {acaoModal.inscritos}</p>
                <p><strong>Presença:</strong> {acaoModal.presenca}%</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
