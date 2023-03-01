function calcularSomatorio() {
    // Recupera os valores digitados nos campos de entrada
    var numero1 = parseInt(document.getElementById("numero1").value);
    var numero2 = parseInt(document.getElementById("numero2").value);
    
    // Calcula a soma dos números
    var soma = numero1 + numero2;
    
    // Exibe o resultado em uma mensagem para o usuário
    var mensagem = "A soma entre " + numero1 + " e " + numero2 + " é igual a " + soma + ".";
    document.getElementById("resultado").textContent = mensagem;
  }