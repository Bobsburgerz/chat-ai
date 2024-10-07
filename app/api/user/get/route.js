 import connectToDatabase from '../../../../lib/mongo.js';

const uri = process.env.MONGO_URI;
const dbName = 'newDB';
const usersCollection = 'users';

export async function POST(request) {
  try {
    const updates = await request.json();
 console.log( updates?.email)

    if (!updates) {
      return new Response(JSON.stringify({ error: 'Email is required!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

 
    const result = await collection.findOne({ email: updates.email }
    );

    console.log('result', result)
   
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error connecting to MongoDB or updating user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
