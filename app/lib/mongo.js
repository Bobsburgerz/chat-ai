// lib/mongo.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
let cachedClient;
let cachedDb;

async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db('newBb'); 

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
