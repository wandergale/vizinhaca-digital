const inscritos = [
  { nome: "Ana Paula Souza", email: "ana.souza@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Alta", status: "Confirmado" },
  { nome: "Carlos Eduardo Lima", email: "carlos.lima@yahoo.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Média", status: "Pendente" },
  { nome: "Fernanda Oliveira", email: "fernanda.oliveira@hotmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Confirmado" },
  { nome: "Roberto Santos", email: "roberto.santos@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Média", status: "Pendente" },
  { nome: "Patrícia Gomes", email: "patricia.gomes@gmail.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Alta", status: "Confirmado" },
  { nome: "Lucas Almeida", email: "lucas.almeida@gmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Pendente" },
  { nome: "Mariana Costa", email: "mariana.costa@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Alta", status: "Confirmado" },
  { nome: "João Pedro Nunes", email: "joao.nunes@gmail.com", acao: "Pintura Escola Norte", data: "2026-05-18", prioridade: "Média", status: "Pendente" },
  { nome: "Cláudia Ferreira", email: "claudia.ferreira@gmail.com", acao: "Limpeza Parque Águas", data: "2026-05-25", prioridade: "Baixa", status: "Confirmado" },
  { nome: "Bruno Martins", email: "bruno.martins@gmail.com", acao: "Revitalização Praça", data: "2026-05-11", prioridade: "Média", status: "Pendente" }
];

function renderTabela(lista) {
  const tbody = document.getElementById("tabela-inscricoes");
  tbody.innerHTML = "";
  lista.forEach((vol, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${vol.nome}</td>
      <td>${vol.email}</td>
      <td>${vol.acao}</td>
      <td>${vol.data}</td>
      <td>${vol.prioridade}</td>
      <td>${vol.status}</td>
      <td>
        <button class="aprovar" data-index="${index}">✔</button>
        <button class="rejeitar" data-index="${index}">✖</button>
        <button class="detalhes" data-index="${index}">ℹ</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".aprovar").forEach(btn => btn.addEventListener("click", aprovarInscricao));
  document.querySelectorAll(".rejeitar").forEach(btn => btn.addEventListener("click", rejeitarInscricao));
  document.querySelectorAll(".detalhes").forEach(btn => btn.addEventListener("click", abrirDetalhes));
}

function atualizarResumo(lista) {
  document.getElementById("total-inscricoes").textContent = lista.length;
  document.getElementById("pendentes").textContent = lista.filter(v => v.status === "Pendente").length;
  document.getElementById("acoes-vagas").textContent = new Set(lista.map(v => v.acao)).size;
  document.getElementById("voluntarios-ativos").textContent = lista.filter(v => v.status === "Confirmado").length;
}

function aprovarInscricao(event) {
  const index = event.target.getAttribute("data-index");
  inscritos[index].status = "Confirmado";
  renderTabela(inscritos);
  atualizarResumo(inscritos);
}

function rejeitarInscricao(event) {
  const index = event.target.getAttribute("data-index");
  inscritos[index].status = "Rejeitado";
  renderTabela(inscritos);
  atualizarResumo(inscritos);
}

function abrirDetalhes(event) {
  const index = event.target.getAttribute("data-index");
  const vol = inscritos[index];
  const modal = document.getElementById("modal");
  const conteudo = document.getElementById("modal-conteudo");

  conteudo.innerHTML = `
    <h2>${vol.nome}</h2>
    <p><strong>Email:</strong> ${vol.email}</p>
    <p><strong>Ação:</strong> ${vol.acao}</p>
    <p><strong>Data:</strong> ${vol.data}</p>
    <p><strong>Prioridade:</strong> ${vol.prioridade}</p>
    <p><strong>Status:</strong> ${vol.status}</p>
  `;
  modal.style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Relatório de Inscrições", 20, 20);

  doc.setFontSize(10);
  doc.text(`Total de Inscrições: ${document.getElementById("total-inscricoes").textContent}`, 20, 40);
  doc.text(`Pendentes: ${document.getElementById("pendentes").textContent}`, 20, 50);
  doc.text(`Ações com Vagas: ${document.getElementById("acoes-vagas").textContent}`, 20, 60);
  doc.text(`Voluntários Ativos: ${document.getElementById("voluntarios-ativos").textContent}`, 20, 70);

  let y = 90;
  inscritos.forEach(vol => {
    doc.text(`${vol.nome} - ${vol.email} - ${vol.acao} - ${vol.data} - ${vol.prioridade} - ${vol.status}`, 20, y);
    y += 10;
  });

  doc.save("relatorio-inscricoes.pdf");
}

function aplicarFiltros() {
  const acao = document.getElementById("acao").value;
  const prioridade = document.getElementById("prioridade").value;

  let filtrados = inscritos;
  if (acao) filtrados = filtrados.filter(v => v.acao === acao);
  if (prioridade) filtrados = filtrados.filter(v => v.prioridade === prioridade);

  renderTabela(filtrados);
  atualizarResumo(filtrados);
}

document.getElementById("filtrar").addEventListener("click", aplicarFiltros);
document.getElementById("gerar-relatorio").addEventListener("click", exportarPDF);
document.getElementById("modal-fechar").addEventListener("click", fecharModal);

renderTabela(inscritos);
atualizarResumo(inscritos);