
const express = require("express");
const uuid = require('uuid');

const port = 3000;
const app = express();
app.use(express.json());

// Crie uma aplicação que fará o cadastro dos pedidos de uma hamburgueria, e você deve utilizar NODE e Express

// criando um vetor de ordens
const orders = [];

// Criando rota para inserção de ordens
app.post('/order', (request, response) => {

    const { order, clientName, price } = request.body; 
    const struct_order = { id:uuid.v4() , order, clientName, price };

    orders.push(struct_order);

    return response.status(201).json(orders);
})




app.listen(port, () => {
    console.log(`🆗 --> Server started on port ${port} <-- 🚀`)
});