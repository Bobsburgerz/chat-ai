import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import connectToDatabase from '../../../lib/mongo';
import bcrypt from 'bcrypt';  // For password hashing

const uri = process.env.MONGO_URI;
const dbName = 'newDB';
const usersCollection = 'users';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(usersCollection);

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate random confirmation code
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    const newUser = {
      email: email,
      password: hashedPassword,
      confirmationCode: randomCode,
      confirmed: false,  
    };

    const result = await collection.insertOne(newUser);

    if (result.insertedId) {
       
      const token = jwt.sign(
        {
          id: result.insertedId,
          email: newUser.email,
        },
        process.env.JWT_SECRET || 'xybgj',
        { expiresIn: '1h' }
      );

      // Send confirmation email
      await sendEmail(email, randomCode);

      // Set cookie
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
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
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

async function sendEmail(email, randomCode) {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'info@cumcams.xyz',
            Name: 'CM CMS MEDIA',
          },
          To: [
            {
              Email: email,
              Name: email,
            },
          ],
          Subject: 'Register Your Account',
          TextPart: 'Confirmation Code',
          HTMLPart: `<h3>Welcome to Cumcams.xyz! <a href="https://www.cumcams.xyz?confirm=${randomCode}">Click here</a></h3><br /> to confirm your email.`,
        },
      ],
    });

    const result = await request;
    console.log('Email sent successfully:', result.body);
  } catch (err) {
    console.error('Error sending email:', err.statusCode || err.message);
  }
}
