import { useState } from 'react';

export default function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = useState(false);
  const [servings, setServings] = useState(1);
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const saved = localStorage.getItem(`favorite_${recipe.id}`);
      return saved === 'true';
    } catch { return false; }
  });
  const [rating, setRating] = useState(() => {
    try {
      const saved = localStorage.getItem(`rating_${recipe.id}`);
      return saved ? Number(saved) : 0;
    } catch { return 0; }
  });

  function saveRating(r) {
    setRating(r);
    try { localStorage.setItem(`rating_${recipe.id}`, String(r)); } catch {}
  }
  
  function toggleFavorite() {
    const newVal = !isFavorite;
    setIsFavorite(newVal);
    try { 
      localStorage.setItem(`favorite_${recipe.id}`, String(newVal));
    } catch {}
  }

  const adjustedNutrition = {
    calories: Math.round((recipe.nutrition?.calories || 0) * servings),
    protein: Math.round((recipe.nutrition?.protein || 0) * servings),
    carbs: Math.round((recipe.nutrition?.carbs || 0) * servings),
    fat: Math.round((recipe.nutrition?.fat || 0) * servings)
  };

  return (
    <article className="recipe-card">
      <header>
        <h3>
          {recipe.title}
          <button 
            onClick={toggleFavorite} 
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </h3>
        <div className="meta">
          <span>🍽️ {recipe.cuisine} • ⏱️ {recipe.time}m • 📊 {recipe.difficulty}</span>
          <span className="score">Match: {recipe.matchScore}%</span>
        </div>
      </header>
      <p>{recipe.description || ''}</p>
      <div className="card-actions">
        <button onClick={()=>setExpanded(!expanded)}>{expanded ? 'Hide Details' : 'Show Details'}</button>
        <div className="rating">
          Rating: {[1,2,3,4,5].map(n => (
            <button key={n} onClick={()=>saveRating(n)} className={n<=rating?'on':''}>{n<=rating?'⭐':'☆'}</button>
          ))}
        </div>
      </div>
      {expanded && (
        <div className="details">
          <div className="servings-control">
            <label>Servings:</label>
            <button onClick={()=>setServings(Math.max(1, servings-1))}>−</button>
            <span>{servings}</span>
            <button onClick={()=>setServings(servings+1)}>+</button>
          </div>
          
          <h4>Ingredients</h4>
          <ul>{(recipe.ingredients||[]).map(ing=> <li key={ing}>{ing}</li>)}</ul>
          
          {recipe.substitutionDetails && recipe.substitutionDetails.length > 0 && (
            <div className="substitutions">
                  <h4>Suggested Substitutions</h4>
              <ul>
                {recipe.substitutionDetails.map((sub, i) => (
                  <li key={i}>
                    <strong>{sub.original}</strong> → {sub.substitute}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <h4>Instructions</h4>
          <ol>{(recipe.steps||[]).map((s,i)=> <li key={i}>{s}</li>)}</ol>
          
          <h4>Nutrition (for {servings} serving{servings>1?'s':''})</h4>
          <div className="nutrition-info">
            <span>Calories: {adjustedNutrition.calories}</span>
            <span>Protein: {adjustedNutrition.protein} g</span>
            <span>Carbs: {adjustedNutrition.carbs} g</span>
            <span>Fat: {adjustedNutrition.fat} g</span>
          </div>
          
          {recipe.substitutionsSuggested > 0 && (
            <div className="hint">{recipe.substitutionsSuggested} ingredient substitution{recipe.substitutionsSuggested>1?'s':''} available</div>
          )}
        </div>
      )}
    </article>
  );
}