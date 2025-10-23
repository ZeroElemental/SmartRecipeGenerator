import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ingredients = [], diet = 'any', difficulty = 'any', maxTime = 'any', count = 5 } = req.body || {};

  // Try OpenAI if API key present
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  // Helper to return static fallback recipes from public/recipes.json
  const fallback = () => {
    try {
      const file = path.join(process.cwd(), 'public', 'recipes.json');
      const raw = fs.readFileSync(file, 'utf8');
      const all = JSON.parse(raw);
      // Simple filter based on diet/difficulty/maxTime
      let filtered = all;
      if (diet && diet !== 'any') filtered = filtered.filter(r => (r.diet || []).includes(diet));
      if (difficulty && difficulty !== 'any') filtered = filtered.filter(r => r.difficulty === difficulty);
      if (maxTime && maxTime !== 'any') filtered = filtered.filter(r => Number(r.time) <= Number(maxTime));
      return filtered.slice(0, count);
    } catch (e) {
      return [];
    }
  };

  if (!OPENAI_KEY) {
    // No key: return fallback results
    return res.status(200).json({ source: 'static', recipes: fallback() });
  }

  // Build a robust prompt asking for JSON output with strict schema
  const prompt = `You are a helpful recipe generator. Given available ingredients: ${ingredients.join(', ') || 'none'}, dietary preference: ${diet}, difficulty: ${difficulty}, maxTime: ${maxTime}. Please generate ${count} recipe objects strictly as a JSON array. Each recipe object must have these fields: id (unique short string), title, cuisine, difficulty (easy|medium|hard), time (minutes integer), diet (array), ingredients (array of strings), steps (array of short strings), nutrition (object with calories, protein, carbs, fat as integers), description (short). Return only valid JSON — no extra commentary.`;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a strict JSON-producing assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        n: 1
      })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('OpenAI error', resp.status, txt);
      return res.status(500).json({ error: 'AI service error', details: txt });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || '';

    // Try to extract JSON substring
    const firstBracket = content.indexOf('[');
    const lastBracket = content.lastIndexOf(']');
    let jsonText = content;
    if (firstBracket !== -1 && lastBracket !== -1) jsonText = content.slice(firstBracket, lastBracket + 1);

    let recipes = [];
    try { recipes = JSON.parse(jsonText); } catch (e) {
      // fallback: return static
      console.error('JSON parse error:', e.message);
      return res.status(200).json({ source: 'static-fallback', recipes: fallback() });
    }

    // Ensure unique ids and basic normalization
    recipes = recipes.map((r, i) => ({ id: r.id || `ai_${Date.now()}_${i}`, ...r }));

    return res.status(200).json({ source: 'ai', recipes });
  } catch (err) {
    console.error('AI fetch failed', err);
    return res.status(500).json({ error: 'Failed to fetch from AI service', details: String(err) });
  }
}
