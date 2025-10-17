# 🚀 Quick Start Guide

## For Evaluators/Reviewers

### 1. Run Locally (2 minutes)

```powershell
# Navigate to project
cd C:\Users\shreyash\SmartRecipeGenerator-Fresh

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser
# Visit: http://localhost:3000
```

### 2. Test Key Features (5 minutes)

#### Basic Flow
1. **Type "tomato" in ingredient field → Click "Add"**
   - See chip appear
   - Recipes auto-filter

2. **Upload any image**
   - Click "Choose File"
   - Select any image
   - See detected ingredients

3. **Apply filters**
   - Select "Vegetarian" from Dietary
   - Select "Easy" from Difficulty
   - Select "30 min" from Max Time
   - Watch recipes filter

4. **Interact with recipes**
   - Click "Show Details" on any recipe
   - Use +/- to adjust servings (watch nutrition update)
   - Click ⭐ to rate
   - Click 🤍 to favorite

5. **View favorites**
   - Click "Show Favorites" button
   - See only favorited recipes

#### Test Mobile Responsive
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on iPhone/Android sizes

### 3. View Documentation (3 minutes)

- **README.md** - Project overview and features
- **DEPLOYMENT.md** - Deployment instructions
- **TECHNICAL_APPROACH.md** - Architecture and decisions
- **IMPLEMENTATION_SUMMARY.md** - Complete feature checklist

## For Deployment

### Fastest: Vercel via Git

```powershell
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin YOUR_REPO_URL
git push -u origin main

# Go to vercel.com
# 1. Sign up with GitHub
# 2. Import repository
# 3. Click Deploy (zero configuration!)
# 4. Done! Get your live URL
```

### Alternative: Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, get instant preview URL
```

## Key Features to Showcase

### ✨ Most Impressive Features

1. **Smart Matching Algorithm**
   - Try searching with partial ingredients
   - Notice how it suggests substitutions
   - See match percentage on each recipe

2. **Real-time Filtering**
   - Change filters and see instant updates
   - No "search" button needed
   - Smooth user experience

3. **Dynamic Serving Size**
   - Expand any recipe
   - Adjust servings with +/-
   - Watch nutrition values update

4. **Persistent State**
   - Rate a recipe (⭐)
   - Refresh the page
   - Rating is saved!

5. **Mobile Responsive**
   - Looks great on all screen sizes
   - Touch-friendly buttons
   - Optimized layouts

## Technology Stack

- **Framework**: Next.js 13.5.4
- **UI Library**: React 18.2.0
- **Styling**: Custom CSS (no frameworks)
- **State**: React Hooks + LocalStorage
- **Deployment**: Vercel-ready

## Project Highlights

✅ **20+ recipes** with diverse cuisines
✅ **Zero configuration** deployment
✅ **No database required** (LocalStorage)
✅ **Production-ready** code
✅ **Fully documented** approach

## Quick Troubleshooting

**Port 3000 in use?**
```powershell
npm run dev -- -p 3001
```

**Dependencies not installed?**
```powershell
npm install
```

**Build errors?**
```powershell
Remove-Item -Recurse -Force .next
npm run build
```

## Contact Flow

**If evaluator wants to test live:**
1. Deploy to Vercel (5 minutes)
2. Share URL: `https://your-app.vercel.app`

**If evaluator wants code walkthrough:**
1. Start with `pages/index.jsx` (main UI)
2. Check `lib/recipeMatcher.js` (algorithm)
3. Review `components/RecipeCard.jsx` (features)

## Time Estimate

- **Setup & test locally**: 5 minutes
- **Read documentation**: 10 minutes
- **Deploy to production**: 5 minutes
- **Total**: 20 minutes to fully evaluate

---

**Ready to go! 🎉**
