require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRouter = require('./src/routes/auth');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use('/api/auth', authRouter);
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
