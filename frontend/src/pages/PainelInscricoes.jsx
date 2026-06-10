import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import inscricaoService from '../services/inscricaoService';
import '../styles/painel-inscricoes.css';

const inscritosIniciais = [
  { id: "1", nome: "Ana Paula Souza", email: "ana.souza@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Alta", status: "Confirmado" },
  { id: "2", nome: "Carlos Eduardo Lima", email: "carlos.lima@yahoo.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Média", status: "Pendente" },
  { id: "3", nome: "Fernanda Oliveira", email: "fernanda.oliveira@hotmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Confirmado" },
  { id: "4", nome: "Roberto Santos", email: "roberto.santos@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Média", status: "Pendente" },
  { id: "5", nome: "Patrícia Gomes", email: "patricia.gomes@gmail.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Alta", status: "Confirmado" },
  { id: "6", nome: "Lucas Almeida", email: "lucas.almeida@gmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Pendente" },
  { id: "7", nome: "Mariana Costa", email: "mariana.costa@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Alta", status: "Confirmado" },
  { id: "8", nome: "João Pedro Nunes", email: "joao.nunes@gmail.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Média", status: "Pendente" },
  { id: "9", nome: "Cláudia Ferreira", email: "claudia.ferreira@gmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Confirmado" },
  { id: "10", nome: "Bruno Martins", email: "bruno.martins@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Média", status: "Pendente" }
];

// Converte a inscrição vinda do backend para o formato usado na tabela
function mapearInscricao(r) {
  return {
    id: r.id,
    nome: r.user?.name ?? r.nome ?? '—',
    email: r.user?.email ?? r.email ?? '—',
    acao: r.action?.title ?? r.acao ?? '—',
    data: (r.action?.date ?? r.data ?? '').toString().slice(0, 10),
    prioridade: r.action?.priority ?? r.prioridade ?? 'Média',
    status: r.status ?? 'Pendente',
  };
}

