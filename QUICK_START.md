# ⚡ SPORTY - Quick Start Guide

Get up and running in 5 minutes!

## 🚀 Quick Setup

```bash
# 1. Install all dependencies
npm run install-all

# 2. Create environment file
cp .env.example .env

# 3. Edit .env with your MongoDB URI
# For local: MONGO_URI=mongodb://localhost:27017/sporty
# For Atlas: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sporty

# 4. Seed the database
npm run seed

# 5. Start the application
npm run dev
```

## 🌐 Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 📝 Common Commands

```bash
# Install dependencies
npm run install-all          # Install both client and server
npm run install-client       # Install client only
npm run install-server       # Install server only

# Development
npm run dev                  # Run both frontend and backend
npm run client               # Run frontend only
npm run server               # Run backend only

# Database
npm run seed                 # Seed database with sample products

# Production
npm run build                # Build frontend for production
```

## 🎯 Test the Application

1. **Browse Products**
   - Visit http://localhost:3000
   - Click "Shop Now" or navigate to Products

2. **Filter Products**
   - Use sidebar to filter by category
   - Use search bar to find products
   - Sort by price or rating

3. **Shopping Cart**
   - Click "Add to Cart" on any product
   - View cart by clicking cart icon in header
   - Adjust quantities with +/- buttons

4. **Checkout**
   - Click "Proceed to Checkout" in cart
   - Fill out the form
   - Submit order

## 🔧 Troubleshooting

### MongoDB Connection Failed
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas and update MONGO_URI in .env
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install-all
```

## 📦 Project Structure

```
sporty-ecommerce/
├── client/          # React + Tailwind CSS frontend
├── server/          # Express + MongoDB backend
├── .env            # Environment variables (create this)
└── package.json    # Root scripts
```

## 🎨 Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **State:** React Context API
- **Styling:** Tailwind CSS with custom sporty theme

## 📚 Full Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

For project overview, see [README.md](./README.md)

---

Need help? Check the full documentation or review the troubleshooting section!
