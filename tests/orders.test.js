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
  const prod = await new Product({ name: 'Headset', slug: 'headset', price: 60, stock: 20 }).save();
  productId = prod._id.toString();
  // register user
  const res = await request(app).post('/api/auth/register').send({ email: 'order@user.com', password: 'order' });
  token = res.body.token;
  // add to cart
  await request(app).post('/api/cart/add').set('Authorization', `Bearer ${token}`).send({ productId, quantity: 1 });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Orders API', () => {
  test('create order from cart', async () => {
    const res = await request(app).post('/api/orders').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('orderId');
    expect(res.body.total).toBe(60);
  });

  test('order cart cleared after purchase', async () => {
    const res = await request(app).get('/api/cart').set('Authorization', `Bearer ${token}`);
    expect(res.body.cart).toEqual([]);
  });
});

