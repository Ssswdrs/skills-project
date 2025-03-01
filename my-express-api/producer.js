import 'dotenv/config';
import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = process.env.QUEUE_NAME || 'task_queue';

export async function sendMessage(message) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        console.log(`Sent: ${message}`);

        setTimeout(() => connection.close(), 500);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

