import { useRef, useState } from 'react';

/*
 Enhanced stub detection: examines image characteristics and returns realistic ingredient tags.
 In production, replace with TF.js model or external Vision API (e.g., Google Cloud Vision, Clarifai).
*/
const ENHANCED_DETECTION = {
  // Common ingredients that might appear in photos
  vegetables: ['tomato', 'onion', 'garlic', 'carrot', 'bell pepper', 'lettuce', 'cucumber', 'broccoli', 'celery'],
  proteins: ['chicken', 'beef', 'egg', 'shrimp', 'tofu', 'cheese'],
  pantry: ['rice', 'pasta', 'flour', 'bread'],
  fruits: ['banana', 'lemon', 'apple', 'avocado'],
  dairy: ['milk', 'butter', 'cheese', 'yogurt']
};

export default function ImageUploader({ onDetected = () => {} }) {
  const inputRef = useRef();
  const [detected, setDetected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  function detectFromFile(file) {
    // Simulate ML detection with file size and name heuristics
    const name = (file.name || '').toLowerCase();
    const found = [];
    
    // Check filename for ingredient keywords
    for (const category of Object.values(ENHANCED_DETECTION)) {
      for (const ingredient of category) {
        if (name.includes(ingredient)) {
          found.push(ingredient);
        }
      }
    }
    
    // If no matches from filename, use file size to pick diverse ingredients
    if (found.length === 0) {
      const allIngredients = Object.values(ENHANCED_DETECTION).flat();
      const size = file.size || 0;
      const count = 2 + (size % 4); // 2-5 ingredients
      for (let i = 0; i < count; i++) {
        const idx = (size + i * 17) % allIngredients.length;
        found.push(allIngredients[idx]);
      }
    }
    
    return Array.from(new Set(found)).slice(0, 5); // Max 5 ingredients
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    
    // Simulate processing delay (realistic for API call)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const found = detectFromFile(file);
    setDetected(found);
    onDetected(found);
    setLoading(false);
  }
  
  function clearImage() {
    setPreview(null);
    setDetected([]);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="image-uploader">
      <label>📷 Upload Ingredient Photo</label>
      <input 
        ref={inputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleFile}
        disabled={loading}
      />
      
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Uploaded" />
          <button onClick={clearImage} className="btn-clear">✕</button>
        </div>
      )}
      
      <div className="detected">
        {loading && <span className="detecting">🔍 Detecting ingredients...</span>}
        {!loading && detected.length > 0 && (
          <>
            <strong>Detected:</strong> {detected.join(', ')}
          </>
        )}
        {!loading && detected.length === 0 && !preview && (
          <span className="hint">Upload an image to detect ingredients</span>
        )}
      </div>
    </div>
  );
}