import { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import IngredientInput from '../components/IngredientInput';
import RecipeList from '../components/RecipeList';

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState('any');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchMatches() {
    setLoading(true);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, diet })
      });
      const json = await res.json();
      setResults(json);
    } catch (e) {
      console.error(e);
      setResults({ error: 'Matching failed' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ingredients.length) fetchMatches();
    else setResults(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, diet]);

  return (
    <main className="container">
      <h1>Smart Recipe Generator</h1>

      <section className="controls">
        <ImageUploader onDetected={(detected) => {
          setIngredients(prev => Array.from(new Set([...prev, ...detected.map(d=>d.toLowerCase())])));
        }} />
        <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
        <label>
          Dietary:
          <select value={diet} onChange={e=>setDiet(e.target.value)}>
            <option value="any">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>
        </label>
        <button onClick={fetchMatches} disabled={loading}>Find Recipes</button>
      </section>

      <section className="results">
        {loading && <div className="loading">Searching recipes...</div>}
        {results && results.error && <div className="error">{results.error}</div>}
        {results && results.matches && <RecipeList matches={results.matches} />}
        {!results && <p>Enter ingredients or upload an image to start.</p>}
      </section>
    </main>
  );
}