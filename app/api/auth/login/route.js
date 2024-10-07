import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import connectToDatabase from '../../../lib/mongo';
import bcrypt from 'bcrypt';  
import { ObjectId } from 'mongodb';
const uri = process.env.MONGO_URI; 
const dbName = 'newDB'; 
const usersCollection = 'users';  

export async function POST(request) {
  const { email, password, googleId, id } = await request.json();
  let user;
 console.log("first hit", id)
   
  if (googleId) {
    user = await fetchGoogleUserFromDatabase(id, googleId);
    console.log("USER", user)

  } else {
    user = await fetchUserFromDatabase(email, password);
  }
  

  console.log(user)
  if (user?.email) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'xybgj', // Use a secure secret in production
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Serialize the token into a cookie
    const cookie = serialize('token', token, {
      httpOnly: true, // HTTP-only, can't be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure in production (HTTPS only)
      maxAge: 60 * 60, // 1 hour
      path: '/', // Cookie accessible throughout the site
      sameSite: 'strict', // Prevent CSRF attacks
    });

    // Set the cookie in the response headers
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  } else {

    console.log("NOOOO")
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Function to fetch a user by email and password
async function fetchUserFromDatabase(email, password) {
   

  try {
  
    const { db } = await connectToDatabase(); 
    const collection = db.collection(usersCollection);

    // Find the user by email
    const user = await collection.findOne({ email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user; 
      }
    }

    return null; 
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }  
}


async function fetchGoogleUserFromDatabase(id, googleId) {
  
 
  try {
    const { db } = await connectToDatabase(); 
    const collection = db.collection(usersCollection);

    const user = await collection.findOne({ _id: new ObjectId(id), googleId });
 
    return user || null; // Return user if found, else return null
  } catch (error) {
    console.error('Error fetching Google user from database:', error);
    return null;
  }  
}
