# 🚀 SPORTY E-Commerce - Setup Guide

This guide will help you set up and run the SPORTY e-commerce application on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - Local MongoDB - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas)

## 🛠️ Installation Steps

### 1. Install Root Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### 4. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

#### For Local MongoDB:
```env
MONGO_URI=mongodb://localhost:27017/sporty
PORT=5000
CLIENT_URL=http://localhost:3000
```

#### For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sporty?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:3000
```

**Note:** Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

### 5. Seed the Database

Populate the database with sample products:

```bash
npm run seed
```

You should see:
```
MongoDB Connected: ...
Existing products cleared
18 products seeded successfully
```

## 🎯 Running the Application

### Option 1: Run Both Frontend and Backend Together (Recommended)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## 🌐 Access the Application

Once running, open your browser and navigate to:

```
http://localhost:3000
```

The backend API will be available at:

```
http://localhost:5000/api
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
  - Query params: `?category=Cricket&search=bat&sort=price-asc`
- `GET /api/products/:id` - Get single product

### Cart
- `POST /api/cart` - Add item to cart
  - Body: `{ "productId": "...", "quantity": 1 }`

### Checkout
- `POST /api/checkout` - Process checkout
  - Body: `{ "items": [...], "customerInfo": {...} }`

### Health Check
- `GET /api/health` - Check API status

## 🧪 Testing the Application

### 1. Test Backend API

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products?category=Cricket
```

### 2. Test Frontend

1. Open `http://localhost:3000`
2. Browse products on the home page
3. Click "Shop Now" or navigate to Products page
4. Filter by category using the sidebar
5. Add items to cart
6. View cart drawer (click cart icon)
7. Proceed to checkout
8. Fill out the checkout form
9. Complete the order

## 📁 Project Structure

```
sporty-ecommerce/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── CartDrawer.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── context/        # React Context
│   │   │   └── CartContext.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── Product.js     # Product schema
│   ├── routes/
│   │   ├── products.js    # Product routes
│   │   ├── cart.js        # Cart routes
│   │   └── checkout.js    # Checkout routes
│   ├── seed.js            # Database seeder
│   ├── server.js          # Express app
│   └── package.json
├── .env                    # Environment variables (create this)
├── .env.example           # Environment template
├── .gitignore
├── package.json           # Root package.json
└── README.md
```

## 🎨 Features Implemented

✅ Responsive product catalog with grid layout  
✅ Category filtering (Cricket, Clothing, Accessories)  
✅ Product search functionality  
✅ Shopping cart with quantity controls  
✅ Cart drawer with real-time updates  
✅ Persistent cart (localStorage)  
✅ Checkout flow with form validation  
✅ Modern, sporty UI design (sky blue → indigo gradients)  
✅ Mobile-first responsive design  
✅ RESTful API with Express  
✅ MongoDB database with Mongoose  
✅ Product sorting (price, rating)  
✅ Stock management  
✅ Rating display  

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError`

**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or check your MongoDB Atlas connection string
- Verify network access in MongoDB Atlas (allow your IP)

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change the PORT in .env file
PORT=5001
```

### React App Not Loading

**Solution:**
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Issues

**Solution:**
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Backend CORS is configured to accept requests from `http://localhost:3000`

## 📦 Building for Production

### Build Frontend

```bash
cd client
npm run build
```

The optimized production build will be in `client/build/`

### Deploy Backend

Set environment variables on your hosting platform:
- `MONGO_URI` - Your MongoDB connection string
- `PORT` - Server port (usually provided by host)
- `CLIENT_URL` - Your frontend URL

### Deployment Platforms

**Frontend:**
- Vercel (Recommended)
- Netlify
- GitHub Pages

**Backend:**
- Render (Recommended)
- Heroku
- Railway
- DigitalOcean

**Database:**
- MongoDB Atlas (Recommended)

## 🔐 Security Notes

⚠️ **Important for Production:**

1. Never commit `.env` file to version control
2. Use strong MongoDB credentials
3. Enable MongoDB authentication
4. Use HTTPS in production
5. Implement proper authentication/authorization
6. Validate and sanitize all user inputs
7. Use environment-specific configurations

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## 💡 Next Steps

Consider implementing:
- User authentication (JWT)
- Order history
- Admin panel
- Payment gateway integration (Stripe, PayPal)
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Image upload for products
- Advanced search and filters

## 🤝 Support

If you encounter any issues:
1. Check this guide thoroughly
2. Review error messages in the console
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

---

Happy coding! 🎉
