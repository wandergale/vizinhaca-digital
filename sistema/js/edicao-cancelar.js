let minhasInscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
let inscricaoSelecionada = null;

function carregarInscricoes() {
  const tbody = document.getElementById("listaInscricoes");
  tbody.innerHTML = "";
  minhasInscricoes.forEach(insc => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${insc.acao}</td>
      <td>${insc.data}</td>
      <td>${insc.local}</td>
      <td>
        <button onclick="abrirEdicao(${insc.id})">Editar</button>
        <button onclick="abrirCancelamento(${insc.id})">Cancelar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function abrirEdicao(id) {
  inscricaoSelecionada = minhasInscricoes.find(i => i.id === id);
  document.getElementById("nomeEdicao").value = inscricaoSelecionada.nome;
  document.getElementById("emailEdicao").value = inscricaoSelecionada.email;
  document.getElementById("modalEdicao").style.display = "flex";
}

function salvarEdicao() {
  inscricaoSelecionada.nome = document.getElementById("nomeEdicao").value;
  inscricaoSelecionada.email = document.getElementById("emailEdicao").value;
  atualizarStorage();
  fecharModal();
  carregarInscricoes();
  mostrarFeedback("Inscrição atualizada com sucesso!", "sucesso");
  return false;
}

function abrirCancelamento(id) {
  inscricaoSelecionada = minhasInscricoes.find(i => i.id === id);
  document.getElementById("modalCancelamento").style.display = "flex";
}

function confirmarCancelamento() {
  minhasInscricoes = minhasInscricoes.filter(i => i.id !== inscricaoSelecionada.id);
  atualizarStorage();
  fecharModal();
  carregarInscricoes();
  mostrarFeedback("Inscrição cancelada com sucesso!", "sucesso");
}

function mostrarFeedback(msg, tipo) {
  const fb = document.getElementById("feedback");
  fb.textContent = msg;
  fb.className = tipo;
}

function fecharModal() {
  document.getElementById("modalEdicao").style.display = "none";
  document.getElementById("modalCancelamento").style.display = "none";
}

function atualizarStorage() {
  localStorage.setItem("inscricoes", JSON.stringify(minhasInscricoes));
}

window.onload = carregarInscricoes; 