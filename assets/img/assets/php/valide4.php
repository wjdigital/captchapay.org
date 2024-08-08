<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $captcha = $_POST['g-recaptcha-response'];
    $secretKey = '6LeFvSEqAAAAAJqfEbW0EMykx82SGi3ST_UTiwNg';
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captcha");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo 'Por favor, complete o CAPTCHA.';
    } else {
        header('Location: https://captchapay.org/tarefa2.html');
        exit;
    }
}
?>
