# 🛠️ Setup Guide - Smart Recipe Generator

This guide provides detailed setup instructions for development and deployment.

## 📋 Prerequisites

### Required Software
- **Node.js**: Version 14.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Verify Installation
```powershell
node --version  # Should show v14.x or higher
npm --version   # Should show 6.x or higher
```

## 🚀 Local Development Setup

### Step 1: Install Dependencies
```powershell
cd C:\Users\shreyash\SmartRecipeGenerator-Fresh
npm install
```

This installs:
- `next` (13.5.4): React framework
- `react` (18.2.0): UI library
- `react-dom` (18.2.0): React DOM rendering

### Step 2: Start Development Server
```powershell
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000 (for testing on mobile devices)

### Step 3: Test the Application

1. **Add Ingredients**: Click the ingredient input field, type "tomato", click "Add"
2. **Upload Image**: Click "Choose File" and upload any image
3. **Apply Filters**: Select dietary preferences, difficulty, or time constraints
4. **View Recipes**: Matching recipes appear automatically
5. **Expand Details**: Click "Show Details" on any recipe card
6. **Adjust Servings**: Use +/- buttons to see nutrition changes
7. **Rate & Favorite**: Click stars to rate, heart to favorite
8. **View Favorites**: Click "Show Favorites" button

## 🏗️ Production Build

### Build the Application
```powershell
npm run build
```

This creates an optimized production build in the `.next` folder.

### Test Production Build Locally
```powershell
npm start
```

## 🌐 Deployment Instructions

### Option 1: Vercel (Recommended - Free Tier)

**Why Vercel?**
- Zero configuration for Next.js
- Automatic HTTPS
- Global CDN
- Free tier includes 100GB bandwidth

**Method A: Deploy via Git (Easiest)**

1. **Create GitHub Repository**
   ```powershell
   cd C:\Users\shreyash\SmartRecipeGenerator-Fresh
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/smart-recipe-generator.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com/signup](https://vercel.com/signup)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (no configuration needed!)

3. **Access Your App**
   - Vercel provides a URL like: `https://smart-recipe-generator-xxx.vercel.app`
   - Custom domains available in settings

**Method B: Deploy via Vercel CLI**

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd C:\Users\shreyash\SmartRecipeGenerator-Fresh
vercel

# Follow the prompts:
# ? Set up and deploy? Yes
# ? Which scope? (your account)
# ? Link to existing project? No
# ? What's your project's name? smart-recipe-generator
# ? In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Option 2: Netlify (Free Tier)

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 14.x or higher

2. **Deploy Steps**
   - Push code to GitHub
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub and select repository
   - Netlify auto-detects Next.js settings
   - Click "Deploy site"

3. **Custom Domain** (optional)
   - Go to Domain settings
   - Add your custom domain
   - Update DNS records as instructed

### Option 3: Railway (Free Tier)

1. **Prerequisites**
   - Push code to GitHub
   - Create account at [railway.app](https://railway.app)

2. **Deploy Steps**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects Next.js
   - Click "Deploy"

3. **Environment**
   - Railway assigns a URL automatically
   - Access in project settings

### Option 4: Render (Free Tier)

1. **Setup**
   - Create account at [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configuration**
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Free

3. **Deploy**
   - Click "Create Web Service"
   - Render builds and deploys automatically

## 🔧 Environment Variables (Optional)

If you need to add environment variables:

### Local Development
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Production (Vercel)
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add variables with appropriate scope (Production/Preview/Development)

## 📱 Testing on Mobile Devices

### Local Network Testing

1. **Find Your IP Address**
   ```powershell
   ipconfig
   # Look for "IPv4 Address" under your active connection
   ```

2. **Access from Mobile**
   - Ensure mobile device is on the same Wi-Fi network
   - Open browser on mobile
   - Navigate to `http://[YOUR_IP]:3000`
   - Example: `http://192.168.1.100:3000`

### Production Testing
- Simply access your deployed URL from any mobile browser
- Test responsive design at different screen sizes

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force .next
npm run build
```

### Module Not Found
```powershell
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Recipe Data Not Loading
- Verify `public/recipes.json` exists
- Check JSON syntax is valid
- Ensure file is in the `public` directory

## 🔄 Updates & Maintenance

### Update Dependencies
```powershell
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install next@latest
```

### Add New Recipes
1. Edit `public/recipes.json`
2. Follow the existing recipe structure
3. Ensure all required fields are present
4. Validate JSON syntax
5. Restart dev server (production redeploys automatically)

## 🧪 Testing Checklist

Before deploying, verify:

- [ ] All 20+ recipes load correctly
- [ ] Image upload triggers ingredient detection
- [ ] Manual ingredient addition works
- [ ] All filters apply correctly (dietary, difficulty, time)
- [ ] Recipe cards expand/collapse
- [ ] Serving size adjustment updates nutrition
- [ ] Rating system persists across page refreshes
- [ ] Favorites feature works
- [ ] Mobile responsive design works on small screens
- [ ] No console errors
- [ ] Production build completes successfully

## 📊 Performance Optimization

### Already Implemented
- Next.js automatic code splitting
- Optimized CSS (no heavy frameworks)
- Client-side caching with localStorage
- Lazy loading of recipe details

### Future Enhancements
- Image optimization with next/image
- Database integration for user accounts
- Real ML ingredient detection
- Recipe recommendations based on history

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 📞 Support

### Common Issues
- **Slow builds**: Clear `.next` folder
- **Deployment fails**: Check build logs for errors
- **Styles not loading**: Verify CSS import in `_app.jsx`
- **API errors**: Check browser console for details

---

**Need help? Check the main README.md for additional information!**
