import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [formData, setFormData] = useState({
    budget: "",
    familyType: "",
    usage: "",
    fuelType: "",
    priority: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [explanation, setExplanation] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendations = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSelectedCar(null);
      setRecommendations([]);
      setExplanation("");

      const response = await fetch(`${API_URL}/cars/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.recommendedCars);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  const getLoadingExplanation = async (car) => {
    try {
      setAiLoading(true);
      setSelectedCar(car);
      setExplanation("");

      const alternativeCars = recommendations.filter(
        (item) => item.name !== car.name
      );

      const response = await fetch(`${API_URL}/cars/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedCar: car,
          alternativeCars,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setExplanation(data.explanation);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to generate AI explanation");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="app">
      <section className="hero">
        <p className="tag">AI-native car research MVP</p>
        <h1>CarMatch AI</h1>
        <p>
          Answer a few questions and get your top 3 car matches with AI-powered
          buying advice.
        </p>
      </section>

      <main className="layout">
        <form className="form-card" onSubmit={getRecommendations}>
          <h2>Your Preferences</h2>

          <label>Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select Budget</option>
            <option value="500000">Under ₹5 Lakhs</option>
            <option value="800000">Under ₹8 Lakhs</option>
            <option value="1000000">Under ₹10 Lakhs</option>
            <option value="1200000">Under ₹12 Lakhs</option>
            <option value="1500000">Under ₹15 Lakhs</option>
            <option value="2000000">Under ₹20 Lakhs</option>
            <option value="3000000">Above ₹20 Lakhs</option>
          </select>

          <label>Family Size</label>
          <select
            name="familyType"
            value={formData.familyType}
            onChange={handleChange}
            required
          >
            <option value="">Select Family Size</option>
            <option value="Single">Single</option>
            <option value="Couple">Couple</option>
            <option value="Small Family">Small Family</option>
            <option value="Large Family">Large Family</option>
          </select>

          <label>Usage</label>
          <select
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            required
          >
            <option value="">Select Usage</option>
            <option value="City">City Commute</option>
            <option value="Highway">Highway Travel</option>
            <option value="Mixed">City + Highway</option>
            <option value="Hills">Hilly / Mountain Roads</option>
            <option value="Rural">Village / Rough Roads</option>
          </select>

          <label>Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="Safety">Safety</option>
            <option value="Mileage">Mileage</option>
            <option value="Comfort">Comfort</option>
            <option value="Performance">Performance</option>
            <option value="Features">Features</option>
            <option value="Low Maintenance">Low Maintenance</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Finding Cars..." : "Find My Car Match"}
          </button>
        </form>

        <section className="results">
          <h2>Recommended Shortlist</h2>

          {recommendations.length === 0 && (
            <div className="empty">
              Your top 3 car recommendations will appear here.
            </div>
          )}

          <div className="grid">
            {recommendations.map((car, index) => (
              <div className="car-card" key={car._id || car.name}>
                <span className="rank">#{index + 1}</span>

                <h3>{car.name}</h3>

                <p className="score">{car.matchPercentage}% Match</p>

                <div className="car-details">
                  <span>💰 ₹{car.price?.toLocaleString()}</span>
                  <span>⛽ {car.fuelType}</span>
                  <span>🛣️ {car.mileage} km/l</span>
                  <span>Usage: {car.usage?.join(", ")}</span>
                </div>

                <button
                  onClick={() => getLoadingExplanation(car)}
                  disabled={aiLoading}
                >
                  {aiLoading && selectedCar?.name === car.name
                    ? "Analysing..."
                    : "Why Recommended?"}
                </button>
              </div>
            ))}
          </div>

          {selectedCar && explanation && (
            <div className="ai-explanation">
              <h3>Why {selectedCar.name} is Recommended</h3>

              <div className="explanation-content">
                <pre>{explanation}</pre>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;