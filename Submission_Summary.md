# Smart Recipe Generator – Technical Assessment Submission

## Candidate: Shreyash Anand
## Register Number: 22BIT0113
## Date: October 17, 2025

---

### Hosted Application URL
- https://smart-recipe-generator-teal.vercel.app/

### GitHub Repository
- https://github.com/ZeroElemental/SmartRecipeGenerator

---

### Project Overview (200 words)

Smart Recipe Generator is a web application that suggests recipes based on user-provided ingredients and ingredient photos. Users can enter ingredients manually or upload an image for automatic ingredient recognition. The app supports dietary preferences (vegetarian, gluten-free, vegan) and allows filtering recipes by difficulty, cooking time, and dietary restrictions. Each recipe includes detailed instructions, nutrition info, and serving size adjustment. Users can rate recipes, save favorites, and receive personalized suggestions based on their ratings. The recipe database contains 20+ diverse recipes across multiple cuisines. The matching algorithm uses weighted scoring and ingredient substitution logic to maximize relevant results. The UI is clean, intuitive, and fully mobile-responsive. The app is deployed on Vercel for free, instant access. Documentation and error handling are included for a smooth user experience.

---

### Features Checklist

- **User Input**
  - Manual ingredient entry
  - Image upload for ingredient recognition
  - Dietary preference selection

- **Recipe Generation**
  - Multiple recipe suggestions
  - Detailed instructions
  - Nutrition info (calories, protein, etc.)

- **Filters & Customization**
  - Filter by difficulty, time, dietary restrictions
  - Adjustable serving sizes

- **Recipe Database**
  - 20+ recipes, multiple cuisines
  - Ingredients, steps, nutrition per recipe

- **User Feedback**
  - Rate recipes (stars)
  - Save favorites (heart icon)
  - Personalized suggestions

- **UI/UX**
  - Clean, intuitive interface
  - Mobile-responsive design
  - Loading/error states

- **Hosting**
  - Live on Vercel: https://smart-recipe-generator-teal.vercel.app/

---

### Technical Approach

- **Framework:** Next.js (React)
- **Ingredient Recognition:** Image upload + basic classification
- **Recipe Matching:** Weighted scoring, substitution logic
- **Persistence:** localStorage for favorites/ratings
- **Error Handling:** User-friendly messages, loading states
- **Documentation:** README, setup, deployment, technical summary

