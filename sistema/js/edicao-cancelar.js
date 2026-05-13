let inscricaoSelecionada = null;

function carregarInscricoes() {
  const inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
  const lista = document.getElementById("listaInscricoes");
  lista.innerHTML = "";

  inscricoes.forEach(inscricao => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${inscricao.acao}</td>
      <td>${inscricao.data}</td>
      <td>${inscricao.local}</td>
      <td>
        <button onclick="abrirEdicao(${inscricao.id})">Editar</button>
        <button onclick="abrirCancelamento(${inscricao.id})">Cancelar</button>
      </td>
    `;
    lista.appendChild(tr);
  });
}

function abrirEdicao(id) {
  const inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
  inscricaoSelecionada = inscricoes.find(i => i.id === id);

  if (inscricaoSelecionada) {
    document.getElementById("nomeEdicao").value = inscricaoSelecionada.nome;
    document.getElementById("emailEdicao").value = inscricaoSelecionada.email;
    document.getElementById("modalEdicao").style.display = "flex";
  }
}

function salvarEdicao() {
  const inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
  const index = inscricoes.findIndex(i => i.id === inscricaoSelecionada.id);

  if (index !== -1) {
    inscricoes[index].nome = document.getElementById("nomeEdicao").value;
    inscricoes[index].email = document.getElementById("emailEdicao").value;
    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
    document.getElementById("feedback").textContent = "Inscrição atualizada com sucesso!";
  }

  fecharModal();
  carregarInscricoes();
  return false;
}

function abrirCancelamento(id) {
  inscricaoSelecionada = id;
  document.getElementById("modalCancelamento").style.display = "flex";
}

function confirmarCancelamento() {
  let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
  inscricoes = inscricoes.filter(i => i.id !== inscricaoSelecionada);
  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

  document.getElementById("feedback").textContent = "Inscrição cancelada com sucesso!";
  fecharModal();
  carregarInscricoes();
}

function fecharModal() {
  document.getElementById("modalEdicao").style.display = "none";
  document.getElementById("modalCancelamento").style.display = "none";
}

window.onclick = function(event) {
  const modalEdicao = document.getElementById("modalEdicao");
  const modalCancelamento = document.getElementById("modalCancelamento");
  if (event.target === modalEdicao) modalEdicao.style.display = "none";
  if (event.target === modalCancelamento) modalCancelamento.style.display = "none";
};

window.onload = carregarInscricoes;