export default function PainelInscricoes() {
  const [inscritos, setInscritos] = useState(inscritosIniciais);
  const [filtroAcao, setFiltroAcao] = useState('');
  const [filtroPrioridade, setFiltroPrioridade] = useState('');
  const [filtrados, setFiltrados] = useState(inscritosIniciais);
  const [modalVisible, setModalVisible] = useState(false);
  const [voluntarioModal, setVoluntarioModal] = useState(null);

  // Busca inscrições no backend — GET /registrations. Em caso de falha,
  // mantém os dados de exemplo para a tela continuar demonstrável.
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await inscricaoService.listar();
        if (Array.isArray(dados) && dados.length > 0) {
          const mapeados = dados.map(mapearInscricao);
          setInscritos(mapeados);
          setFiltrados(mapeados);
        }
      } catch (err) {
        // Backend indisponível — segue com inscritosIniciais
      }
    }
    carregar();
  }, []);

  function calcularResumo(lista) {
    return {
      total: lista.length,
      pendentes: lista.filter(v => v.status === "Pendente").length,
      acoesVagas: new Set(lista.map(v => v.acao)).size,
      voluntariosAtivos: lista.filter(v => v.status === "Confirmado").length
    };
  }

  const resumo = calcularResumo(filtrados);

  // Atualiza o status localmente e dispara a chamada ao backend
  function atualizarStatus(itemOriginal, novoStatus) {
    const novoInscritos = inscritos.map(v =>
      v.id === itemOriginal.id ? { ...v, status: novoStatus } : v
    );
    setInscritos(novoInscritos);
    aplicarFiltrosNaLista(novoInscritos, filtroAcao, filtroPrioridade);
  }

  // PATCH /registrations/:id/aprovar
  async function aprovarInscricao(index) {
    const itemOriginal = filtrados[index];
    atualizarStatus(itemOriginal, "Confirmado");
    try {
      await inscricaoService.aprovar(itemOriginal.id);
    } catch (err) {
      // Mantém o estado local caso o backend ainda não exponha a rota
    }
  }

  // PATCH /registrations/:id/rejeitar
  async function rejeitarInscricao(index) {
    const itemOriginal = filtrados[index];
    atualizarStatus(itemOriginal, "Rejeitado");
    try {
      await inscricaoService.rejeitar(itemOriginal.id);
    } catch (err) {
      // Mantém o estado local caso o backend ainda não exponha a rota
    }
  }

  function abrirDetalhes(index) {
    setVoluntarioModal(filtrados[index]);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
  }

  function aplicarFiltrosNaLista(lista, acao, prioridade) {
    let resultado = lista;
    if (acao) resultado = resultado.filter(v => v.acao === acao);
    if (prioridade) resultado = resultado.filter(v => v.prioridade === prioridade);
    setFiltrados(resultado);
  }

  function aplicarFiltros() {
    aplicarFiltrosNaLista(inscritos, filtroAcao, filtroPrioridade);
  }

  function exportarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Relatório de Inscrições", 20, 20);
    doc.setFontSize(10);
    doc.text(`Total de Inscrições: ${resumo.total}`, 20, 40);
    doc.text(`Pendentes: ${resumo.pendentes}`, 20, 50);
    doc.text(`Ações com Vagas: ${resumo.acoesVagas}`, 20, 60);
    doc.text(`Voluntários Ativos: ${resumo.voluntariosAtivos}`, 20, 70);
    let y = 90;
    inscritos.forEach(vol => {
      doc.text(`${vol.nome} - ${vol.email} - ${vol.acao} - ${vol.data} - ${vol.prioridade} - ${vol.status}`, 20, y);
      y += 10;
    });
    doc.save("relatorio-inscricoes.pdf");
  }

  return (
    <>
      <main className="conteudo">
        <h1>Acompanhamento de Inscrições</h1>

        <section className="resumo">
          <div className="box">Total de Inscrições: <strong id="total-inscricoes">{resumo.total}</strong></div>
          <div className="box">Inscrições Pendentes: <strong id="pendentes">{resumo.pendentes}</strong></div>
          <div className="box">Ações com Vagas: <strong id="acoes-vagas">{resumo.acoesVagas}</strong></div>
          <div className="box">Voluntários Ativos: <strong id="voluntarios-ativos">{resumo.voluntariosAtivos}</strong></div>
        </section>

        <section className="filtros">
          <div>
            <label>Selecionar Ação:</label>
            <select id="acao" value={filtroAcao} onChange={e => setFiltroAcao(e.target.value)}>
              <option value="">Todas</option>
              <option value="Revitalização Praça">Revitalização Praça</option>
              <option value="Pintura Escola Norte">Pintura Escola Norte</option>
              <option value="Limpeza Parque Águas">Limpeza Parque Águas</option>
            </select>
          </div>
          <div>
            <label>Prioridade:</label>
            <select id="prioridade" value={filtroPrioridade} onChange={e => setFiltroPrioridade(e.target.value)}>
              <option value="">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
          <button id="filtrar" onClick={aplicarFiltros}>Filtrar</button>
          <button id="ver-calendario">Ver no Calendário</button>
          <button id="gerar-relatorio" onClick={exportarPDF}>Gerar Relatório</button>
        </section>

        <section className="inscricoes">
          <table>
            <thead>
              <tr>
                <th>Voluntário</th>
                <th>E-mail</th>
                <th>Ação Comunitária</th>
                <th>Data</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="tabela-inscricoes">
              {filtrados.map((vol, index) => (
                <tr key={index}>
                  <td>{vol.nome}</td>
                  <td>{vol.email}</td>
                  <td>{vol.acao}</td>
                  <td>{vol.data}</td>
                  <td>{vol.prioridade}</td>
                  <td>{vol.status}</td>
                  <td>
                    <button className="aprovar" onClick={() => aprovarInscricao(index)}>✔</button>
                    <button className="rejeitar" onClick={() => rejeitarInscricao(index)}>✖</button>
                    <button className="detalhes" onClick={() => abrirDetalhes(index)}>ℹ</button>
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
            {voluntarioModal && (
              <>
                <h2>{voluntarioModal.nome}</h2>
                <p><strong>Email:</strong> {voluntarioModal.email}</p>
                <p><strong>Ação:</strong> {voluntarioModal.acao}</p>
                <p><strong>Data:</strong> {voluntarioModal.data}</p>
                <p><strong>Prioridade:</strong> {voluntarioModal.prioridade}</p>
                <p><strong>Status:</strong> {voluntarioModal.status}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
