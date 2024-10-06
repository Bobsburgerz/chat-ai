import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = 'test';
const usersCollection = 'users';

export async function POST(request) {
 
  const { updates } = await request.json();
console.log(updates)
  if (!updates.email) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

    // Convert the string ID to ObjectId if necessary
    const userId = new ObjectId(updates.email);

    // Remove the `id` field from updates to prevent updating `_id`
   

    // Find and update the user
    const result = await collection.findOneAndUpdate(
      { email: userId },
      { $set: updates },
      { returnDocument: 'after' }  
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the updated user
    return new Response(JSON.stringify({ success: true, user: result.value }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error connecting to MongoDB or updating user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
