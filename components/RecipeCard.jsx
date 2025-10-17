import { useState } from 'react';

export default function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = useState(false);
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

  return (
    <article className="recipe-card">
      <header>
        <h3>{recipe.title}</h3>
        <div className="meta">
          <span>{recipe.cuisine} • {recipe.time}m • {recipe.difficulty}</span>
          <span className="score">Match: {recipe.matchScore}%</span>
        </div>
      </header>
      <p>{recipe.description || ''}</p>
      <div className="card-actions">
        <button onClick={()=>setExpanded(!expanded)}>{expanded ? 'Hide' : 'Details'}</button>
        <div className="rating">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={()=>saveRating(n)} className={n<=rating?'on':''}>{n}</button>
          ))}
        </div>
      </div>
      {expanded && (
        <div className="details">
          <h4>Ingredients</h4>
          <ul>{(recipe.ingredients||[]).map(ing=> <li key={ing}>{ing}</li>)}</ul>
          <h4>Steps</h4>
          <ol>{(recipe.steps||[]).map((s,i)=> <li key={i}>{s}</li>)}</ol>
          <h4>Nutrition</h4>
          <div>Calories: {recipe.nutrition?.calories || '—'} • Protein: {recipe.nutrition?.protein || '—'}g</div>
          {recipe.substitutionsSuggested > 0 && <div className="hint">Substitutions possible for some ingredients</div>}
        </div>
      )}
    </article>
  );
}