import cluster from 'cluster';
import http from 'http';
import os from 'os';
import app from './app.js';  // Import your app configuration
import 'dotenv/config';
import { initSocket } from './socket.js';

const numCPUs = os.cpus().length;
const numWorkers = Math.min(numCPUs - 1, 2);
const port = process.env.PORT || 8000;   // Default port 8000 if not provided
const host = process.env.HOST || 'localhost'; // Default host to localhost if not provided
const server = http.createServer(app);

if (cluster.isPrimary) {
    // Fork workers
    for (let i = 0; i < numWorkers; i++) {
        const worker = cluster.fork();
        worker.on('message', (msg) => {
            if (msg === 'listening') {
                console.log(`Worker ${worker.process.pid} is listening`);
            }
        });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Initialize Socket.IO in each worker
    const io = initSocket(server);

    // Start listening on server
    server.listen(port, host, () => {
        console.log(`Worker ${process.pid} is listening at http://${host}:${port}`);
        process.send('listening');
    });
}
