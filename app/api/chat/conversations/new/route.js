import dbConnect from '../../../../lib/mongo.js';
import mongoose from 'mongoose';


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
 
    
      await dbConnect();
    


    // Parse the JSON body
    const body = await request.json();
    const { provider } = body;

 

  

    if (!provider || !provider.id || !provider.prompt) {
      return new Response(JSON.stringify({ error: 'Invalid provider data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const convo = {
      model: provider.id,
      user: '5',
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

    const existingConvo = await Convo.findOne({ model: provider.id, userId: '5'});

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
