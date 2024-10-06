import dbConnect from '../../../../lib/mongo.js';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;
console.log("user", userId)
    if (!userId) {
      return new Response(JSON.stringify({ error: 'ID Required to fetch convos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const id = new ObjectId(userId)
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbName = 'test';
    const convoCollection = 'convos';
    
    // Connect to the database
    await dbConnect();
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(convoCollection);
 
    const convos = await collection.find({user: id }).toArray();

    // Close the client after the operation
    await client.close();

    if (convos.length > 0) {
      return new Response(JSON.stringify( convos ), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ message: 'No conversations found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error(error.message);
    if (client) await client.close();

    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
