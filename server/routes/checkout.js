const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   POST /api/checkout
// @desc    Process checkout (simulation)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { items, customerInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required',
      });
    }

    let total = 0;
    const orderItems = [];

    // Validate all items and calculate total
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemTotal,
      });
    }

    // Simulate order creation
    const order = {
      orderId: `ORD-${Date.now()}`,
      items: orderItems,
      total: total,
      customer: customerInfo,
      status: 'confirmed',
      createdAt: new Date(),
    };

    res.json({
      success: true,
      message: 'Order placed successfully!',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
