const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const tel = document.getElementById("tel");
const form = document.getElementById("meuFormulario");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  console.log("Formulário enviado!");

  const valorNome = nome.value;
  const valorEmail = email.value;
  const valorCpf = cpf.value;
  const valorTel = tel.value;

  const partesDoNome = valorNome.trim().split(" ");

  if (partesDoNome.length >= 2) {
    console.log("Nome válido");
  } else {
    console.log("Nome inválido, precisa de nome e sobrenome");
  }

  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (padraoEmail.test(valorEmail)) {
    console.log("E-mail válido");
  } else {
    console.log("E-mail inválido");
  }

  const cpfLimpo = valorCpf.replace(/\D/g, "");
  console.log(cpfLimpo);

  if (cpfLimpo.length !== 11) {
    console.log("CPF inválido, precisa ter 11 números");
  } else if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    console.log("CPF inválido, números repetidos não existem");
  } else {
    console.log("Passou nas checagens básicas, hora de calcular os dígitos");

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma = soma + Number(cpfLimpo[i]) * (10 - i);
    }

    let resto = soma % 11;
    let digito1 = 11 - resto;
    if (digito1 >= 10) {
      digito1 = 0;
    }

    const digito1Real = Number(cpfLimpo[9]);
    if (digito1 === digito1Real) {
      console.log("Primeiro dígito verificador OK");
    } else {
      console.log("Primeiro dígito verificador ERRADO — CPF inválido");
    }

    let soma2 = 0;
    for (let i = 0; i < 10; i++) {
      soma2 = soma2 + Number(cpfLimpo[i]) * (11 - i);
    }

    let resto2 = soma2 % 11;
    let digito2 = 11 - resto2;
    if (digito2 >= 10) {
      digito2 = 0;
    }

    const digito2Real = Number(cpfLimpo[10]);
    if (digito2 === digito2Real) {
      console.log("Segundo dígito verificador OK");
    } else {
      console.log("Segundo dígito verificador ERRADO — CPF inválido");
    }
  }
});