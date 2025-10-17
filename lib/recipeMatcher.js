// Enhanced matching + substitution logic
export function matchRecipes(availableIngredients = [], recipes = [], options = {}) {
  const normalize = s => String(s).toLowerCase().trim();
  const available = availableIngredients.map(normalize);
  const dietFilter = options.diet || 'any';

  // Expanded substitution map with better coverage
  const substitutions = {
    'milk': ['almond milk', 'soy milk', 'oat milk', 'coconut milk'],
    'butter': ['margarine', 'olive oil', 'coconut oil'],
    'egg': ['flax egg', 'applesauce', 'chia egg'],
    'chicken': ['turkey', 'tofu', 'tempeh'],
    'beef': ['lamb', 'pork', 'plant-based beef'],
    'pasta': ['rice noodles', 'zucchini noodles', 'quinoa'],
    'rice': ['quinoa', 'couscous', 'bulgur'],
    'flour': ['almond flour', 'coconut flour', 'oat flour'],
    'sugar': ['honey', 'maple syrup', 'agave'],
    'soy sauce': ['tamari', 'coconut aminos', 'worcestershire sauce']
  };
  
  // Ingredient similarity groups for fuzzy matching
  const similarIngredients = {
    'tomato': ['tomatoes', 'cherry tomato', 'roma tomato'],
    'onion': ['onions', 'shallot', 'scallion', 'green onion'],
    'cheese': ['cheddar', 'mozzarella', 'parmesan', 'feta'],
    'pepper': ['bell pepper', 'green pepper', 'red pepper'],
    'oil': ['olive oil', 'vegetable oil', 'canola oil']
  };

  function findSimilar(ingredient) {
    for (const [key, variants] of Object.entries(similarIngredients)) {
      if (variants.includes(ingredient) || key === ingredient) {
        return [key, ...variants];
      }
    }
    return [ingredient];
  }

  function scoreRecipe(recipe) {
    const req = (recipe.ingredients || []).map(normalize);
    let have = 0;
    let possibleWithSub = 0;
    let similar = 0;
    const substitutionDetails = [];
    
    for (const ing of req) {
      // Exact match
      if (available.includes(ing)) {
        have++;
      } else {
        // Check similar ingredients
        const similars = findSimilar(ing);
        if (similars.some(s => available.includes(s))) {
          similar++;
          continue;
        }
        
        // Check substitutions
        const foundSubKey = Object.keys(substitutions).find(k => k === ing);
        if (foundSubKey) {
          const possibleSubs = substitutions[foundSubKey];
          const availableSub = possibleSubs.find(s => available.includes(normalize(s)));
          if (availableSub) {
            possibleWithSub++;
            substitutionDetails.push({ original: ing, substitute: availableSub });
          }
        }
      }
    }
    
    const totalNeeded = req.length || 1;
    // Weighted scoring: exact match (1.0), similar (0.9), substitution (0.7)
    const score = (have + similar * 0.9 + possibleWithSub * 0.7) / totalNeeded;
    return { score, have, totalNeeded, possibleWithSub, substitutionDetails };
  }

  let filtered = recipes.filter(r => {
    // Diet filter
    if (dietFilter === 'any') {
      // continue
    } else {
      const tags = (r.diet || []).map(normalize);
      if (!tags.includes(normalize(dietFilter))) return false;
    }
    
    // Difficulty filter
    if (options.difficulty && options.difficulty !== 'any') {
      if (normalize(r.difficulty) !== normalize(options.difficulty)) return false;
    }
    
    // Time filter
    if (options.maxTime && options.maxTime !== 'any') {
      const timeLimit = parseInt(options.maxTime);
      if (r.time > timeLimit) return false;
    }
    
    return true;
  });

  const scored = filtered.map(r => {
    const sc = scoreRecipe(r);
    return { 
      ...r, 
      matchScore: Math.round(sc.score * 100), 
      have: sc.have, 
      needed: sc.totalNeeded, 
      substitutionsSuggested: sc.possibleWithSub,
      substitutionDetails: sc.substitutionDetails || []
    };
  });

  // Sort by match score (descending), then by rating, then by time (ascending)
  scored.sort((a,b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    // Secondary sort by user rating if available
    const ratingA = getRating(a.id);
    const ratingB = getRating(b.id);
    if (ratingB !== ratingA) return ratingB - ratingA;
    // Tertiary sort by cooking time
    return a.time - b.time;
  });
  
  return scored.slice(0, 20);
}

// Helper to get rating from localStorage (for server-side, returns 0)
function getRating(recipeId) {
  if (typeof window === 'undefined') return 0;
  try {
    const saved = localStorage.getItem(`rating_${recipeId}`);
    return saved ? Number(saved) : 0;
  } catch { return 0; }
}