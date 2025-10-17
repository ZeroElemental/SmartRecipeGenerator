# Setup Instructions

## Install Dependencies

Open a terminal in this folder and run:

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Common Issues

If you get errors about missing packages, try:

```bash
# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall everything
npm install
```

## Project Structure

- `components/` - React components (ImageUploader, IngredientInput, RecipeCard, RecipeList)
- `pages/` - Next.js pages and API routes
- `pages/api/match.js` - API endpoint for recipe matching
- `public/recipes.json` - Recipe data
- `lib/recipeMatcher.js` - Recipe matching logic
- `styles/globals.css` - Global styles
