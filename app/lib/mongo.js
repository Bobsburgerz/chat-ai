import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  // If a cached client exists and is connected, return it
  if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new client if no cached client exists
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  // Connect to the client
  await client.connect();
  
  // Select your database
  const db = client.db('newBb'); // replace 'newBb' with your actual database name

  // Cache the client and db for future use
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
