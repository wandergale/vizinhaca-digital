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

btnNova.addEventListener("click", () => {
  modal.style.display = "flex";
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

  if (!titulo) {
    mensagem.textContent = "O título da ação é obrigatório";
    mensagem.className = "mensagem erro";
    return;
  }
  if (!descricao || !data || !local || !prioridade) {
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
  `;
  tabela.appendChild(novaLinha);

  mensagem.textContent = "Ação cadastrada com sucesso!";
  mensagem.className = "mensagem sucesso";

  setTimeout(() => {
    modal.style.display = "none";
    form.reset();
    mensagem.textContent = "";
    mensagem.className = "mensagem";
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
