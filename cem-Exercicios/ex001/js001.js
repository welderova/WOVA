function escrever() {
    // Recupera os valores digitados nos campos de entrada
    var texto = (document.getElementById("texto").value);
    var mensagem = texto;
    document.getElementById("olaMundo").textContent = mensagem;
  }