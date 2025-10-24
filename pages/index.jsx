import { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import IngredientInput from '../components/IngredientInput';
import RecipeList from '../components/RecipeList';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [maxTime, setMaxTime] = useState('any');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function fetchMatches() {
    setLoading(true);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, diet, difficulty, maxTime })
      });
      const json = await res.json();
      // Filter out 0% matches
      if (json.matches) {
        json.matches = json.matches.filter(r => r.matchPercentage > 0);
      }
      setResults(json);
    } catch (e) {
      console.error(e);
      setResults({ error: 'Matching failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ingredients.length) fetchMatches();
    else setResults(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, diet, difficulty, maxTime]);

  return (
    <>
      {/* Sidebar Navigation */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>×</button>
        <nav className="sidebar-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowFavorites(false); setSidebarOpen(false); }}>
            🏠 Home
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowFavorites(true); setSidebarOpen(false); }}>
            ⭐ Favorites
          </a>
        </nav>
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="container">
        {/* Menu button */}
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>

        {/* Hero Section */}
        <header className="hero">
          <h1>Smart Recipe Generator</h1>
          <p className="tagline">Turn your ingredients into delicious meals with AI-powered suggestions</p>
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">20+</span>
              <span className="stat-label">Cuisines</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Smart</span>
              <span className="stat-label">Matching</span>
            </div>
          </div>
        </header>

        {/* How it Works Section */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Upload or Enter</h3>
              <p>Upload a photo of your ingredients or type them manually</p>
            </div>
            <div className="step">
              <h3>2. Filter & Match</h3>
              <p>Apply dietary preferences and get smart recipe matches</p>
            </div>
            <div className="step">
              <h3>3. Cook & Enjoy</h3>
              <p>Follow step-by-step instructions and rate your favorites</p>
            </div>
          </div>
        </section>

      <section className="controls">
        <ImageUploader onDetected={(detected) => {
          setIngredients(prev => Array.from(new Set([...prev, ...detected.map(d=>d.toLowerCase())])));
        }} />
        <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
        
        <div className="filters">
          <label>
            Dietary:
            <select value={diet} onChange={e=>setDiet(e.target.value)}>
              <option value="any">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </label>
          
          <label>
            Difficulty:
            <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
              <option value="any">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          
          <label>
            Max Time:
            <select value={maxTime} onChange={e=>setMaxTime(e.target.value)}>
              <option value="any">Any</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">1 hour</option>
            </select>
          </label>
        </div>

        <div className="action-row">
          <button onClick={fetchMatches} disabled={loading || !ingredients.length} className="btn-primary">
            🔍 Find Recipes
          </button>
          <button 
            onClick={() => setShowFavorites(!showFavorites)} 
            className="btn-secondary"
          >
            {showFavorites ? '📋 Show All' : '⭐ Show Favorites'}
          </button>
        </div>
      </section>

      <section className="results">
        {loading && <div className="loading">🔍 Searching recipes...</div>}
        {results && results.error && <div className="error">{results.error}</div>}
        {results && results.matches && <RecipeList matches={results.matches} showFavorites={showFavorites} />}
        {!results && !loading && <p className="hint">👋 Enter ingredients or upload an image to start discovering delicious recipes!</p>}
      </section>

        {/* Footer */}
        <footer className="footer">
          <p>Built using Next.js & React</p>
          <p className="footer-meta">
            <span>1000+ Recipes</span> • <span>20+ Cuisines</span> • <span>Smart Matching</span>
          </p>

          {/* Features relocated to footer */}
          <section className="features-footer">
            <h3>Key Features</h3>
            <div className="feature-grid small">
              <div className="feature-card">
                <h4>Smart Matching</h4>
                <p>Algorithmic matches with substitution suggestions</p>
              </div>
              <div className="feature-card">
                <h4>Dietary Filters</h4>
                <p>Vegetarian, vegan, and gluten-free options</p>
              </div>
              <div className="feature-card">
                <h4>Time & Difficulty</h4>
                <p>Filter by cooking time and skill level</p>
              </div>
              <div className="feature-card">
                <h4>Nutrition Info</h4>
                <p>Calories, protein, carbs and fat per recipe</p>
              </div>
              <div className="feature-card">
                <h4>Rate & Save</h4>
                <p>Rate recipes and save your favorites</p>
              </div>
              <div className="feature-card">
                <h4>Mobile Ready</h4>
                <p>Responsive across devices</p>
              </div>
            </div>
          </section>
        </footer>
      </main>
    </>
  );
}