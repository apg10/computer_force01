const request = require('supertest');
const app = require('../../server');
const Product = require('../../src/models/Product');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

let token, productId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Product.deleteMany({});
  await User.deleteMany({});
  // create product
  const prod = await new Product({ name: 'Mouse', slug: 'mouse', price: 25, stock: 50 }).save();
  productId = prod._id.toString();
  // register user
  const res = await request(app).post('/api/auth/register').send({ email: 'cart@user.com', password: 'cart' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Cart API', () => {
  test('add product to cart', async () => {
    const res = await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.cart)).toBeTruthy();
    expect(res.body.cart[0]).toMatchObject({ quantity: 2 });
  });

  test('view cart contents', async () => {
    const res = await request(app).get('/api/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.cart)).toBeTruthy();
    expect(res.body.cart[0]).toHaveProperty('name', 'Mouse');
  });
});

