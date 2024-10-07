import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import connectToDatabase from '../../../lib/mongo';
import bcrypt from 'bcrypt';  // For password hashing

const uri = process.env.MONGO_URI;
const dbName = 'newDB';
const usersCollection = 'users';

export async function POST(request) {
  // Parse the JSON body from the request
  const { email, password } = await request.json();

 
  try {
    const { db } = await connectToDatabase(); 
    const collection = db.collection(usersCollection);

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

console.log(existingUser)

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = {
      email: email,
      password: hashedPassword,
    };

    const result = await collection.insertOne(newUser);

    if (result.insertedId) {
      // Create JWT token
      const token = jwt.sign(
        {
          id: result.insertedId,
          email: newUser.email,
        },
        process.env.JWT_SECRET || 'xybgj',  // Use a secure secret in production
        { expiresIn: '1h' }
      );

    
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Ensure secure flag in production
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'strict',
      });

      return new Response(JSON.stringify({ success: true, user: newUser }), {
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
