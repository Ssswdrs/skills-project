import cluster from 'cluster';
import http from 'http';
import os from 'os';
import app from './app.js';  // Import your app configuration
import 'dotenv/config';

const numCPUs = os.cpus().length;
const numWorkers = Math.min(numCPUs - 1, 2);
const port = process.env.PORT || 8000;   // Default port 8000 if not provided
const host = process.env.HOST || 'localhost'; // Default host to localhost if not provided

if (cluster.isPrimary) {
  // Fork workers
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http.createServer(app).listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
  });
}
