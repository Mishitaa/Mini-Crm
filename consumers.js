const amqp = require('amqplib');
const { sequelize, Customer, Order } = require('./models');
require('dotenv').config();

async function consumeFromQueue(queue, model) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
        const data = JSON.parse(msg.content.toString());
        await model.create(data);
        channel.ack(msg);
    }, { noAck: false });
}

async function startConsumers() {
    await sequelize.sync();
    consumeFromQueue('customer_queue', Customer);
    consumeFromQueue('order_queue', Order);
}

startConsumers().then(() => {
    console.log('Consumers started');
}).catch(error => {
    console.error('Error starting consumers:', error);
});
