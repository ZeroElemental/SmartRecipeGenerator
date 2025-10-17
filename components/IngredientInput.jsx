import { useState } from 'react';

export default function IngredientInput({ ingredients, setIngredients }) {
  const [text, setText] = useState('');
  function add() {
    if (!text.trim()) return;
    setIngredients(prev => Array.from(new Set([...prev, text.trim().toLowerCase()])));
    setText('');
  }
  function remove(item) {
    setIngredients(prev => prev.filter(i => i !== item));
  }
  return (
    <div className="ingredient-input">
      <label>Ingredients</label>
      <div className="input-row">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="e.g., tomato" />
        <button onClick={add}>Add</button>
      </div>
      <div className="chips">
        {ingredients.map(i => (
          <span key={i} className="chip">
            {i}
            <button onClick={() => remove(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}