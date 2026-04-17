const acoes = [
  { titulo: "Mutirão de Limpeza", data: "2026-04-25", local: "Praça Central", prioridade: "alta" },
  { titulo: "Campanha de Doação", data: "2026-04-28", local: "Escola Municipal", prioridade: "media" },
  { titulo: "Plantio de Árvores", data: "2026-04-24", local: "Parque Verde", prioridade: "baixa" }
];

let visualizacaoAtual = "mes";

function mudarVisualizacao(tipo) {
  visualizacaoAtual = tipo;
  renderizarCalendario();
}

function renderizarCalendario() {
  const calendario = document.getElementById("calendario");
  calendario.innerHTML = "";

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  if (visualizacaoAtual === "mes") {
    gerarCalendarioMes(ano, mes);
  } else if (visualizacaoAtual === "semana") {
    gerarCalendarioSemana(hoje);
  } else {
    gerarCalendarioDia(hoje);
  }
}

function gerarCalendarioMes(ano, mes) {
  const calendario = document.getElementById("calendario");
  calendario.style.gridTemplateColumns = "repeat(7, 1fr)";

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiroDiaSemana; i++) {
    const vazio = document.createElement("div");
    vazio.classList.add("dia");
    calendario.appendChild(vazio);
  }

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const div = document.createElement("div");
    div.classList.add("dia");
    div.textContent = dia;

    const acao = acoes.find(a => {
      const dataAcao = new Date(a.data);
      return dataAcao.getDate() === dia && dataAcao.getMonth() === mes && dataAcao.getFullYear() === ano;
    });

    if (acao) {
      const span = document.createElement("span");
      span.classList.add("acao", acao.prioridade);
      span.textContent = acao.titulo;
      span.onclick = () => mostrarDetalhesRapidos(acao);
      div.appendChild(span);
    }

    calendario.appendChild(div);
  }
}

function gerarCalendarioSemana(hoje) {
  const calendario = document.getElementById("calendario");
  calendario.style.gridTemplateColumns = "repeat(7, 1fr)";

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(hoje);
    diaAtual.setDate(hoje.getDate() + i);

    const div = document.createElement("div");
    div.classList.add("dia");
    div.textContent = diaAtual.toLocaleDateString("pt-BR");

    const acao = acoes.find(a => {
      const dataAcao = new Date(a.data);
      return dataAcao.toDateString() === diaAtual.toDateString();
    });

    if (acao) {
      const span = document.createElement("span");
      span.classList.add("acao", acao.prioridade);
      span.textContent = acao.titulo;
      span.onclick = () => mostrarDetalhesRapidos(acao);
      div.appendChild(span);
    }

    calendario.appendChild(div);
  }
}

function gerarCalendarioDia(hoje) {
  const calendario = document.getElementById("calendario");
  calendario.style.gridTemplateColumns = "repeat(1, 1fr)";

  const div = document.createElement("div");
  div.classList.add("dia");
  div.textContent = hoje.toLocaleDateString("pt-BR");

  const acao = acoes.find(a => {
    const dataAcao = new Date(a.data);
    return dataAcao.toDateString() === hoje.toDateString();
  });

  if (acao) {
    const span = document.createElement("span");
    span.classList.add("acao", acao.prioridade);
    span.textContent = acao.titulo;
    span.onclick = () => mostrarDetalhesRapidos(acao);
    div.appendChild(span);
  }

  calendario.appendChild(div);
}

function mostrarDetalhesRapidos(acao) {
  document.getElementById("tituloAcao").textContent = acao.titulo;
  document.getElementById("dataAcao").textContent = "Data: " + acao.data;
  document.getElementById("localAcao").textContent = "Local: " + acao.local;
  document.getElementById("detalhesRapidos").style.display = "block";
}

function fecharModal() {
  document.getElementById("detalhesRapidos").style.display = "none";
}

function abrirDetalhes() {
  window.location.href = "../html/detalhes-acao.html";
}

renderizarCalendario();