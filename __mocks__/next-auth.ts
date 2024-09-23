// __mocks__/next-auth.ts
const mockNextAuth = jest.fn(async (req, res) => {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      if (email === 'test@example.com' && password === 'password123') {
        res.status(200).json({ id: 1, name: 'User', email: 'test@example.com' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  });
  
  export default mockNextAuth;
  