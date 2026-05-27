const usuarios = [
  { usuario: "wendell", senha: "123456", email: "wendell@gmail.com" },
  { usuario: "emerson", senha: "abcdef", email: "emerson@yahoo.com" },
  { usuario: "teste", senha: "senha123", email: "teste@hotmail.com" }
];

function mostrarLogin() {
  document.getElementById("formLogin").classList.add("ativo");
  document.getElementById("formCadastro").classList.remove("ativo");
  document.getElementById("formRecuperacao").classList.remove("ativo");
  document.getElementById("formAlterarSenha").classList.remove("ativo");
  document.querySelectorAll(".tab")[0].classList.add("active");
  document.querySelectorAll(".tab")[1].classList.remove("active");
}

function mostrarCadastro() {
  document.getElementById("formCadastro").classList.add("ativo");
  document.getElementById("formLogin").classList.remove("ativo");
  document.getElementById("formRecuperacao").classList.remove("ativo");
  document.getElementById("formAlterarSenha").classList.remove("ativo");
  document.querySelectorAll(".tab")[1].classList.add("active");
  document.querySelectorAll(".tab")[0].classList.remove("active");
}

function mostrarRecuperacao() {
  document.getElementById("formLogin").classList.remove("ativo");
  document.getElementById("formCadastro").classList.remove("ativo");
  document.getElementById("formRecuperacao").classList.add("ativo");
  document.getElementById("formAlterarSenha").classList.remove("ativo");
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
}

function mostrarAlterarSenha() {
  document.getElementById("formLogin").classList.remove("ativo");
  document.getElementById("formCadastro").classList.remove("ativo");
  document.getElementById("formRecuperacao").classList.remove("ativo");
  document.getElementById("formAlterarSenha").classList.add("ativo");
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
}

document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuarioDigitado = document.getElementById("emailLogin").value;
  const senhaDigitada = document.getElementById("senhaLogin").value;
  const mensagem = document.getElementById("mensagemLogin");

  const encontrado = usuarios.find(u => 
    (u.usuario === usuarioDigitado || u.email === usuarioDigitado) && u.senha === senhaDigitada
  );

  if (encontrado) {
    localStorage.setItem("usuarioLogado", encontrado.usuario);
    abrirConfirmacao("Login realizado com sucesso!");
    mensagem.textContent = "";
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
    usuarios.push({ usuario: usuarioNovo, senha: senhaNova, email: usuarioNovo });
    abrirConfirmacao("Cadastro realizado com sucesso.");
    mensagem.textContent = "";
  } else {
    mensagem.textContent = "As senhas não coincidem.";
    mensagem.style.color = "red";
  }
});

document.getElementById("linkRecuperacao").addEventListener("click", function(e) {
  e.preventDefault();
  mostrarRecuperacao();
});

document.getElementById("formRecuperacao").addEventListener("submit", function(e) {
  e.preventDefault();
  const emailRec = document.getElementById("emailRecuperacao").value;
  const mensagem = document.getElementById("mensagemRecuperacao");

  const encontrado = usuarios.find(u => u.email === emailRec);

  if (encontrado) {
    abrirConfirmacao("Um link de recuperação foi enviado para " + emailRec);
    mensagem.textContent = "";
  } else {
    mensagem.textContent = "E-mail não encontrado no sistema.";
    mensagem.style.color = "red";
  }
});

document.getElementById("linkAlterarSenha").addEventListener("click", function(e) {
  e.preventDefault();
  mostrarAlterarSenha();
});

document.getElementById("formAlterarSenha").addEventListener("submit", function(e) {
  e.preventDefault();
  const senhaAtual = document.getElementById("senhaAtual").value;
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmarNova = document.getElementById("confirmarNovaSenha").value;
  const mensagem = document.getElementById("mensagemAlteracao");

  const usuarioLogado = localStorage.getItem("usuarioLogado");
  const usuario = usuarios.find(u => u.usuario === usuarioLogado);

  if (!usuario) {
    mensagem.textContent = "Nenhum usuário logado.";
    mensagem.style.color = "red";
    return;
  }

  if (usuario.senha !== senhaAtual) {
    mensagem.textContent = "Senha atual incorreta.";
    mensagem.style.color = "red";
    return;
  }

  if (novaSenha !== confirmarNova) {
    mensagem.textContent = "As novas senhas não coincidem.";
    mensagem.style.color = "red";
    return;
  }

  usuario.senha = novaSenha;
  abrirConfirmacao("Senha alterada com sucesso!");
  mensagem.textContent = "";
});

function abrirConfirmacao(texto) {
  document.getElementById("textoConfirmacao").textContent = texto;
  document.getElementById("confirmacao").style.display = "block";
}

function fecharConfirmacao() {
  document.getElementById("confirmacao").style.display = "none";
  mostrarLogin();
}
