const request = require('supertest');
const app = require('../../server');
const Product = require('../../src/models/Product');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

let adminToken, userToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Product.deleteMany({});
  await User.deleteMany({});
  // create admin
  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@prod.com', password: 'admin', role: 'admin' });
  adminToken = adminRes.body.token;
  // create customer
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({ email: 'user@prod.com', password: 'user' });
  userToken = userRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Products API', () => {
  test('list products (public)', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBeTruthy();
  });

  test('admin can create product', async () => {
    const prod = { name: 'Phone', slug: 'phone', price: 299, category: 'electronics', stock: 10 };
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(prod);
    expect(res.status).toBe(200);
    expect(res.body.product).toMatchObject({ name: 'Phone' });
  });

  test('non-admin cannot create product', async () => {
    const prod = { name: 'Laptop', slug: 'laptop', price: 999 };
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send(prod);
    expect(res.status).toBe(403);
  });

  test('admin can update product', async () => {
    const prod = await Product.findOne({ slug: 'phone' });
    const res = await request(app)
      .put(`/api/products/${prod._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 279 });
    expect(res.status).toBe(200);
    expect(res.body.product.price).toBe(279);
  });

  test('admin can delete product', async () => {
    const prod = await Product.findOne({ slug: 'phone' });
    const res = await request(app)
      .delete(`/api/products/${prod._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});

