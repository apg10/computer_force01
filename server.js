require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_session',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
const authRouter = require('./src/routes/auth');
const cartRouter = require('./src/routes/cart');
const ordersRouter = require('./src/routes/orders');
const productsRouter = require('./src/routes/products');
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// Render home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Export app for testing
module.exports = app;
