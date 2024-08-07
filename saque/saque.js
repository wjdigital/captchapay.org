// saque.js

document.getElementById('saqueForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const method = document.getElementById('method').value;
    const recipient = document.getElementById('recipient').value;

    const clientID = 'wjmkt_1713979947271';
    const clientSecret = 'a4a48ab8730a49e674a13338d9c05dc6383ab188477fbc5b6e6069dde6735b5746d1fcd6f5d841eb8c367a4067902347';

    const data = {
        value: amount,
        key: recipient,
        key_type: method
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
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Erro ao realizar o saque: ' + response.statusText);
        }
    })
    .then(result => {
        document.getElementById('result').innerHTML = 'Saque realizado com sucesso!';
        console.log(result);
    })
    .catch(error => {
        document.getElementById('result').innerHTML = 'Erro ao realizar o saque.';
        console.error('Error:', error);
    });
});
