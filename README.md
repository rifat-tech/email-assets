# 🏆 SPORTY - Sports E-Commerce Platform

A modern, full-stack e-commerce web application for sports items including clothing, cricket equipment, and accessories.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📁 Project Structure

```
sporty-ecommerce/
├── client/          # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── context/
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sporty-ecommerce
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Setup environment variables**
```bash
cp .env.example .env
```
Edit `.env` and add your MongoDB connection string.

4. **Seed the database**
```bash
npm run seed
```

5. **Run the application**

Development mode (runs both frontend and backend):
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Build for Production

```bash
npm run build
```

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `POST /api/cart` - Add item to cart

### Checkout
- `POST /api/checkout` - Process checkout

## 🎨 Features

- ✅ Responsive product catalog with grid layout
- ✅ Category filtering (Cricket, Clothing, Accessories)
- ✅ Shopping cart with quantity controls
- ✅ Cart drawer with real-time updates
- ✅ Product search functionality
- ✅ Checkout flow
- ✅ Modern, sporty UI design
- ✅ Mobile-first responsive design

## 🎯 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Order history
- [ ] Admin panel for product management
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Image upload for products

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Render/Heroku)
```bash
cd server
# Follow platform-specific deployment instructions
```

### Database (MongoDB Atlas)
- Create a cluster on MongoDB Atlas
- Update MONGO_URI in .env with Atlas connection string

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for sports enthusiasts

---

© 2025 SPORTY. All rights reserved.
