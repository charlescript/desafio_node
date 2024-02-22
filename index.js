
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

    const { order, clientName, price, status } = request.body; 
    const struct_order = { id:uuid.v4() , order, clientName, price, status };

    orders.push(struct_order);

    return response.status(201).json(orders);
})


// Criando rota para consultar pedidos
app.get('/order', (request, response) => {
     
    return response.json(orders);
})

// Rota para visualizar apenas um pedido
app.get('/order/:id', checkOrderId, (request, response) => {

    const id = request.orderId;
    const index = request.orderIndex;

    return response.json(orders[index]);
})


// Criando rota para alterar pedido
app.put('/order/:id', checkOrderId, (request, response) => {

    const id = request.orderId;
    const { order, clientName, price, status } = request.body;
    const index = request.orderIndex;
    
    const updatedOrder = { id, order, clientName, price, status }

    orders[index] = updatedOrder;

    return response.json(orders[index]);
})

// Criando rota para deleção de pedido
app.delete('/order/:id', checkOrderId, (request, response) => {
    
    const index = request.orderIndex;
    orders.splice(index, 1);

    //return response.status(204).json(orders);
    return response.json(orders);
})



app.listen(port, () => {
    console.log(`🆗 --> Server started on port ${port} <-- 🚀`)
});