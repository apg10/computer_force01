const request = require('supertest');
const app = require('../../server');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Auth API', () => {
  const userData = { email: 'auth@test.com', password: 'pass123' };

  test('register new user', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    const dbUser = await User.findOne({ email: userData.email });
    expect(dbUser).not.toBeNull();
  });

  test('duplicate email registration fails', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.status).toBe(409);
  });

  test('login with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send(userData);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({ ...userData, password: 'wrong' });
    expect(res.status).toBe(401);
  });
});

