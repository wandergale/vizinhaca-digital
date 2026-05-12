function abrirModal(titulo, descricao, data, local, prioridade) {
  document.getElementById("titulo").textContent = titulo;
  document.getElementById("descricao").textContent = descricao;
  document.getElementById("data").textContent = data;
  document.getElementById("local").textContent = local;
  document.getElementById("prioridade").textContent = prioridade;

  document.getElementById("modal").style.display = "flex";
}

function mostrarTab(tab) {
  document.getElementById("detalhes").style.display = tab === "detalhes" ? "block" : "none";
  document.getElementById("mapa").style.display = tab === "mapa" ? "block" : "none";

  const botoes = document.querySelectorAll(".tabs button");
  botoes.forEach(btn => btn.classList.remove("active"));
  if (tab === "detalhes") {
    botoes[0].classList.add("active");
  } else {
    botoes[1].classList.add("active");
  }
}

function confirmarInscricao() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const acao = document.getElementById("acao").value;

  if (!acao) {
    alert("Por favor, selecione uma ação.");
    return false;
  }

  const novaInscricao = {
    id: Date.now(),
    nome,
    email,
    acao,
    data: acao.includes("11/05") ? "11/05/2026" : "13/05/2026",
    local: "Praça Central"
  };

  let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
  inscricoes.push(novaInscricao);
  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

  document.getElementById("modalConfirmacao").style.display = "flex";
  document.getElementById("dadosInscricao").innerHTML =
    `<strong>Nome:</strong> ${nome}<br>
     <strong>Email:</strong> ${email}<br>
     <strong>Ação:</strong> ${acao}`;

  return false;
}

function fecharConfirmacao() {
  document.getElementById("modalConfirmacao").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === modalConfirmacao) {
    modalConfirmacao.style.display = "none";
  }
};