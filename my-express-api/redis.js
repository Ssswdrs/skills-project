import { createClient } from 'redis';
import 'dotenv/config';

// Initialize the Redis client only once
const client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, // Specify the connection URL
});

let isConnected = false;

// Function to ensure that Redis is connected
const connectToRedis = async () => {
    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log('Connected to Redis');
        } catch (err) {
            throw new Error(`Redis Client Error: ${err.message}`);
        }
    }
};

// Redis client error handling
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
    process.exit(1); // Exit on error
});

// Example functions for setting and getting data
const setKey = async (key, value) => {
    await connectToRedis();
    await client.set(key, value);
};

const getKey = async (key) => {
    await connectToRedis();
    return await client.get(key);
};

const setUserSession = async (userId, sessionData) => {
    await connectToRedis();
    await client.hSet(userId, sessionData);
};

const getUserSession = async (userId) => {
    await connectToRedis();
    return await client.hGetAll(userId);
};

// Close the Redis connection gracefully
const closeConnection = async () => {
    if (isConnected) {
        await client.quit();
        console.log('Redis connection closed');
    }
};

// Gracefully handle shutdown
process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
    await closeConnection();  // Fix: Call closeConnection, not redisClient.closeConnection
    process.exit(0); // Exit the process after cleanup
});

process.on('SIGTERM', async () => {
    console.log('Gracefully shutting down...');
    await closeConnection();  // Fix: Call closeConnection, not redisClient.closeConnection
    process.exit(0); // Exit the process after cleanup
});

// Exporting the client and functions
export default { client, setKey, getKey, setUserSession, getUserSession, closeConnection };
