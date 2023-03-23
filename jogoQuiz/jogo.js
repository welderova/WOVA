/* Variaveis de controle do jogo */


let perguntasFeitas = [];


// Perguntas do gojo

const perguntas = [
    //Pergunta 0
    {
        pergunta: "Duda é gala rala?",
        resposta: ["Sim, por isso Gleiciana o lasgou", "Super fértiu", "Tem super espermatozoides ", "So goza fora e deu sorte"],
        correta: "resp3"
    },
    //Pergunta 1
    {
        pergunta: "Você concorda que o Welder é lindo?",
        resposta: ["Não", "Lindo de mais", "Se acha de mais", "AAhhh vai a merda"],
        correta: "resp1"
    },
    //Pergunta 2
    {
        pergunta: "Cassio agora é um pau mandado?",
        resposta: ["Não faz nada por que a mulhar pode castra-lo", "Quem manda é ele", "Ele não é pau mandado", "Faz tudo escondido"],
        correta: "resp0"
    },
    //Pergunta 3
    {
        pergunta: "Claudio é gay?",
        resposta: ["Casou-se, mas é um baitola", "Hetero", "Hetero Top", "Masculo"],
        correta: "resp0"
    },
    //Pergunta 4
    {
        pergunta: "O Cleiton vai ser sempre virgem?",
        resposta: ["Roni e gordo", "Pega geral", "Muleque doido", "Sarado das Mulheradas"],
        correta: "resp0"
    },
    //Pergunta 5
    {
        pergunta: "O Roni é muleque doido da quebrada?",
        resposta: ["Se esconde debaixo da cama enquanto outros transam", "Pega geral", "Muleque muito doido", "Principe das Mulheres"],
        correta: "resp0"
    },
    //Pergunta 6
    {
        pergunta: "O Leonardo Boi é um super homem?",
        resposta: ["Se esconde debaixo da cama enquanto outros transam", "Pega geral", "Muleque muito doido", "Principe das Mulheres, e que principe"],
        correta: "resp3"
    },
    //Pergunta 7
    {
        pergunta: "O Wagner acha mesmo que vai se rico com apostas?",
        resposta: ["Vai ser milionário", "Ganha e paga a serva", "Tem que parar e ter dois empregos", "Rei dos palpites"],
        correta: "resp2"
    },
]

var qtdPerguntas = perguntas.length -1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
    //Gerar um numero aleatorio
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //Converter para numero
    aleatorio = Number(aleatorio);
    console.log(aleatorio); // mostra no console qual a pergunta sorteada

    //Verificar se a pergunta já foi feita 
    if (!perguntasFeitas.includes(aleatorio)) {

        //colocar como pergunta feita
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);
    

        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);

        //COLOCAR AS RESPOSTAS
        for (var i = 0; i < 4; i++){
            $("#resp" + i).html(perguntas[aleatorio].resposta[i]);
        }

        //EMBARALHANDO AS RESPOSTAS

        var pai = $("#respostas");
        var botoes = pai.children();

        //console.log(botoes);

        for (var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        //SE A PERGUNTA JA FOI FEITA
        console.log('A pergunta já foi feita. Sorteando novamente');
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas);
        }else {
            console.log('Acabaram as perguntas');


            $('#quiz').addClass('oculto');
            $('#mensagem').html('Aceeeertou todas Miseraveeeee!')
             $('#status').removeClass('oculto');
        }

    }
}

$('.resposta').click(function() {
    if ($('#quiz').attr('data-status') !== 'travado') {
        //percorre todos as respostas e desmacar a class 

        resetaBotoes();
        //add a class selecionada
        $(this).addClass('selecionada');
    }
    
});

$('#confirm').click(function () {
    //pegar o indice da pergunta
    var indice = $("#pergunta").attr('data-indice');
    
    //qual é a resposta certa
    var respCerta = perguntas[indice].correta;

    //qual foi a resosta que o usuario selecionou
    $('.resposta').each(function() {
        if ($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');

            if (respCerta == respostaEscolhida) {
                //alert('Aceertou Miseraveeeee!');
                proximaPergunta();
            } else {
                //alert('Eroooooooouu!');
                $('#quiz').attr('data-status', 'travado');
                $('#confirm').addClass('oculto');
                $('#' + respCerta).addClass('correta');
                $('#' + respostaEscolhida).removeClass('selecionada');
                $('#' + respostaEscolhida).addClass('errada');

                //3 seguntos para dar game over
                setTimeout(function() {
                    gameOver();
                }, 3000);
            }
        }
    })
});

function newGame() {
    $('#confirm').removeClass('oculto');
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}


function proximaPergunta() {
    //percorre todos as respostas e desmacar a class 
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    //percorre todos as respostas e desmacar a class 
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada');
        }
        if ($(this).hasClass('correta')){
            $(this).removeClass('correta');
        }
        if ($(this).hasClass('errada')){
            $(this).removeClass('errada');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over')
    $('#status').removeClass('oculto');
}
$('#novoJogo').click(function(){
    newGame();
});