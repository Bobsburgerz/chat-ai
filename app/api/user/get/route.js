import connectToDatabase from '../../../lib/mongo';
const usersCollection = 'users';

export async function POST(request) {
  try {
 
     
    const  updates = await request.json();

    console.log(updates)

    if (!updates?.email) {
      return new Response(JSON.stringify({ error: 'Email is required!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Parsed updates:', updates);

    // Connect to the database
    const { db } = await connectToDatabase();
    const collection = db.collection(usersCollection);

    // Find user by email
    const result = await collection.findOne({ email: updates.email });

    console.log('Result:', result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error connecting to MongoDB or updating user:', error?.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
