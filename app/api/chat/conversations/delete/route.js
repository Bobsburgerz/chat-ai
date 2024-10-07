import connectToDatabase from '../../../../lib/mongo';
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

export async function DELETE(request) {
  try { if (mongoose.connection.readyState !== 1) {
      await connectToDatabase()
    }
 

 
    const body = await request.json();
    console.log( body)
    const  provider  = body.provider;

    console.log(provider, provider._id); // Debugging log to check if provider is defined

    if (!provider || !provider._id) {
      return new Response(JSON.stringify({ error: 'Invalid provider data' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find and delete the conversation by model ID
    const deletedConvo = await Convo.findOneAndDelete({_id: provider._id });
   
    if (deletedConvo) {
      const remainingConvos = await Convo.find({user: deletedConvo.user});  
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
