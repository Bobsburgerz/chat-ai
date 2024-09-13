import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { MongoClient } from 'mongodb';
import { OAuth2Client } from 'google-auth-library';

 
const uri = process.env.MONGO_URI;
const dbName = 'test';
const usersCollection = 'users';

// Google OAuth2 client setup
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
 

const oAuth2Client = new OAuth2Client(clientId, clientSecret);

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code'); // Get authorization code from URL

  if (!code) {
    return new Response(JSON.stringify({ error: 'Authorization code not found' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Exchange authorization code for access token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user info from Google
    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: 'v2',
    });

    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email not found in Google profile' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

    // Check if the user already exists
    let existingUser = await collection.findOne({ email });

    if (!existingUser) {
      // Create new user if not found
      const newUser = { email, googleId: userInfo.data.id };

      const result = await collection.insertOne(newUser);

      if (!result.insertedId) {
        throw new Error('Error creating new user');
      }

      existingUser = newUser;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET || 'xybgj',
      { expiresIn: '1h' }
    );

    // Serialize cookie with JWT token
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'strict',
    });

    // Redirect user to the homepage after setting the cookie
    return new Response(null, {
      status: 302, // HTTP status for redirection
      headers: {
        'Location': 'https://cumcams.xyz/', // Redirect to this URL
        'Set-Cookie': cookie,
      },
    });

  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
