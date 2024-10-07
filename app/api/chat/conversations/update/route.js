import connectToDatabase from '../../../../lib/mongo';

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase(); // Ensure you connect to the database
    const body = await request.json();
    const provider = body;

    if (!provider || !provider._id) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the conversation in the collection
    const convoCollection = 'convos'; // Make sure this is your collection name
    const updatedConvo = await db.collection(convoCollection).findOneAndUpdate(
      { _id: new ObjectId(provider._id) }, // Ensure the ID is converted to ObjectId
      { $set: provider },
      { returnDocument: 'after' } // This option is used to get the updated document
    );

    if (!updatedConvo.value) {
      return new Response(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find remaining conversations for the same user
    const remainingConvos = await db.collection(convoCollection).find({ user: updatedConvo.value.user }).toArray();

    return new Response(JSON.stringify(remainingConvos), { status: 200 });
  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
