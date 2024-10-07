import connectToDatabase from '../../../../lib/mongo';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;
 
    if (!userId) {
      return new Response(JSON.stringify({ error: 'ID Required to fetch convos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const id = new ObjectId(userId)
    const uri = process.env.MONGO_URI;
    const convoCollection = 'convos';
    
  
   
    const { db } = await connectToDatabase(); 
    const collection = db.collection(convoCollection);
 
    const convos = await collection.find({user: id }).toArray();

   

    if (convos.length > 0) {
      return new Response(JSON.stringify( convos ), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      console.log("None Found")
      return new Response(JSON.stringify({ message: 'No conversations found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error(error.message);
    

    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
