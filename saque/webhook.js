const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    const { idTransaction, typeTransaction, statusTransaction, value, destinationName, destinationTaxId, destinationBank } = req.body;

    // Processar os dados recebidos do webhook
    console.log(`ID: ${idTransaction}, Tipo: ${typeTransaction}, Status: ${statusTransaction}, Valor: ${value}, Destino: ${destinationName}, Documento: ${destinationTaxId}, Banco: ${destinationBank}`);
    
    // Responder ao webhook
    res.status(200).send('Webhook recebido com sucesso');
});

app.listen(3000, () => {
    console.log('Servidor de webhook rodando na porta 3000');
});
