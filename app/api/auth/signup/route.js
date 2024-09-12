import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { MongoClient } from 'mongodb';
 
const uri = process.env.MONGO_URI 
 
const dbName = 'test';
const usersCollection = 'users';

export async function POST(request) {
  const { email, password } = await request.json();

  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create new user
    const newUser = {
      email: email,
      password: password,
    };

    const result = await collection.insertOne(newUser);

    if (result.insertedId) {
      // Create JWT token
      const token = jwt.sign(
        {
          id: result.insertedId,
          email: newUser.email,
        },
        process.env.JWT_SECRET || 'xybgj',
        { expiresIn: '1h' }
      );

      // Serialize cookie
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'strict',
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Registration failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
