// pix.js

document.getElementById('pixForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const key = document.getElementById('key').value;
    const typeKey = document.getElementById('typeKey').value;
    const value = parseFloat(document.getElementById('value').value);
    const documentValidation = document.getElementById('documentValidation').value || null;

    const clientID = 'testesandbox_1687443996536';
    const clientSecret = '5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d';

    const data = {
        key: key,
        typeKey: typeKey,
        value: value,
        callbackUrl: 'https://webhook.com', // Substitua pela URL do seu webhook
        documentValidation: documentValidation
    };

    fetch('https://sandbox.ws.suitpay.app/api/v1/gateway/pix-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ci': clientID,
            'cs': clientSecret
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.response === 'OK') {
            document.getElementById('result').innerHTML = 'Transferência realizada com sucesso!';
        } else {
            document.getElementById('result').innerHTML = 'Erro na transferência: ' + result.response;
        }
        console.log(result);
    })
    .catch(error => {
        document.getElementById('result').innerHTML = 'Erro ao realizar a transferência.';
        console.error('Error:', error);
    });
});
