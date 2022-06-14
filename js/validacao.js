"use strict";
const dataNascimento = document.querySelector("#nascimento");

export function valida(input) {
  const tipoDeInput = input.dataset.tipo;

  if(validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if(input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido')
  } else {
    input.parentElement.classList.add('input-container--invalido');
  }
}

const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo não pode estar vazio',
  },
  email: {
    valueMissing: 'O campo não pode estar vazio',
    typeMismatch: 'O email digitado não é válido'
  },
  senha: {
    valueMissing: 'O campo não pode estar vazio',
    patternMismatch: 'Deve conter entre 6 a 12 caracteres. Não pode haver caracter especial.'
  },
  dataNascimento: {
    valueMissing: 'O campo não pode estar vazio',
    customError: 'Você deve ser maior que 18 para se cadastrar'
  },
}

const validadores = {
  dataNascimento:input => validaDataNascimento(input)
}

//blur acionado quano sai do input
dataNascimento.addEventListener('blur',(evento)=>{
  validaDataNascimento(evento.target);
})

function validaDataNascimento (data) {
  const dataString = new Date(data.value);
  let mensagem = '';

  if (!maior18(dataString)) mensagem = 'Você deve ser maior que 18 para se cadastrar.';
  return data.setCustomValidity(mensagem);
};

function maior18 (data) {
  const hoje = new Date();
  const dataMais18 = new Date(data.getUTCFullYear +18 ,data.getUTCFullMounth, data.getUTCDate);
  return dataMais18 <= hoje;
}