import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { MongoClient } from 'mongodb';

const clientId = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
const redirectUri = 'https://zany-system-4jg5g54gvvx5fjpq4-3000.app.github.dev/api/auth/google';

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

const uri = process.env.MONGO_URI || '';
const dbName = 'test';
const usersCollection = 'users';

export async function GET(request) {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  
  console.log('Redirecting to Google OAuth Consent Screen URL:', url);  
  
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  });
}


export async function POST(request) {
  const { code } = await request.json();

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user profile information from Google
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token || '',
      audience: clientId,
    });
    const payload = ticket?.getPayload();
    const email = payload?.email;

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

    // Check if user already exists
    let user = await collection.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = {
        email,
        googleId: payload?.sub,
      };
      await collection.insertOne(user);
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'xybgj',
      { expiresIn: '1h' }
    );

    // Serialize the token in a cookie
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
  } catch (error) {
    console.error('Error during Google OAuth2:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
