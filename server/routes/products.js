const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    let products = Product.find(query);

    // Sort products
    if (sort === 'price-asc') {
      products = products.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      products = products.sort({ price: -1 });
    } else if (sort === 'rating') {
      products = products.sort({ rating: -1 });
    } else {
      products = products.sort({ createdAt: -1 });
    }

    const result = await products;

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
