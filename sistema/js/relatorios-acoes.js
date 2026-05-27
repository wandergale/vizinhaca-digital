const acoes = [
  { titulo: "Revitalização Praça Central", data: "2026-05-11", local: "Praça Central", prioridade: "Alta", inscritos: 120, presenca: 95 },
  { titulo: "Pintura Escola Norte", data: "2026-05-18", local: "Escola Norte", prioridade: "Média", inscritos: 85, presenca: 92 },
  { titulo: "Limpeza Parque Águas", data: "2026-05-25", local: "Parque Águas", prioridade: "Baixa", inscritos: 60, presenca: 88 }
];


function renderTabela(lista) {
  const tbody = document.getElementById("tabela-relatorios");
  tbody.innerHTML = "";
  lista.forEach((acao, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${acao.titulo}</td>
      <td>${acao.data}</td>
      <td>${acao.local}</td>
      <td>${acao.prioridade}</td>
      <td>${acao.inscritos}</td>
      <td>${acao.presenca}%</td>
      <td><button class="detalhe" data-index="${index}">Relatório Detalhado</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".detalhe").forEach(btn => {
    btn.addEventListener("click", abrirDetalhes);
  });
}

function abrirDetalhes(event) {
  const index = event.target.getAttribute("data-index");
  const acao = acoes[index];

  const modal = document.getElementById("modal");
  const conteudo = document.getElementById("modal-conteudo");

  conteudo.innerHTML = `
    <h2>${acao.titulo}</h2>
    <p><strong>Data:</strong> ${acao.data}</p>
    <p><strong>Local:</strong> ${acao.local}</p>
    <p><strong>Prioridade:</strong> ${acao.prioridade}</p>
    <p><strong>Inscritos:</strong> ${acao.inscritos}</p>
    <p><strong>Presença:</strong> ${acao.presenca}%</p>
  `;

  modal.style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function atualizarResumo(lista) {
  document.getElementById("acoes").textContent = lista.length;

  const voluntariosUnicos = lista.reduce((acc, acao) => acc + acao.inscritos, 0);
  document.getElementById("voluntarios").textContent = voluntariosUnicos;
  document.getElementById("inscricoes").textContent = voluntariosUnicos;

  const horasInscricoes = voluntariosUnicos * 4;
  document.getElementById("horas-inscricoes").textContent = horasInscricoes;

  const horasTotais = lista.reduce((acc, acao) => {
    return acc + (acao.inscritos * (acao.presenca / 100) * 4);
  }, 0);
  document.getElementById("horas-totais").textContent = Math.round(horasTotais);
}

function renderGrafico(lista) {
  const ctx = document.getElementById("graficoPrioridades").getContext("2d");

  const contagem = { Alta: 0, Média: 0, Baixa: 0 };
  lista.forEach(acao => contagem[acao.prioridade]++);

  new Chart(ctx, {
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

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Relatório de Ações Comunitárias", 20, 20);

  doc.setFontSize(12);
  doc.text(`Ações Realizadas: ${document.getElementById("acoes").textContent}`, 20, 40);
  doc.text(`Voluntários Únicos: ${document.getElementById("voluntarios").textContent}`, 20, 50);
  doc.text(`Total Inscrições: ${document.getElementById("inscricoes").textContent}`, 20, 60);
  doc.text(`Horas Inscrições: ${document.getElementById("horas-inscricoes").textContent}`, 20, 70);
  doc.text(`Horas Totais: ${document.getElementById("horas-totais").textContent}`, 20, 80);

  let y = 100;
  acoes.forEach(acao => {
    doc.text(`${acao.titulo} - ${acao.data} - ${acao.local} - ${acao.prioridade} - Inscritos: ${acao.inscritos} - Presença: ${acao.presenca}%`, 20, y);
    y += 10;
  });

  doc.save("relatorio-acoes.pdf");
}

function aplicarFiltros() {
  const inicio = document.getElementById("inicio").value;
  const fim = document.getElementById("fim").value;
  const prioridade = document.getElementById("prioridade").value;
  const local = document.getElementById("local").value;

  let filtrados = acoes;
  if (inicio) filtrados = filtrados.filter(acao => acao.data >= inicio);
  if (fim) filtrados = filtrados.filter(acao => acao.data <= fim);
  if (prioridade) filtrados = filtrados.filter(acao => acao.prioridade === prioridade);
  if (local) filtrados = filtrados.filter(acao => acao.local === local);

  renderTabela(filtrados);
  atualizarResumo(filtrados);
  renderGrafico(filtrados);
}

document.getElementById("gerar").addEventListener("click", aplicarFiltros);
document.getElementById("exportar-pdf").addEventListener("click", exportarPDF);
document.getElementById("modal-fechar").addEventListener("click", fecharModal);

renderTabela(acoes);
atualizarResumo(acoes);
renderGrafico(acoes);