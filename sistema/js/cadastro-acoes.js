if (!localStorage.getItem("usuarioLogado")) {
  alert("Você precisa estar logado para acessar o cadastro de ações.");
  window.location.href = "../html/autenticacao.html";
}

const btnNova = document.querySelector(".btn-nova");
const modal = document.getElementById("modalNovaAcao");
const btnCancelar = document.querySelector(".btn-cancelar");
const form = document.getElementById("formNovaAcao");
const mensagem = document.getElementById("mensagem");
const tabela = document.getElementById("listaAcoes");

let inscritos = 0;

function atualizarVagas(limite) {
  const contador = document.getElementById("contadorVagas");
  const progresso = document.getElementById("progressoVagas");
  const mensagemVagas = document.getElementById("mensagemVagas");

  contador.textContent = `${inscritos} / ${limite} inscritos`;
  const porcentagem = Math.min((inscritos / limite) * 100, 100);
  progresso.style.width = porcentagem + "%";

  if (inscritos >= limite) {
    mensagemVagas.textContent = "Vagas esgotadas";
    mensagemVagas.className = "esgotado";
    progresso.style.backgroundColor = "red";
  } else if (inscritos >= limite - 1) {
    mensagemVagas.textContent = "Limite atingido";
    mensagemVagas.className = "limite";
    progresso.style.backgroundColor = "orange";
  } else {
    mensagemVagas.textContent = "Vagas disponíveis";
    mensagemVagas.className = "disponivel";
    progresso.style.backgroundColor = "#28a745";
  }
}

btnNova.addEventListener("click", () => {
  modal.style.display = "flex";
  inscritos = 0;
  atualizarVagas(parseInt(document.getElementById("limiteVagas").value));
});

btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
  mensagem.textContent = "";
  mensagem.className = "mensagem";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const data = document.getElementById("data").value;
  const local = document.getElementById("local").value.trim();
  const prioridade = document.getElementById("prioridade").value;
  const categoria = document.getElementById("categoria").value;
  const limite = parseInt(document.getElementById("limiteVagas").value);

  if (!titulo) {
    mensagem.textContent = "O título da ação é obrigatório";
    mensagem.className = "mensagem erro";
    return;
  }
  if (!descricao || !data || !local || !prioridade || !categoria || !limite) {
    mensagem.textContent = "Todos os campos são obrigatórios";
    mensagem.className = "mensagem erro";
    return;
  }

  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td>${titulo}</td>
    <td>${descricao}</td>
    <td>${new Date(data).toLocaleString("pt-BR")}</td>
    <td>${local}</td>
    <td>${prioridade}</td>
    <td>${categoria}</td>
    <td>${limite}</td>
    <td>${inscritos}</td>
    <td>${inscritos >= limite ? "Vagas esgotadas" : "Vagas disponíveis"}</td>
  `;
  tabela.appendChild(novaLinha);

  mensagem.textContent = "Ação cadastrada com sucesso!";
  mensagem.className = "mensagem sucesso";

  atualizarVagas(limite);

  setTimeout(() => {
    modal.style.display = "none";
    form.reset();
    mensagem.textContent = "";
    mensagem.className = "mensagem";
    inscritos = 0;
    atualizarVagas(limite);
  }, 1000);
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
    mensagem.textContent = "";
    mensagem.className = "mensagem";
  }
});
