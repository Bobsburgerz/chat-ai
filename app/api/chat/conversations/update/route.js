import dbConnect from '../../../../lib/mongo.js';
import mongoose from 'mongoose';

const convoSchema = new mongoose.Schema({
  model: { type: String, required: true },
  messages: [
    {
      content: { type: String },
      role: { type: String },
    },
  ],
});

const Convo = mongoose.models.Convo || mongoose.model('Convo', convoSchema);

export async function PUT(request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await dbConnect();
    }
    await dbConnect();
    const body = await request.json();
    const  provider  = body;

    console.log(provider);

    if (!provider) {
      return new Response(JSON.stringify({ error: 'Invalid ' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find and update the conversation by model ID
    const updatedConvo = await Convo.findByIdAndUpdate(
      { _id: provider._id }, // Filter criteria
      provider,
      { new: true } // Return the updated document
    );

    if (updatedConvo) {
      const remainingConvos = await Convo.find();  
      return new Response(JSON.stringify(remainingConvos), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
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
