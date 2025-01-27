import pg from 'pg';
 // Correct way to import the Pool class from pg
import 'dotenv/config';     // Import environment variables

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER,          // PostgreSQL username
  host: 'localhost',                  // Database host (e.g., localhost or IP)
  database: process.env.DB,           // Your database name
  password: process.env.DB_PASSWORD,  // Your password
  port: 5432,                         // Default PostgreSQL port
};
const { Pool } = pg;
// Create a PostgreSQL connection pool
const pool = new Pool(dbConfig);

// Function to run the query
const query = async (queryText, params = []) => {
  let client;
  try {
    // Get a client from the pool (this handles opening and closing connections)
    client = await pool.connect();

    // Run the query using the client from the pool
    const result = await client.query(queryText, params);
    // console.log('Query result:', result.rows);

    return result.rows;  // Return the result

  } catch (err) {
    console.error('Error executing query:', err);
    throw err;  // Throw error to handle it in other files if needed
  } finally {
    // Release the client back to the pool after the query is executed
    if (client) {
      client.release();
    }
  }
}

// Function to explicitly close the pool (when your app shuts down)
const close = async () => {
  try {
    await pool.end();  // Close the pool and all its active connections
    console.log('Connection pool closed.');
  } catch (err) {
    console.error('Error closing the connection pool:', err);
  }
}

// Export the functions for use in other files
export default { query, close };
