const express = require('express');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/cart/add
 * @desc    Add a product to the cart
 * @access  Authenticated users only
 */
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId and quantity required' });
    }
    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }
    // Use session cart as before, but ensure user identity
    const sessionCart = req.session.cart || [];
    const existing = sessionCart.find((c) => c.productId === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      sessionCart.push({ productId, quantity: qty });
    }
    req.session.cart = sessionCart;
    res.json({ cart: sessionCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/cart
 * @desc    Retrieve current cart items
 * @access  Authenticated users only
 */
router.get('/', auth, async (req, res) => {
  try {
    const sessionCart = req.session.cart || [];
    const detailed = [];
    for (const item of sessionCart) {
      const product = await Product.findById(item.productId).lean();
      if (product) {
        detailed.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        });
      }
    }
    res.json({ cart: detailed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

