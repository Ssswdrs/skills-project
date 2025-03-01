import 'dotenv/config';
import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = process.env.QUEUE_NAME || 'task_queue';

async function receiveMessage() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Waiting for messages in ${QUEUE_NAME}`);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                console.log(`Received: ${msg.content.toString()}`);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error receiving message:', error);
    }
}

receiveMessage();
