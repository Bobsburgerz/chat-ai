import { createMocks } from 'node-mocks-http';
import mockNextAuth from '../../__mocks__/next-auth'; 

describe('/api/authenticate', () => {
  it('should return user object for valid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await mockNextAuth(req, res); // Use the mock

    expect(res.statusCode).toBe(200);
    // Parse response data from string to object
    expect(JSON.parse(res._getData() as string)).toEqual({ id: 1, name: 'User', email: 'test@example.com' });
  });

  it('should return 401 for invalid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      },
    });

    await mockNextAuth(req, res); // Use the mock

    expect(res.statusCode).toBe(401);
    // Parse response data from string to object
    expect(JSON.parse(res._getData() as string)).toEqual({ message: 'Invalid credentials' });
  });
});
