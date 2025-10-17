import fs from 'fs';
import path from 'path';
import { matchRecipes } from '../../lib/recipeMatcher';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { ingredients = [], diet = 'any', difficulty = 'any', maxTime = 'any' } = req.body || {};
  try {
    const recipesPath = path.join(process.cwd(), 'public', 'recipes.json');
    const raw = fs.readFileSync(recipesPath, 'utf8');
    const recipes = JSON.parse(raw);
    const matches = matchRecipes(ingredients, recipes, { diet, difficulty, maxTime });
    res.status(200).json({ matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error reading recipes' });
  }
}