import connectToDatabase from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
  try {
    console.log('hit');
    const { db } = await connectToDatabase(); // Ensure you connect to the database
    const body = await request.json();

    const provider = body.convo;
  

    if (!provider || !provider._id) {
      console.log('err');
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract _id and create a new object without it
    const { _id, ...updateData } = provider;

    // Update the conversation in the collection
    const convoCollection = 'convos'; // Make sure this is your collection name
    const updatedConvo = await db.collection(convoCollection).findOneAndUpdate(
      { _id: new ObjectId(_id) }, // Ensure the ID is converted to ObjectId
      { $set: updateData }, // Update only fields except _id
      { returnDocument: 'after' } // This option is used to get the updated document
    );

    if (!updatedConvo) {
      return new Response(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const id = new ObjectId(updatedConvo.user)
  
    const remainingConvos = await db.collection(convoCollection).find({ user: id }).toArray();

   
    return new Response(JSON.stringify(remainingConvos), { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error.message);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
