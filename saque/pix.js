document.getElementById('pixForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const key = document.getElementById('key').value;
    const typeKey = document.getElementById('typeKey').value;
    const value = 0.50;
    const documentValidation = document.getElementById('documentValidation').value || null;

    const clientID = 'seu_client_id';
    const clientSecret = 'seu_client_secret';

    const data = {
        key: key,
        typeKey: typeKey,
        value: value,
        callbackUrl: 'https://seu-webhook-url.com',
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
    })
    .catch(error => {
        document.getElementById('result').innerHTML = 'Erro ao realizar a transferência.';
        console.error('Error:', error);
    });
});
