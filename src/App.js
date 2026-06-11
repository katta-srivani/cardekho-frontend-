
import { useState } from 'react';
import './App.css';

const   API_URL=import.meta.env.VITE_API_URL||"http://localhost:5000/api";

function App() {

  const[formData, setFormData]=useState({
    budget:"",
    familySize:"",
    usage:"",
    fuel:"",
    priority:"",
  });

  const [recommendations, setRecommendations] = useState([]);

const [loadingRecommendations, setLoadingRecommendations] =
  useState(false);

const [selectedCar, setSelectedCar] = useState(null);

const [aiExplanation, setAiExplanation] = useState("");

const [loadingExplanation, setLoadingExplanation] =
  useState(false);


  const handleCHange=(e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,

    })
  };
  const getRecommendations=async (e)=>{

    e.preventDefault();
    setLoadingRecommendations(true);
    
setSelectedCar(null);
setAiExplanation("");

try {
  const response = await fetch(
    `${API_URL}/recommend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  setRecommendations(data.recommendations);
} catch (error) {
  console.error(error);
} finally {
  setLoadingRecommendations(false);
}
  };

const getLoadingExplanation = async (car) => {
  setSelectedCar(car);
  setLoadingExplanation(true);

  try {
    const response = await fetch(
      `${API_URL}/explain`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car,
          userPreferences: formData,
          alternatives: recommendations.filter(
            (c) => c._id !== car._id
          ),
        }),
      }
    );

    const data = await response.json();

    setAiExplanation(data.explanation);
  } catch (error) {
    console.error("Failed to generate explanation:", error);
  } finally {
    setLoadingExplanation(false);
  }
};  

  return (

    <div className="app">
      <section className="hero">

        <p className="tag">AI-Native car Research MVP</p>
        <h1>carmatch AI</h1>
        <p>
          Ask your questions and clear here itself only with correct match AI powered response
        </p>
      </section>

      <main className="layout">
        <form className="form-card" onSubmit={getRecommendations}>
          <h2>YOur preferences</h2>
          <label>Budget</label>
          <select
          name="budget"
          value={formData.budget}
          onChange={handleCHange}
          required
          >
            <option value="">Select budget</option>
            <option value="800000">Under 8 Lakhs</option>
            <option value="1000000">10 Lakhs</option>
            <option value="1200000">12 Lakhs</option>
            <option value="1500000">15 Lakhs</option>
          </select>

          <label>Family Size</label>

<select
  name="familySize"
  value={formData.familySize}
  onChange={handleCHange}
  required
>
  <option value="">Select Family Size</option>
  <option value="Single">Single</option>
  <option value="Couple">Couple</option>
  <option value="Family">Family</option>
</select>

          <label>Usage</label>
          <select
          name="usage"
          value={formData.usage}
          onChange={handleCHange}
          required
          >
            <option value="">Select Usage</option>
           
            <option value="City">City</option>
            <option value="Highway">Highway</option>
            <option value="Mixed">City + Highway</option>
            <option value="Hilly">Hilly / Mountain Roads</option>
             <option value="Village">Village / Rough Roads</option>


          </select>
         <label>Fuel Type</label>
          <select
          name="fuel"
          value={formData.fuel}
          onChange={handleCHange}
          required
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
           

          </select>
         
         <label>Priority</label>

<select
  name="priority"
  value={formData.priority}
  onChange={handleCHange}
  required
>
  <option value="">Select Priority</option>
  <option value="Safety">Safety</option>
  <option value="Mileage">Mileage</option>
  <option value="Features">Features</option>
</select>

<button
  type="submit"
  disabled={loadingRecommendations}
>
  {loadingRecommendations
    ? "Finding Cars..."
    : "Find My Cars"}
</button>
                
        </form>

        <section className="results">
          <h2>Recommended shortlist</h2>

          {
            recommendations.length ===0 &&  (
              <div className='empty'>Your top 3 car recommendations will appear here</div>
            )}
            <div className="grid">
  {recommendations.map((car, index) => (
    <div className="car-card" key={car._id}>
      <span className="rank">#{index + 1}</span>

      <h3>{car.name}</h3>

      <p className="score">
        {car.matchScore}% Match
      </p>

      <div className="details">
        <span>{car.mileage} km/l</span>
        <span>₹{car.price.toLocaleString("en-IN")}</span>
        <span>⭐ {car.safetyRating}/5</span>
        <span>⛽ {car.fuelType}</span>
      </div>

      <ul>
        {car.reasons?.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>

      <button
        onClick={() => getLoadingExplanation(car)}
        disabled={loadingExplanation}
      >
        {loadingExplanation &&
        selectedCar?._id === car._id
          ? "Analyzing..."
          : "Why Recommended?"}
      </button>
    </div>
  ))}
</div>

{selectedCar && aiExplanation && (
  <div className="ai-explanation">
    <h3>
      Why {selectedCar.name} is Recommended
    </h3>

    <div className="explanation-content">
      {aiExplanation}
    </div>
  </div>
)}
                

              
     
          
        </section>

      </main>
    </div>
  );
}

export default App;
