import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ingredients = [], diet = 'any', difficulty = 'any', maxTime = 'any', count = 5 } = req.body || {};

  // Use Google Gemini via Generative Language API
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';

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

  if (!GEMINI_KEY) {
    // No key: return fallback results
    return res.status(200).json({ source: 'static', recipes: fallback() });
  }

  // Prompt asking for strict JSON array matching our schema
  const prompt = `You are a helpful recipe generator. Given available ingredients: ${ingredients.join(', ') || 'none'}, dietary preference: ${diet}, difficulty: ${difficulty}, maxTime: ${maxTime}. Please generate ${count} recipe objects strictly as a JSON array. Each recipe object must have these fields: id (unique short string), title, cuisine, difficulty (easy|medium|hard), time (minutes integer), diet (array), ingredients (array of strings), steps (array of short strings), nutrition (object with calories, protein, carbs, fat as integers), description (short). Return only valid JSON with no commentary.`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
    const body = {
      contents: [
        {
          role: 'user',
          parts: [ { text: prompt } ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1200
      }
    };

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('Gemini error', resp.status, txt);
      return res.status(500).json({ error: 'AI service error', details: txt });
    }

    const data = await resp.json();
    const contentText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Try to extract JSON substring
    const firstBracket = contentText.indexOf('[');
    const lastBracket = contentText.lastIndexOf(']');
    let jsonText = contentText;
    if (firstBracket !== -1 && lastBracket !== -1) jsonText = contentText.slice(firstBracket, lastBracket + 1);

    let recipes = [];
    try {
      recipes = JSON.parse(jsonText);
    } catch (e) {
      console.error('Gemini JSON parse error:', e.message);
      return res.status(200).json({ source: 'static-fallback', recipes: fallback() });
    }

    // Ensure unique ids and basic normalization
    recipes = (Array.isArray(recipes) ? recipes : []).map((r, i) => ({ id: r.id || `ai_${Date.now()}_${i}`, ...r }));

    return res.status(200).json({ source: 'ai-gemini', recipes });
  } catch (err) {
    console.error('Gemini fetch failed', err);
    return res.status(500).json({ error: 'Failed to fetch from AI service', details: String(err) });
  }
}
