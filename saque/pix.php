<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $key = $_POST['key'];
    $typeKey = $_POST['typeKey'];
    $value = floatval($_POST['value']);
    $documentValidation = isset($_POST['documentValidation']) ? $_POST['documentValidation'] : null;

    $clientID = 'testesandbox_1687443996536';
    $clientSecret = '5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d';

    $data = [
        'key' => $key,
        'typeKey' => $typeKey,
        'value' => $value,
        'callbackUrl' => 'https://webhook.com', // Substitua pela URL do seu webhook
        'documentValidation' => $documentValidation
    ];

    $ch = curl_init('https://sandbox.ws.suitpay.app/api/v1/gateway/pix-payment');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'ci: ' . $clientID,
        'cs: ' . $clientSecret
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        $result = json_decode($response, true);
        if ($result['response'] === 'OK') {
            echo 'Transferência realizada com sucesso!';
        } else {
            echo 'Erro na transferência: ' . $result['response'];
        }
    } else {
        echo 'Erro ao realizar a transferência. Código HTTP: ' . $httpCode;
    }
} else {
    echo 'Método de requisição inválido.';
}
?>
