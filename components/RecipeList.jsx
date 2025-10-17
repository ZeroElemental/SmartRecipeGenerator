import RecipeCard from './RecipeCard';

export default function RecipeList({ matches = [] }) {
  if (!matches.length) return <p>No matching recipes found.</p>;
  return (
    <div className="recipe-list">
      {matches.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  );
}