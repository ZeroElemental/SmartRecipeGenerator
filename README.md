# 🍳 Smart Recipe Generator

An intelligent web application that suggests recipes based on available ingredients, with support for image-based ingredient detection, dietary preferences, and smart filtering.

## 🌟 Features

### Core Functionality
- **📷 Image-Based Ingredient Detection**: Upload photos of ingredients for automatic detection (stub implementation ready for ML integration)
- **🔍 Smart Recipe Matching**: Advanced algorithm that matches recipes based on available ingredients
- **🔄 Ingredient Substitutions**: Intelligent suggestions for ingredient alternatives
- **🎯 Advanced Filtering**: Filter by dietary preferences, difficulty level, and cooking time
- **⭐ Ratings & Favorites**: Rate recipes and save favorites with local storage persistence
- **📊 Nutritional Information**: Detailed calorie and protein information with serving size adjustment
- **📱 Mobile Responsive**: Fully responsive design optimized for all devices

### Technical Highlights
- **Recipe Database**: 20+ diverse recipes covering multiple cuisines
- **Smart Matching Algorithm**: 
  - Exact ingredient matching
  - Similar ingredient recognition (e.g., "tomato" matches "cherry tomato")
  - Substitution suggestions with weighted scoring
  - Sort by match score, user ratings, and cooking time
- **User Experience**:
  - Loading states and animations
  - Error boundaries for graceful error handling
  - Intuitive UI with emoji icons
  - Real-time filtering and search

## 🚀 Quick Start

### Prerequisites
- Node.js 14.x or higher
- npm or yarn

### Local Development

1. **Clone and Navigate**
   ```powershell
   cd C:\Users\shreyash\SmartRecipeGenerator-Fresh
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Run Development Server**
   ```powershell
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```powershell
npm run build
npm start
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

Vercel provides zero-configuration deployment for Next.js applications.

1. **Install Vercel CLI** (optional)
   ```powershell
   npm install -g vercel
   ```

2. **Deploy via Git (Easiest)**
   - Push your code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js and deploys

3. **Deploy via CLI**
   ```powershell
   cd C:\Users\shreyash\SmartRecipeGenerator-Fresh
   vercel
   ```
   Follow the prompts to complete deployment.

### Other Deployment Options

- **Netlify**: Connect GitHub repo, Netlify detects Next.js automatically
- **Railway**: Import from GitHub and deploy
- **Render**: Connect repository and select "Next.js" as environment

## 🏗️ Project Structure

```
SmartRecipeGenerator-Fresh/
├── components/
│   ├── ErrorBoundary.jsx      # Error handling component
│   ├── ImageUploader.jsx       # Image upload & detection
│   ├── IngredientInput.jsx     # Manual ingredient entry
│   ├── RecipeCard.jsx          # Recipe display with details
│   └── RecipeList.jsx          # Recipe grid/list view
├── lib/
│   └── recipeMatcher.js        # Core matching algorithm
├── pages/
│   ├── api/
│   │   └── match.js            # Recipe matching API endpoint
│   ├── _app.jsx                # App wrapper with error boundary
│   └── index.jsx               # Main application page
├── public/
│   └── recipes.json            # Recipe database (20+ recipes)
├── styles/
│   └── globals.css             # Application styles
├── package.json
├── next.config.js
└── README.md
```

## 🧠 Technical Approach

### Ingredient Detection
Currently implements a **stub detection system** that:
- Analyzes image filename for ingredient keywords
- Uses file characteristics for deterministic ingredient selection
- Simulates realistic detection with loading states
- **Production Path**: Replace with TensorFlow.js model or external API (Google Cloud Vision, Clarifai)

### Recipe Matching Algorithm

The matching system uses a sophisticated scoring mechanism:

1. **Exact Matching** (weight: 1.0)
   - Direct ingredient matches

2. **Similar Ingredient Recognition** (weight: 0.9)
   - Groups similar ingredients (e.g., "onion", "shallot", "scallion")
   - Reduces false negatives

3. **Substitution Support** (weight: 0.7)
   - Suggests alternatives (e.g., "milk" → "almond milk", "soy milk")
   - Maintains recipe viability

4. **Multi-tier Filtering**
   - Dietary restrictions (vegetarian, vegan, gluten-free)
   - Difficulty level (easy, medium, hard)
   - Maximum cooking time

5. **Smart Sorting**
   - Primary: Match score (descending)
   - Secondary: User ratings (descending)
   - Tertiary: Cooking time (ascending)

### Data Persistence
- **LocalStorage** for client-side persistence
- User ratings and favorites survive page refreshes
- No backend database required (serverless architecture)

### Error Handling
- React Error Boundaries catch component errors
- API error handling with user-friendly messages
- Loading states for all async operations
- Form validation and input sanitization

## 🎨 Design Decisions

- **Next.js Framework**: SSR capability, API routes, excellent developer experience
- **No External UI Library**: Custom CSS for full control and minimal bundle size
- **Mobile-First Design**: Responsive breakpoints at 768px and 480px
- **Semantic HTML**: Accessibility-focused structure
- **Progressive Enhancement**: Core functionality works without JavaScript

## 📊 Recipe Database

The application includes **20 diverse recipes** featuring:
- Multiple cuisines (Italian, Asian, Mexican, Greek, Indian, etc.)
- Various difficulty levels
- Dietary options (vegetarian, vegan, gluten-free)
- Cooking times from 5 to 50 minutes
- Complete nutritional information

## 🔧 Customization

### Adding Recipes
Edit `public/recipes.json` with this structure:
```json
{
  "id": "unique_id",
  "title": "Recipe Name",
  "cuisine": "Italian",
  "difficulty": "easy|medium|hard",
  "time": 30,
  "diet": ["vegetarian", "gluten-free"],
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["Step 1", "Step 2"],
  "nutrition": {"calories": 400, "protein": 15},
  "description": "Brief description"
}
```

### Integrating Real ML Detection
Replace the stub in `components/ImageUploader.jsx`:

```javascript
// Example with TensorFlow.js
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

async function detectIngredients(imageElement) {
  const model = await cocossd.load();
  const predictions = await model.detect(imageElement);
  return predictions.map(p => p.class);
}
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This project was developed as a technical assessment. Feel free to fork and enhance!

## 📧 Contact

For questions or feedback about this implementation, please refer to the project repository.

---

**Built with ❤️ using Next.js, React, and modern web technologies**