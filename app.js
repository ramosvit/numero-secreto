let listaDeNumerosSorteados= [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto)  {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', //faz link com html(linha7) que leva a site que produz fala 
    {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero de 1 e 10');
}

exibirMensagemInicial();
function verificarChute() { // botao que verifica o valor colocado pelo usuario no jogo, se é ou nao igual
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce acertou o numero secreto com 
        ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o numero secreto é menor');
        } else{
            exibirTextoNaTela('p', 'o numero secreto é maior');
        }
        tentativas++; 
        limparCampo();   
    } 
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // descobrir tamanho da quantidade de elementos
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados =[];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // .includes verifica se o numero está na lista ou nao
        return gerarNumeroAleatorio();
    }  else {
        listaDeNumerosSorteados.push(numeroEscolhido); // .push coloca o numero sorteado no final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { // apaga o numero chutado quando erra pra colocar um novo numero
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}