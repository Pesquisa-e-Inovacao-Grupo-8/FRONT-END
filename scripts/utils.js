
/* Validadores, Máscaras e Limpeza */
function limparCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

function validarNome(nome){

    nome = nome.trim().replace(/\s+/g," ")

    const regexBase = /^[A-Za-zÀ-ÿ\s']+$/
    if(!regexBase.test(nome)) return false

    if(/(.)\1{2,}/i.test(nome)) return false

    const partes = nome.split(" ")

    if(partes.length < 2) return false

    for(let parte of partes){

        if(parte.length < 2) continue

        if(/^Mc[A-ZÀ-Ý][a-zà-ÿ]+$/.test(parte)){
            continue
        }

        if(/^[A-ZÀ-Ý][a-zà-ÿ]*'[A-ZÀ-Ý][a-zà-ÿ]+$/.test(parte)){
            continue
        }

        if(!/^[A-ZÀ-Ý][a-zà-ÿ]+$/.test(parte)){
            return false
        }
    }

    return true
}
function validarTelefone(telefone){
    const numeros = telefone.replace(/\D/g, "")
    return numeros.length >= 10 && numeros.length <= 11
}

function validarEmail(email){

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)

}

function aplicarMascara(valor, tipo) {
    let numeros = valor.replace(/\D/g, "");

    if (tipo === "cpf") {
        numeros = numeros.slice(0, 11);

        if (numeros.length <= 3) return numeros;
        if (numeros.length <= 6) return numeros.replace(/(\d{3})(\d+)/, "$1.$2");
        if (numeros.length <= 9) return numeros.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
        return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    }

    if (tipo === "telefone") {
        numeros = numeros.slice(0, 11);

        if (numeros.length <= 2) return numeros;
        if (numeros.length <= 6) return numeros.replace(/(\d{2})(\d+)/, "($1) $2");
        if (numeros.length <= 10) return numeros.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
        return numeros.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
    }

    return valor;
}


//validador de cpf aff


function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.substring(10, 11));
}

/* Erros */
function mostrarErro(input, mensagem){

    const grupo = input.parentElement
    const label = grupo.querySelector("label")

    input.classList.add("input-error")
    

    let erro = grupo.querySelector(".error-message")

    if(!erro){
        erro = document.createElement("div")
        erro.classList.add("error-message")
        grupo.appendChild(erro)
    }

    erro.innerText = mensagem
}
function limparErro(input){

    const grupo = input.parentElement
    const label = grupo.querySelector("label")
    const erro = grupo.querySelector(".error-message")

    input.classList.remove("input-error")

    if(erro){
        erro.remove()
    }
}
/* Redirecionamentos */
function irLogin() {
    window.location.href = "../templates/login.html"
}

function irCadastro() {
    window.location.href = "../templates/sign.html"
}

function irRedirecionamento() {
    window.location.href = "../templates/rdr-login-sign.html"
}

function irInfo() {
    window.location.href = "../templates/info.html"
}
function irAgendar() {
    window.location.href = "../templates/agendar.html"
}

function irPacotes() {
    window.location.href = "../templates/pacotes.html"
}

function irAgendamentos() {
    window.location.href = "../templates/meus-agendamentos.html"
}

function irConfig() {
    window.location.href = "../templates/configuracoes.html"
}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "../templates/login.html"
}