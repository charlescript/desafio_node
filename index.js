
const express = require("express");
const uuid = require('uuid');

const port = 3000;
const app = express();
app.use(express.json());

// Crie uma aplicação que fará o cadastro dos pedidos de uma hamburgueria, e você deve utilizar NODE e Express

// criando um vetor de ordens
const orders = [];

const checkOrderId = (request, response, next) => {
    const { id } = request.params;

    const index = orders.findIndex( order => order.id === id);

    if( index < 0) {
        return response.status(404).json({ error: "User not found"});
    }

    request.orderIndex = index;
    request.orderId = id;

    next()
}


// Criando rota para inserção de ordens
app.post('/order', (request, response) => {

    const { order, clientName, price } = request.body; 
    const struct_order = { id:uuid.v4() , order, clientName, price };

    orders.push(struct_order);

    return response.status(201).json(orders);
})


// Criando rota para consultar pedidos
app.get('/order', (request, response) => {
     
    return response.json(orders);
})


// Criando rota para alterar pedido
app.put('/order/:id', checkOrderId, (request, response) => {

    const id = request.orderId;
    const { order,clientName,price } = request.body;
    const index = request.orderIndex;
    
    const updatedOrder = { id, order, clientName, price }

    orders[index] = updatedOrder;

    return response.json(orders[index]);
})




app.listen(port, () => {
    console.log(`🆗 --> Server started on port ${port} <-- 🚀`)
});