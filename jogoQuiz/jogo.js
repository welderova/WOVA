/* Variaveis de controle do jogo */


let perguntasFeitas = [];


// Perguntas do gojo

const perguntas = [
    //Pergunta 0
    {
        pergunta: "Antes de se chamar JavaScript, a linguagem tinha outros nomes, os principais foram:",
        resposta: ["Mocha e LiveScript", "Java e Mocha", "Java e LiveScript", "LiveScript e ECMAScript"],
        correta: "resp0"
    },
    //Pergunta 1
    {
        pergunta: 'Se temos um código HTML &lt;div class="texto"&gt;...&lt;/div&gt; e queremos acessar esse elemento via JavaScript, qual instrução devemos usar?',
        resposta: ['document.getElementById("texto")', 'document.querySelector("div#texto")', 'document.querySelector("div.texto")', 'document.getElementById("div")'],
        correta: "resp2"
    },
    //Pergunta 2
    {
        pergunta: "Para o mundo HTML + JavaScript, a sigla DOM significa:",
        resposta: ["Data Object Markup", "Document Objective Maker", "Document Object Model", "Data Object Master"],
        correta: "resp2"
    },
    //Pergunta 3
    {
        pergunta: "Qual é o comando JS responsável por mostrar uma janela contextual capaz de mostrar uma imagem e solicitar que o usuário digite algum valor ou texto?",
        resposta: ["window.alert()", "window.prompt()", "window.confirm()", "window.keyboard()"],
        correta: "resp1"
    },
    //Pergunta 4
    {
        pergunta: "Qual dos itens abaixo é o único que NÃO É um data type em JavaScript?",
        resposta: ["number", "string", "NaN", "float"],
        correta: "resp3"
    },
    //Pergunta 5
    {
        pergunta: "Qual das opções abaixo é a única onde encontramos APENAS operadores lógicos do JavaScript?",
        resposta: [">= , <= e ===", "&&, || e !", "+=, ** e &&", "||, // e !!"],
        correta: "resp1"
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
            $('#mensagem').html('Aceeeertou todas!')
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