import { POST } from '../../app/api/chat/conversations/new/route';
import dbConnect from '../../app/lib/mongo';

jest.setTimeout(10000); // Increase timeout to 10 seconds

const mockCreate = jest.fn();
jest.mock('../../models/Convo', () => {
  return {
    create: mockCreate,
  };
});

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await mongoose.connection.close(); // Ensure proper teardown
});

describe('POST /api/chat/conversations/new', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a conversation and return a 200 status', async () => {
    dbConnect.mockResolvedValueOnce();

    const fakeConvo = { _id: '123', model: 'test-model', messages: [] };
    mockCreate.mockResolvedValueOnce(fakeConvo);

    const request = {
      json: async () => ({ provider: { id: 'test-model', prompt: 'test-prompt' } }),
    };

    const response = await POST(request);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(fakeConvo);

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
      model: 'test-model',
      messages: expect.any(Array),
    }));
  });

  it('should return a 500 status if there is an error', async () => {
    dbConnect.mockResolvedValueOnce();

    mockCreate.mockRejectedValueOnce(new Error('Failed to create conversation'));

    const request = {
      json: async () => ({ provider: { id: 'test-model', prompt: 'test-prompt' } }),
    };

    const response = await POST(request);

    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Something went wrong' });

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
