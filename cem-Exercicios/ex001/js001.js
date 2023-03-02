function escrever() {
    // Recupera os valores digitados nos campos de entrada
    var texto = document.getElementById ('texto').value;
    document.getElementById ('olaMundo').innerText = texto;
  }