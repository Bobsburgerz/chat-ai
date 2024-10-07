import connectToDatabase from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';

export async function DELETE(request) {
  try {
    const { db } = await connectToDatabase(); // Connect to MongoDB
    const body = await request.json();
    const provider = body.provider;

    console.log( provider?._id); // Debugging log to check if provider is defined

    if (!provider || !provider._id) {
      return new Response(JSON.stringify({ error: 'Invalid provider data' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Collection name
    const convoCollection = 'convos';

    // Find and delete the conversation by ObjectId
    const deletedConvo = await db.collection(convoCollection).findOneAndDelete({
      _id: new ObjectId(provider._id)
    });
console.log(deletedConvo.user)
    if (deletedConvo) {
      // Find remaining conversations by user after deletion
      const remainingConvos = await db.collection(convoCollection).find({
        user: new ObjectId(deletedConvo.user)
      }).toArray()
    console.log(remainingConvos)
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
