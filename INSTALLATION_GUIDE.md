# 📦 SPORTY - Complete Installation Guide

Step-by-step guide to install and run the SPORTY e-commerce application.

## 🎯 What You'll Need

Before starting, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Choose one option:
  - **Option A:** Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - **Option B:** MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)
- **Code Editor** (VS Code recommended)

## 📥 Step 1: Verify Prerequisites

Open your terminal and verify installations:

```bash
# Check Node.js version (should be v14 or higher)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed (if using local)
mongod --version
```

Expected output:
```
v18.x.x or higher
8.x.x or higher
db version v6.x.x or higher
```

## 📂 Step 2: Navigate to Project Directory

```bash
cd /vercel/sandbox
```

## 🔧 Step 3: Install Dependencies

### Option A: Install Everything at Once (Recommended)

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend (server)
- Frontend (client)

### Option B: Install Separately

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

**Expected time:** 2-5 minutes depending on internet speed

## 🗄️ Step 4: Setup Database

### Option A: Using Local MongoDB

1. **Start MongoDB:**
   ```bash
   # On macOS/Linux
   mongod
   
   # On Windows (run as administrator)
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
   ```

2. **Keep this terminal open** - MongoDB needs to run in the background

### Option B: Using MongoDB Atlas (Cloud)

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new cluster (select free tier)

2. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `sporty_user`
   - Password: Create a strong password
   - User Privileges: Read and write to any database
   - Click "Add User"

3. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

4. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://sporty_user:<password>@cluster0.xxxxx.mongodb.net/`

## ⚙️ Step 5: Configure Environment Variables

1. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file:**
   
   Open `.env` in your text editor and update:

   **For Local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017/sporty
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://sporty_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sporty?retryWrites=true&w=majority
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

   **Important:** Replace `YOUR_PASSWORD` with your actual MongoDB Atlas password!

## 🌱 Step 6: Seed the Database

Populate the database with sample products:

```bash
npm run seed
```

**Expected output:**
```
MongoDB Connected: localhost:27017 (or your Atlas cluster)
Existing products cleared
18 products seeded successfully
```

**If you see an error:**
- Check if MongoDB is running (for local)
- Verify your connection string in .env
- Check your internet connection (for Atlas)
- Verify database user credentials (for Atlas)

## 🚀 Step 7: Start the Application

### Option A: Run Both Frontend and Backend Together (Recommended)

```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

**Expected output:**
```
[server] Server running on port 5000
[server] MongoDB Connected: ...
[client] webpack compiled successfully
[client] Compiled successfully!
```

### Option B: Run Separately

**Terminal 1 - Start Backend:**
```bash
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
npm run client
```

## 🌐 Step 8: Access the Application

1. **Open your browser**
2. **Navigate to:** `http://localhost:3000`
3. **You should see:** The SPORTY homepage with hero section and products

## ✅ Step 9: Verify Installation

### Test Backend API

Open a new terminal and run:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test products endpoint
curl http://localhost:5000/api/products
```

**Expected response:**
```json
{"status":"OK","message":"SPORTY API is running"}
{"success":true,"count":18,"data":[...]}
```

### Test Frontend Features

1. **Homepage:**
   - ✅ See hero section with "Welcome to SPORTY"
   - ✅ See 3 category cards (Cricket, Clothing, Accessories)
   - ✅ See featured products grid

2. **Navigation:**
   - ✅ Click "Shop Now" → Should go to Products page
   - ✅ Click "SPORTY" logo → Should return to home

3. **Products Page:**
   - ✅ See all 18 products
   - ✅ Use sidebar to filter by category
   - ✅ Use search bar to search products
   - ✅ Use sort dropdown to sort by price/rating

4. **Shopping Cart:**
   - ✅ Click "Add to Cart" on any product
   - ✅ Cart icon shows item count
   - ✅ Click cart icon → Cart drawer opens
   - ✅ Adjust quantity with +/- buttons
   - ✅ Remove items from cart

5. **Checkout:**
   - ✅ Click "Proceed to Checkout"
   - ✅ Fill out the form
   - ✅ Submit order
   - ✅ See success message

## 🐛 Troubleshooting

### Problem: "Cannot find module"

**Solution:**
```bash
# Delete all node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install-all
```

### Problem: "Port 5000 already in use"

**Solution:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Problem: "MongoDB connection failed"

**Solution for Local MongoDB:**
```bash
# Make sure MongoDB is running
mongod

# Check if MongoDB service is active
# On macOS
brew services list

# On Linux
sudo systemctl status mongod
```

**Solution for MongoDB Atlas:**
- Verify connection string is correct
- Check username and password
- Ensure IP address is whitelisted
- Check internet connection

### Problem: "CORS error in browser"

**Solution:**
- Verify backend is running on port 5000
- Check CLIENT_URL in .env matches frontend URL
- Clear browser cache and reload

### Problem: "React app shows blank page"

**Solution:**
```bash
# Check browser console for errors
# Clear cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)

# Rebuild the app
cd client
rm -rf build
npm run build
npm start
```

### Problem: "Products not loading"

**Solution:**
```bash
# Re-seed the database
npm run seed

# Check backend logs for errors
# Verify MongoDB connection
```

## 📱 Testing on Mobile

1. **Find your local IP address:**
   ```bash
   # On macOS/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. **Update .env:**
   ```env
   CLIENT_URL=http://YOUR_LOCAL_IP:3000
   ```

3. **Access from mobile:**
   - Connect mobile to same WiFi
   - Open browser on mobile
   - Navigate to `http://YOUR_LOCAL_IP:3000`

## 🎓 Next Steps

Now that your application is running:

1. **Explore the code:**
   - Check `client/src/components/` for React components
   - Check `server/routes/` for API endpoints
   - Check `server/models/` for database schemas

2. **Make changes:**
   - Modify components and see hot reload
   - Add new products in seed.js
   - Customize colors in tailwind.config.js

3. **Learn more:**
   - Read [README.md](./README.md) for project overview
   - Read [SETUP.md](./SETUP.md) for detailed documentation
   - Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide

## 📚 Useful Commands

```bash
# Development
npm run dev              # Run both frontend and backend
npm run client           # Run frontend only
npm run server           # Run backend only

# Database
npm run seed             # Seed database with products

# Installation
npm run install-all      # Install all dependencies
npm run install-client   # Install frontend dependencies
npm run install-server   # Install backend dependencies

# Production
npm run build            # Build frontend for production
```

## 🎉 Success!

If you've completed all steps and can browse products, add to cart, and checkout, congratulations! Your SPORTY e-commerce application is running successfully! 🏆

## 💡 Tips

- Keep MongoDB running in a separate terminal
- Use `Ctrl+C` to stop the development servers
- Changes to React components will hot reload automatically
- Changes to backend require server restart
- Check browser console for frontend errors
- Check terminal for backend errors

## 🆘 Still Having Issues?

1. **Check all terminals for error messages**
2. **Verify all prerequisites are installed**
3. **Ensure .env file is configured correctly**
4. **Try restarting everything:**
   ```bash
   # Stop all servers (Ctrl+C)
   # Restart MongoDB (if local)
   mongod
   # Restart application
   npm run dev
   ```

---

**Happy Coding! 🚀**

Need more help? Check the other documentation files:
- [README.md](./README.md) - Project overview
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [SETUP.md](./SETUP.md) - Detailed setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Complete project summary
