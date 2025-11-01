const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: '../.env' });

// Sample products data
const products = [
  // Cricket Equipment
  {
    title: 'Pro Willow Cricket Bat',
    category: 'Cricket',
    price: 149.99,
    rating: 4.8,
    stock: 25,
    img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
    tags: ['cricket', 'bat', 'professional'],
    description: 'Premium English willow cricket bat for professional players',
  },
  {
    title: 'Leather Cricket Ball - Red',
    category: 'Cricket',
    price: 24.99,
    rating: 4.6,
    stock: 100,
    img: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=500',
    tags: ['cricket', 'ball', 'leather'],
    description: 'High-quality leather cricket ball for matches',
  },
  {
    title: 'Cricket Batting Gloves',
    category: 'Cricket',
    price: 39.99,
    rating: 4.5,
    stock: 50,
    img: 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=500',
    tags: ['cricket', 'gloves', 'protection'],
    description: 'Comfortable batting gloves with superior grip',
  },
  {
    title: 'Cricket Batting Pads',
    category: 'Cricket',
    price: 79.99,
    rating: 4.7,
    stock: 30,
    img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500',
    tags: ['cricket', 'pads', 'protection'],
    description: 'Lightweight batting pads with maximum protection',
  },
  {
    title: 'Cricket Helmet',
    category: 'Cricket',
    price: 89.99,
    rating: 4.9,
    stock: 20,
    img: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=500',
    tags: ['cricket', 'helmet', 'safety'],
    description: 'Professional cricket helmet with titanium grille',
  },
  {
    title: 'Cricket Kit Bag',
    category: 'Cricket',
    price: 59.99,
    rating: 4.4,
    stock: 40,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    tags: ['cricket', 'bag', 'storage'],
    description: 'Spacious cricket kit bag with multiple compartments',
  },

  // Clothing
  {
    title: 'Performance Sports Tee',
    category: 'Clothing',
    price: 29.99,
    rating: 4.3,
    stock: 150,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    tags: ['clothing', 'tshirt', 'performance'],
    description: 'Moisture-wicking performance t-shirt for athletes',
  },
  {
    title: 'Athletic Training Hoodie',
    category: 'Clothing',
    price: 54.99,
    rating: 4.6,
    stock: 80,
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    tags: ['clothing', 'hoodie', 'training'],
    description: 'Comfortable hoodie perfect for training sessions',
  },
  {
    title: 'Sports Track Pants',
    category: 'Clothing',
    price: 44.99,
    rating: 4.5,
    stock: 100,
    img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    tags: ['clothing', 'pants', 'athletic'],
    description: 'Flexible track pants for all sports activities',
  },
  {
    title: 'Compression Shorts',
    category: 'Clothing',
    price: 34.99,
    rating: 4.4,
    stock: 120,
    img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
    tags: ['clothing', 'shorts', 'compression'],
    description: 'High-performance compression shorts for athletes',
  },
  {
    title: 'Sports Jersey - Blue',
    category: 'Clothing',
    price: 39.99,
    rating: 4.7,
    stock: 90,
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
    tags: ['clothing', 'jersey', 'team'],
    description: 'Breathable sports jersey in vibrant blue',
  },

  // Accessories
  {
    title: 'Sports Snapback Cap',
    category: 'Accessories',
    price: 24.99,
    rating: 4.2,
    stock: 200,
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
    tags: ['accessories', 'cap', 'headwear'],
    description: 'Stylish snapback cap with embroidered logo',
  },
  {
    title: 'Athletic Gym Bag',
    category: 'Accessories',
    price: 49.99,
    rating: 4.5,
    stock: 75,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    tags: ['accessories', 'bag', 'gym'],
    description: 'Durable gym bag with shoe compartment',
  },
  {
    title: 'Sports Water Bottle',
    category: 'Accessories',
    price: 19.99,
    rating: 4.6,
    stock: 250,
    img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    tags: ['accessories', 'bottle', 'hydration'],
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
  },
  {
    title: 'Fitness Tracker Watch',
    category: 'Accessories',
    price: 129.99,
    rating: 4.8,
    stock: 60,
    img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    tags: ['accessories', 'watch', 'fitness'],
    description: 'Smart fitness tracker with heart rate monitor',
  },
  {
    title: 'Sports Sunglasses',
    category: 'Accessories',
    price: 69.99,
    rating: 4.4,
    stock: 85,
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    tags: ['accessories', 'sunglasses', 'protection'],
    description: 'UV protection sports sunglasses with polarized lenses',
  },
  {
    title: 'Sweat Headband Set',
    category: 'Accessories',
    price: 14.99,
    rating: 4.3,
    stock: 180,
    img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
    tags: ['accessories', 'headband', 'sweat'],
    description: 'Pack of 3 moisture-wicking headbands',
  },
  {
    title: 'Knee Support Brace',
    category: 'Accessories',
    price: 29.99,
    rating: 4.7,
    stock: 110,
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=500',
    tags: ['accessories', 'support', 'protection'],
    description: 'Adjustable knee support for injury prevention',
  },
];

// Seed function
const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
