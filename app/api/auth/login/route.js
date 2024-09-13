import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { ideahub } from 'googleapis/build/src/apis/ideahub';

export async function POST(request) {
  const { email, password, googleId, id } = await request.json();
 let user
 if (googleId) {
   user = await fetchGoogleUserFromDatabase(id, googleId);
 } else {
  user = await fetchUserFromDatabase(email, password);
 }
  if (user.email) {
  
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'xybgj', // Use an environment variable for the secret
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
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function fetchUserFromDatabase(email, password) {
  const mockUser = {
    id: '123',
    email: 'user@example.com',
    password: 'password123', // In reality, you should hash and compare the password
  };
console.log(mockUser)
  if (email && password ) {
    return mockUser;
  } else {
    return null;
  }
}

async function fetchGoogleUserFromDatabase(id, googleId) {
  const mockUser = {
    id: '123',
    email: 'user@example.com',
    password: 'password123', // In reality, you should hash and compare the password
  };

  if (id && googleId ) {
    return mockUser;
  } else {
    return null;
  }
}
