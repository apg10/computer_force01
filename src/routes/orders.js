const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order from the user's cart
 * @access  Authenticated users only
 */
router.post('/', auth, async (req, res) => {
  try {
    const cart = req.session.cart || [];
    if (!cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    // Calculate total and build order items
    const items = [];
    let total = 0;
    for (const c of cart) {
      const product = await Order.model('Product').findById(c.productId).lean();
      if (!product) continue;
      const priceAtPurchase = product.price;
      total += priceAtPurchase * c.quantity;
      items.push({ productId: c.productId, quantity: c.quantity, priceAtPurchase });
    }
    const order = new Order({
      userId: req.user.id,
      items,
      total,
    });
    await order.save();
    // Clear cart after successful order
    req.session.cart = [];
    res.status(201).json({ orderId: order._id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Retrieve a specific order for the authenticated user
 * @access  Authenticated users only
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id }).populate('items.productId').lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

