import { useRef, useState } from 'react';

/*
 TF.js stub: examines filename and returns a small set of ingredient tags.
 Replace with a real TF.js model or external API later.
*/
const SAMPLE_MAP = {
  tomato: ['tomato'],
  egg: ['egg'],
  chicken: ['chicken'],
  cheese: ['cheese'],
  banana: ['banana'],
  lettuce: ['lettuce'],
  onion: ['onion'],
  garlic: ['garlic']
};

export default function ImageUploader({ onDetected = () => {} }) {
  const inputRef = useRef();
  const [detected, setDetected] = useState([]);

  function detectFromFile(file) {
    const name = (file.name || '').toLowerCase();
    for (const k of Object.keys(SAMPLE_MAP)) {
      if (name.includes(k)) {
        return SAMPLE_MAP[k];
      }
    }
    // fallback deterministic sample based on file size
    const fallback = ['tomato', 'onion', 'garlic', 'egg'];
    const idx = (file.size || 0) % fallback.length;
    return [fallback[idx]];
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const found = detectFromFile(file);
    setDetected(found);
    onDetected(found);
  }

  return (
    <div className="image-uploader">
      <label>Upload ingredient photo (stub detection)</label>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} />
      <div className="detected">Detected: {detected.join(', ') || '—'}</div>
    </div>
  );
}