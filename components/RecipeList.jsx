import RecipeCard from './RecipeCard';

export default function RecipeList({ matches = [], showFavorites = false }) {
  let displayList = matches;
  
  if (showFavorites) {
    displayList = matches.filter(r => {
      try {
        const saved = localStorage.getItem(`favorite_${r.id}`);
        return saved === 'true';
      } catch { return false; }
    });
  }
  
  if (!displayList.length) {
    return <p className="no-results">
      {showFavorites ? '❤️ No favorite recipes yet. Start adding some!' : 'No matching recipes found. Try adjusting your filters.'}
    </p>;
  }
  
  return (
    <div className="recipe-list">
      <p className="results-count">Found {displayList.length} recipe{displayList.length !== 1 ? 's' : ''}</p>
      {displayList.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  );
}