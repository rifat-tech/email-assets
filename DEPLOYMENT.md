# 🚀 SPORTY - Deployment Guide

This guide covers deploying the SPORTY e-commerce application to production.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database seeded with products
- [ ] Frontend builds without errors
- [ ] Backend API tested
- [ ] Security measures reviewed
- [ ] Git repository created

## 🗄️ Database Deployment (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier available)

### 2. Configure Database

1. **Create Database User:**
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save username and password

2. **Configure Network Access:**
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development
   - Or add specific IPs for production

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 3. Seed Production Database

```bash
# Update .env with Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sporty?retryWrites=true&w=majority

# Run seeder
npm run seed
```

## 🖥️ Backend Deployment (Render)

### Option 1: Deploy to Render

1. **Create Render Account:**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** sporty-api
     - **Root Directory:** server
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sporty
   PORT=5000
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., https://sporty-api.onrender.com)

### Option 2: Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create new app
heroku create sporty-api

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set CLIENT_URL=your_frontend_url

# Deploy
cd server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a sporty-api
git push heroku main
```

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend

Update `client/src/services/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com/api';
```

### 2. Deploy to Vercel

1. **Install Vercel CLI (Optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard:**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** client
     - **Build Command:** `npm run build`
     - **Output Directory:** build

3. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment
   - Your app will be live at https://your-app.vercel.app

### 3. Deploy via CLI

```bash
cd client
vercel

# Follow prompts
# Set environment variables when asked
```

## 🔧 Alternative Deployment Options

### Frontend Alternatives

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
cd client
npm run build

# Deploy
netlify deploy --prod --dir=build
```

#### GitHub Pages
```bash
# Add to client/package.json
"homepage": "https://yourusername.github.io/sporty",

# Install gh-pages
npm install --save-dev gh-pages

# Add scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Backend Alternatives

#### Railway
1. Go to [Railway](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Deploy

#### DigitalOcean App Platform
1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create new app
3. Connect GitHub repository
4. Configure build settings
5. Add environment variables
6. Deploy

## 🔒 Production Security Checklist

### Backend Security

- [ ] Use HTTPS only
- [ ] Enable MongoDB authentication
- [ ] Use strong database passwords
- [ ] Restrict CORS to specific origins
- [ ] Implement rate limiting
- [ ] Add helmet.js for security headers
- [ ] Validate and sanitize all inputs
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB IP whitelist
- [ ] Implement proper error handling (don't expose stack traces)

### Frontend Security

- [ ] Use HTTPS
- [ ] Implement Content Security Policy
- [ ] Sanitize user inputs
- [ ] Use secure cookies (if implementing auth)
- [ ] Keep dependencies updated
- [ ] Remove console.logs in production

## 📊 Post-Deployment

### 1. Test Production Application

- [ ] Visit frontend URL
- [ ] Test product browsing
- [ ] Test search functionality
- [ ] Test category filtering
- [ ] Test add to cart
- [ ] Test cart drawer
- [ ] Test checkout flow
- [ ] Test on mobile devices
- [ ] Test on different browsers

### 2. Monitor Application

**Backend Monitoring:**
- Check Render/Heroku logs
- Monitor API response times
- Check database connections
- Monitor error rates

**Frontend Monitoring:**
- Check Vercel analytics
- Monitor page load times
- Check for console errors
- Monitor user interactions

### 3. Setup Custom Domain (Optional)

#### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### Render:
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records

## 🔄 Continuous Deployment

### Setup Auto-Deploy

Both Vercel and Render support automatic deployments:

1. **Connect GitHub Repository**
2. **Enable Auto-Deploy:**
   - Vercel: Automatic by default
   - Render: Enable in settings

3. **Deploy on Push:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   # Automatically deploys to production
   ```

## 📝 Environment Variables Summary

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sporty
PORT=5000
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 🐛 Troubleshooting Deployment

### Backend Issues

**Problem:** Cannot connect to MongoDB
- Check connection string format
- Verify database user credentials
- Check IP whitelist in MongoDB Atlas

**Problem:** CORS errors
- Verify CLIENT_URL matches frontend URL
- Check CORS configuration in server.js

**Problem:** 503 Service Unavailable
- Check if service is running
- Review deployment logs
- Verify environment variables

### Frontend Issues

**Problem:** API calls failing
- Verify REACT_APP_API_URL is correct
- Check if backend is running
- Review browser console for errors

**Problem:** Build fails
- Check for syntax errors
- Verify all dependencies are installed
- Review build logs

**Problem:** Blank page after deployment
- Check browser console for errors
- Verify build output directory
- Check routing configuration

## 📈 Performance Optimization

### Backend
- Enable gzip compression
- Implement caching
- Optimize database queries
- Use connection pooling
- Add CDN for static assets

### Frontend
- Enable code splitting
- Optimize images
- Lazy load components
- Minimize bundle size
- Use CDN for assets
- Enable browser caching

## 💰 Cost Estimation

### Free Tier Options
- **MongoDB Atlas:** 512MB storage (Free)
- **Render:** 750 hours/month (Free)
- **Vercel:** Unlimited deployments (Free for personal)

### Paid Options (if needed)
- **MongoDB Atlas:** $9/month (Shared cluster)
- **Render:** $7/month (Starter)
- **Vercel:** $20/month (Pro)

## 🎉 Deployment Complete!

Your SPORTY e-commerce application is now live!

**Next Steps:**
1. Share your application URL
2. Gather user feedback
3. Monitor performance
4. Plan future enhancements
5. Keep dependencies updated

---

**Need Help?**
- Check deployment platform documentation
- Review application logs
- Test locally first
- Verify environment variables

Good luck with your deployment! 🚀
