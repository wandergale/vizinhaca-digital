const usuarios = [
  { usuario: "wendell", senha: "123456" },
  { usuario: "emerson", senha: "abcdef" },
  { usuario: "teste", senha: "senha123" }
];

function mostrarLogin() {
  document.getElementById("formLogin").classList.add("ativo");
  document.getElementById("formCadastro").classList.remove("ativo");
  document.querySelectorAll(".tab")[0].classList.add("active");
  document.querySelectorAll(".tab")[1].classList.remove("active");
}

function mostrarCadastro() {
  document.getElementById("formCadastro").classList.add("ativo");
  document.getElementById("formLogin").classList.remove("ativo");
  document.querySelectorAll(".tab")[1].classList.add("active");
  document.querySelectorAll(".tab")[0].classList.remove("active");
}

// LOGIN
document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuarioDigitado = document.getElementById("emailLogin").value;
  const senhaDigitada = document.getElementById("senhaLogin").value;
  const mensagem = document.getElementById("mensagemLogin");

  const encontrado = usuarios.find(u => u.usuario === usuarioDigitado && u.senha === senhaDigitada);

  if (encontrado) {
    localStorage.setItem("usuarioLogado", usuarioDigitado);
    abrirConfirmacao("Login realizado com sucesso!");
  } else {
    mensagem.textContent = "Usuário ou senha inválidos.";
    mensagem.style.color = "red";
  }
});

document.getElementById("formCadastro").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuarioNovo = document.getElementById("emailCadastro").value;
  const senhaNova = document.getElementById("senhaCadastro").value;
  const confirmar = document.getElementById("confirmarSenha").value;
  const mensagem = document.getElementById("mensagemCadastro");

  if (senhaNova === confirmar) {
    usuarios.push({ usuario: usuarioNovo, senha: senhaNova });
    mensagem.textContent = "";
    abrirConfirmacao("Cadastro realizado com sucesso.");
  } else {
    mensagem.textContent = "As senhas não coincidem.";
    mensagem.style.color = "red";
  }
});

function abrirConfirmacao(texto) {
  document.getElementById("textoConfirmacao").textContent = texto;
  document.getElementById("confirmacao").style.display = "block";
}

function fecharConfirmacao() {
  document.getElementById("confirmacao").style.display = "none";
  if (localStorage.getItem("usuarioLogado")) {
    window.location.href = "../html/cadastro-acoes.html";
  }
}