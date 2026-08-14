const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const tel = document.getElementById("tel");
const form = document.getElementById("meuFormulario");

function validarNome() {
  const partesDoNome = nome.value.trim().split(" ");
  const nomeOk = partesDoNome.length >= 2;

  if (nomeOk) {
    nome.classList.add("valido");
    nome.classList.remove("invalido");
  } else {
    nome.classList.add("invalido");
    nome.classList.remove("valido");
  }

  return nomeOk;
}

function validarEmail() {
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailOk = padraoEmail.test(email.value);

  if (emailOk) {
    email.classList.add("valido");
    email.classList.remove("invalido");
  } else {
    email.classList.add("invalido");
    email.classList.remove("valido");
  }

  return emailOk;
}

function validarTelefone() {
  const telLimpo = tel.value.replace(/\D/g, "");
  const telOk = telLimpo.length === 11;

  if (telOk) {
    tel.classList.add("valido");
    tel.classList.remove("invalido");
  } else {
    tel.classList.add("invalido");
    tel.classList.remove("valido");
  }

  return telOk;
}

function validarCpf() {
  const cpfLimpo = cpf.value.replace(/\D/g, "");
  let cpfOk = false;

  if (cpfLimpo.length === 11 && !/^(\d)\1{10}$/.test(cpfLimpo)) {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma = soma + Number(cpfLimpo[i]) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = 11 - resto;
    if (digito1 >= 10) digito1 = 0;

    let soma2 = 0;
    for (let i = 0; i < 10; i++) {
      soma2 = soma2 + Number(cpfLimpo[i]) * (11 - i);
    }
    let resto2 = soma2 % 11;
    let digito2 = 11 - resto2;
    if (digito2 >= 10) digito2 = 0;

    const digito1Ok = digito1 === Number(cpfLimpo[9]);
    const digito2Ok = digito2 === Number(cpfLimpo[10]);

    cpfOk = digito1Ok && digito2Ok;
  }

  if (cpfOk) {
    cpf.classList.add("valido");
    cpf.classList.remove("invalido");
  } else {
    cpf.classList.add("invalido");
    cpf.classList.remove("valido");
  }

  return cpfOk;
}

nome.addEventListener("input", validarNome);
email.addEventListener("input", validarEmail);

cpf.addEventListener("input", function () {
  let valor = cpf.value.replace(/\D/g, "");
  valor = valor.slice(0, 11);

  if (valor.length > 9) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
  } else if (valor.length > 3) {
    valor = valor.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
  }

  cpf.value = valor;
  validarCpf();
});

tel.addEventListener("input", function () {
  let valor = tel.value.replace(/\D/g, "");
  valor = valor.slice(0, 11);

  if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{1,5})$/, "($1) $2");
  }

  tel.value = valor;
  validarTelefone();
});

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeOk = validarNome();
  const emailOk = validarEmail();
  const telOk = validarTelefone();
  const cpfOk = validarCpf();

  if (nomeOk && emailOk && telOk && cpfOk) {
    console.log("Formulário válido, pronto pra enviar!");
  } else {
    console.log("Ainda tem campo inválido");
  }
});