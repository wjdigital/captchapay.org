const tasks = [
    { imageWebp: 'assets/img/captcha1.webp', imagePng: 'assets/img/captcha1.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém veículos.', answer: 'sim' },
    { imageWebp: 'assets/img/captcha2.webp', imagePng: 'assets/img/captcha2.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém pessoas.', answer: 'sim' },
    { imageWebp: 'assets/img/captcha3.webp', imagePng: 'assets/img/captcha3.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém casas.', answer: 'não' },
    { imageWebp: 'assets/img/captcha4.webp', imagePng: 'assets/img/captcha4.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém motocicletas.', answer: 'sim' },
    { imageWebp: 'assets/img/captcha5.webp', imagePng: 'assets/img/captcha5.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém animais.', answer: 'não' },
    { imageWebp: 'assets/img/captcha6.webp', imagePng: 'assets/img/captcha6.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém semáforos.', answer: 'sim' },
    { imageWebp: 'assets/img/captcha7.webp', imagePng: 'assets/img/captcha7.png', text: 'Tarefa: Visualize a imagem abaixo e informe se nos blocos marcados contém barcos.', answer: 'não' },
];
let currentTask = 0;
let saldo = 100.00;

function updateTask() {
    if (currentTask < tasks.length) {
        document.getElementById('taskImageWebp').srcset = tasks[currentTask].imageWebp;
        document.getElementById('taskImagePng').srcset = tasks[currentTask].imagePng;
        document.getElementById('taskImage').src = tasks[currentTask].imagePng;
        document.getElementById('taskText').innerText = tasks[currentTask].text;
        document.getElementById('progresso').innerText = `Tarefa ${currentTask + 1} de ${tasks.length}`;
        document.getElementById('taskSaldo').innerText = `Saldo: R$${saldo.toFixed(2)}`;
    } else {
        document.getElementById('page2').style.display = 'none';
        document.getElementById('pageFinal').style.display = 'block';
    }
}

function recaptchaCallback() {
    document.getElementById('startButton').disabled = false;
    document.getElementById('startButton').classList.add('btn-green');
}

document.getElementById('startButton').addEventListener('click', function() {
    if (grecaptcha.getResponse() === '') {
        document.getElementById('errorMessage').innerText = 'Por favor, conclua o captcha antes de continuar.';
    } else {
        saldo += 25.00;
        document.getElementById('saldo').innerText = `Saldo: R$${saldo.toFixed(2)}`;
        new Audio('assets/audio/som-dinheiro.mp3').play();
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
        updateTask();
    }
});

function validateAnswer(answer) {
    const correct = tasks[currentTask].answer;
    if (answer === correct) {
        saldo += saldo * 0.15;
        new Audio('assets/audio/som-dinheiro.mp3').play();
    } else {
        document.getElementById('errorMessagePage2').innerText = 'Resposta errada. Avançando para a próxima tarefa.';
    }
    document.getElementById('saldo').innerText = `Saldo: R$${saldo.toFixed(2)}`;
    currentTask++;
    updateTask();
}

document.getElementById('yesButton').addEventListener('click', function() {
    validateAnswer('sim');
});

document.getElementById('noButton').addEventListener('click', function() {
    validateAnswer('não');
});

document.getElementById('finalButton').addEventListener('click', function() {
    window.location.href = 'vsl.html';
});
