import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { MongoClient } from 'mongodb';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis'; 

const uri = process.env.MONGO_URI;
const dbName = 'test';
const usersCollection = 'users';
 
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = 'https://cumcams.xyz/api/auth/google';

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code'); 

  if (!code) {
    return new Response(JSON.stringify({ error: 'Authorization code not found' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
 
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
 
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
 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(usersCollection);

  
    let existingUser = await collection.findOne({ email });
 
    if (!existingUser) {
    
      const newUser = { email, googleId: userInfo.data.id };

      const result = await collection.insertOne(newUser);
console.log(result)
      if (!result.insertedId) {
        console.log('err making new user')
        throw new Error('Error creating new user');
      }

      existingUser = newUser;
    }

 
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET || 'xybgj',
      { expiresIn: '1h' }
    );
 
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'strict',
    });

  
    return new Response(null, {
      status: 302, 
      headers: {
        'Location': `https://cumcams.xyz/?id=${existingUser._id}&googleId=${userInfo.data.id}`, 
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
