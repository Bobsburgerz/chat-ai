import dbConnect from '../../../../lib/mongo.js';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const convoSchema = new mongoose.Schema({
  model: { type: String, required: true },
  user:  { type: String },
  messages: [
    {
      content: { type: String },
      role: { type: String },
    },
  ],
});

const Convo = mongoose.models.Convo || mongoose.model('Convo', convoSchema);

export async function POST(request) {
  try {
    const body = await request.json();
    const { provider, email } = body;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbName = 'test';
    const usersCollection = 'users';
    
   
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

 
    

    if (!provider || !provider.id || !provider.prompt || !email) {
      return new Response(JSON.stringify({ error: 'Invalid provider data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
 
        const user = await collection.findOne({ email });

    const convo = {
      model: provider.id,
      user: user._id,
      messages: [
        {
          content: `
            (( respond to the user's inputs as an immersive fictional roleplay or chat. ...
            ${provider.prompt}
          `,
          role: 'system',
        },
      ],
    };
 
    const existingConvo = await Convo.findOne({ model: provider.id, userId: user._id});

    if (existingConvo) {
      return new Response(JSON.stringify({ error: 'Conversation with this model already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const createdConvo = await Convo.create(convo);
    const newArray = await Convo.find();
    console.log(newArray)
    if (createdConvo) {
      return new Response(JSON.stringify(newArray), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Something went wrong' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
