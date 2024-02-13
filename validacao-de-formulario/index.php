<?php
if ($_SERVER['REQUEST_METHOD'] == "POST"){

    $nome = limpaPost($_POST['nome']);
    $email = limpaPost($_POST['email']);
    $senha = limpaPost($_POST['senha']);
    $repete_senha = limpaPost($_POST['repete_senha']);

    //SE A VARIAVEL $NOME FOR VAZIA
    if (empty($nome)){
        $erroNome = "Por favor, informe um nome.";
    }else{
        //NÃO É VAZIA - VERIFICAR SE O NOME É VÁLIDO
        if (!preg_match("/^[a-zA-Z-' ]*$/",$nome)) {
            $erroNome = "Apenas letras e espaços são aceitos";
        }
    }
    //VERIFICAR DE $EMAIL E VAZIO
    if (empty($email)){
        $erroEmail = "Por favor, informe um e-mail";
    }else{
        //NÃO É VAZIO - VERIFICAR SE É VÁLIDO
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $erroEmail = "E-mail informado inválido!";
    }else {
        $erroEmail = "Nenhum";
    }
    //VERIFICAR SE $SENHA ESTÁ VAZIA 
    if (empty($senha)) {
        $erroSenha = "Por favor, informe uma senha!";
    }else{
        //NAO ESTÁ VAZIA - VERIFICAR SE TEM 6 DIGITOS
        if (strlen($senha) < 6) {
        $erroSenha = "Por favor, informe uma senha de pelo menos 6 dígitos";
        }else{
        $erroSenha = "Nenhum";
        }
    }
    //VERIFICAR SE REPETE SENHA É VAZIA
    if (empty($repete_senha)) {
        $erroRepeteSenha = "Você precisa repetir a senha";
    }else{
        //VERIFICAR SE REPETE SENHA É DIFERENTE DA SENHA
        if ($erroRepeteSenha !== $senha){
            $erroRepeteSenha = "Semha e a repetição da senha são diferentes";
        }else{
            $erroRepeteSenha = "Nenhum";
        }
    }

    //VERIFICAR SE NÃO HOUVE NENHUM ERRO
    if ($erroNome == "Nenhum" && $erroEmail == "Nenhum" && $erroSenha == "Nenhum" && $erroRepeteSenha == "Nenhum") {
        //REDIRECINAR O USUARIO PARA PÁGINA DE OBRIGADO
        header ('Location: obrigado.html');
        }
    }  
}
function limpaPost($valor){
    $valor = trim($valor);
    $valor = stripcslashes($valor);
    $valor = htmlspecialchars($valor);
    return $valor;
}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- link para bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- link para material design icons-->
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" rel="stylesheet">
    <title>POST</title>
</head>

<body>

    <div class="container">

    
        <h1 class="mt-5">Validação de Formulálio</h1>

        <form method="post">
            <div class="mb-3 mt-5">
                <label for="nome" class="form-label">Nome completo <i class="mdi mdi-information-outline"
                        data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Campo obrigatório"></i></label>
                <input type="text" class="form-control <?php if (isset($erroNome)) { if ($erroNome !== "Nenhum") {echo "is-invalid";}} ?>" id="nome" nome="nome" placeholder="Seu nome completo" value="<?php if (isset($_POST['nome'])) { echo $_POST['nome'];} ?>" required>
                <div class="invalid-feedback">
                    <?php if (isset($erroNome)) { if ($erroNome !== "Nenhum") {echo $erroNome;}} ?> 
                </div>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email <i class="mdi mdi-information-outline" data-bs-toggle="tooltip"
                        data-bs-placement="right" data-bs-title="Campo obrigatório"></i></label>
                <input type="email" class="form-control  <?php if (isset($erroEmail)) { if ($erroEmail !== "Nenhum") {echo "is-invalid";}} ?>" id="email" nome="email" placeholder="email@provedor.com" value="<?php if (isset($_POST['email'])) { echo $_POST['email'];} ?>" required>
                <div class="invalid-feedback">
                    <?php if (isset($erroEmail)) { if ($erroEmail !== "Nenhum") {echo $erroEmail;}} ?>
                </div>
            </div>
            <div class="mb-3">
                <label for="senha" class="form-label">Digite uma senha <i class="mdi mdi-information-outline"
                        data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Campo obrigatório"></i></label>
                <input type="password" class="form-control  <?php if (isset($erroSenha)) { if ($erroSenha !== "Nenhum") {echo "is-invalid";}} ?>" id="senha" nome="senha" placeholder="Digite uma senha" value="<?php if (isset($_POST['senha'])) { echo $_POST['senha'];} ?>" required>
                <div class="invalid-feedback">
                <?php if (isset($erroSenha)) { if ($erroSenha !== "Nenhum") {echo $erroSenha;}} ?>
                </div>
            </div>
            <div class="mb-3">
                <label for="repete_senha" class="form-label">Repita sua senha <i class="mdi mdi-information-outline"
                        data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Campo obrigatório"></i></label>
                <input type="password" class="form-control <?php if (isset($erroRepeteSenha)) { if ($erroRepeteSenha !== "Nenhum") {echo "is-invalid";}} ?>" id="repete_senha" nome="repete_senha"
                    placeholder="Repita sua senha" value="<?php if (isset($_POST['repete_senha'])) { echo $_POST['repete_senha'];} ?>" required>
                    <div class="invalid-feedback">
                    <?php if (isset($erroRepeteSenha)) { if ($erroRepeteSenha !== "Nenhum") {echo $erroRepeteSenha;}} ?>
                    </div>
            </div>
            <div class="mt-5">
                <button type="submit" class="btn btn-primary"><i class="mdi mdi-send"></i> Cadastra</button>
            </div>
        </form>
    </div>
    

    <!--link para bootstrap JavaScript-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    <script>
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    </script>
</body>

</html>