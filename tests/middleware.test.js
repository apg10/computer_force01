const request = require('supertest');
const app = require('../../server');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

let tokenAdmin, tokenUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Clear users
  await User.deleteMany({});
  // Create admin user
  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@test.com', password: 'admin123', role: 'admin' });
  tokenAdmin = adminRes.body.token;
  // Create customer user
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({ email: 'user@test.com', password: 'user123' });
  tokenUser = userRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Auth middleware', () => {
  test('allows request with valid token', async () => {
    const res = await request(app).get('/api/products').set('Authorization', `Bearer ${tokenUser}`);
    expect(res.status).toBe(200); // public route still 200
  });

  test('blocks request without token on protected route', async () => {
    const res = await request(app).post('/api/cart/add').send({ productId: '123', quantity: 1 });
    expect(res.status).toBe(401);
  });
});

describe('Admin middleware', () => {
  test('admin can access admin route', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Test', slug: 'test', price: 10 });
    expect(res.status).toBe(200);
  });
  test('non-admin cannot access admin route', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ name: 'Test', slug: 'test', price: 10 });
    expect(res.status).toBe(403);
  });
});

