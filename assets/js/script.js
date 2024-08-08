let saldo = 100.00;

function recaptchaCallback() {
    document.getElementById('startButton').disabled = false;
    document.getElementById('startButton').classList.add('btn-green');
}

document.getElementById('startButton').addEventListener('click', function() {
    if (grecaptcha.getResponse() === '') {
        document.getElementById('errorMessage').innerText = 'Por favor, conclua o captcha antes de continuar.';
    } else {
        document.getElementById('page1').classList.remove('active');
        document.getElementById('page2').classList.add('active');
        // updateTask(); // Função para atualizar a tarefa, omitir aqui se já for implementada
    }
});

// Formulário de envio para PIX via PHP
document.getElementById('pixForm').addEventListener('submit', function(event) {
    // Adicione validações, se necessário
});
