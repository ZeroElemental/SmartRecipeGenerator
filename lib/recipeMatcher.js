// Simple matching + substitution logic
export function matchRecipes(availableIngredients = [], recipes = [], options = {}) {
  const normalize = s => String(s).toLowerCase().trim();
  const available = availableIngredients.map(normalize);
  const dietFilter = options.diet || 'any';

  // simple substitution map
  const substitutions = {
    'milk': ['almond milk', 'soy milk'],
    'butter': ['margarine', 'olive oil'],
    'egg': ['flax egg', 'applesauce']
  };

  function scoreRecipe(recipe) {
    const req = (recipe.ingredients || []).map(normalize);
    let have = 0;
    let possibleWithSub = 0;
    for (const ing of req) {
      if (available.includes(ing)) have++;
      else {
        const foundSubKey = Object.keys(substitutions).find(k => k === ing);
        if (foundSubKey && substitutions[foundSubKey].some(s => available.includes(normalize(s)))) {
          possibleWithSub++;
        }
      }
    }
    const totalNeeded = req.length || 1;
    const score = (have + possibleWithSub * 0.7) / totalNeeded;
    return { score, have, totalNeeded, possibleWithSub };
  }

  let filtered = recipes.filter(r => {
    if (dietFilter === 'any') return true;
    const tags = (r.diet || []).map(normalize);
    return tags.includes(normalize(dietFilter));
  });

  const scored = filtered.map(r => {
    const sc = scoreRecipe(r);
    return { ...r, matchScore: Math.round(sc.score * 100), have: sc.have, needed: sc.totalNeeded, substitutionsSuggested: sc.possibleWithSub };
  });

  scored.sort((a,b) => b.matchScore - a.matchScore || a.time - b.time);
  return scored.slice(0, 20);
}