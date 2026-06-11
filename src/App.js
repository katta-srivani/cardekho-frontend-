import { useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://cardekho-backend-hcf7.onrender.com/api/cars";

function App() {
  const [formData, setFormData] = useState({
    budget: "",
    familyType: "",
    usage: "",
    fuelType: "",
    priority: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const handleCHange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendations = async (e) => {
    e.preventDefault();
    setLoadingRecommendations(true);
    setSelectedCar(null);
    setAiExplanation("");

    try {
      const response = await fetch(`${API_URL}/recommend`, {
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

      if (!response.ok) {
        throw new Error(data.message || "Failed to get recommendations");
      }

      setRecommendations(data.recommendedCars || []);
    } catch (error) {
      console.error("Recommendation error:", error);
      alert("Failed to get recommendations");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const getLoadingExplanation = async (car) => {
    setSelectedCar(car);
    setLoadingExplanation(true);
    setAiExplanation("");

    try {
      const response = await fetch(`${API_URL}/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget),
          selectedCar: car,
          alternativeCars: recommendations.filter((c) => c.name !== car.name),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI explanation failed");
      }

      setAiExplanation(data.explanation);
    } catch (error) {
      console.error("Failed to generate explanation:", error);
      alert("Failed to generate AI explanation");
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div className="app">
      <section className="hero">
        <p className="tag">AI-Native Car Research MVP</p>
        <h1>CarMatch AI</h1>
        <p>
          Find the best car based on your budget, family size, usage, fuel type,
          and priority.
        </p>
      </section>

      <main className="layout">
        <form className="form-card" onSubmit={getRecommendations}>
          <h2>Your Preferences</h2>

          <label>Budget</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleCHange}
            required
          >
            <option value="">Select Budget</option>
            <option value="800000">Under ₹8 Lakhs</option>
            <option value="1000000">Under ₹10 Lakhs</option>
            <option value="1200000">Under ₹12 Lakhs</option>
            <option value="1500000">Under ₹15 Lakhs</option>
            <option value="2500000">Under ₹25 Lakhs</option>
          </select>

          <label>Family Size</label>
          <select
            name="familyType"
            value={formData.familyType}
            onChange={handleCHange}
            required
          >
            <option value="">Select Family Size</option>
            <option value="Couple">Couple</option>
            <option value="Small Family">Small Family</option>
            <option value="Large Family">Large Family</option>
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
            <option value="Hills">Hilly / Mountain Roads</option>
            <option value="Rural">Village / Rough Roads</option>
          </select>

          <label>Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleCHange}
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
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
            <option value="Comfort">Comfort</option>
            <option value="Performance">Performance</option>
            <option value="Low Maintenance">Low Maintenance</option>
          </select>

          <button type="submit" disabled={loadingRecommendations}>
            {loadingRecommendations ? "Finding Cars..." : "Find My Cars"}
          </button>
        </form>

        <section className="results">
          <h2>Recommended Shortlist</h2>

          {recommendations.length === 0 && (
            <div className="empty">
              Your top 3 car recommendations will appear here
            </div>
          )}

          <div className="grid">
            {recommendations.map((car, index) => (
              <div className="car-card" key={car.name}>
                <span className="rank">#{index + 1}</span>

                <h3>{car.name}</h3>

                <p className="score">{car.matchPercentage}% Match</p>

                <div className="details">
                  <span>₹{car.price.toLocaleString("en-IN")}</span>
                  <span>⛽ {car.fuelType}</span>
                  <span>{car.brand}</span>
                </div>

                <p>
                  Usage:{" "}
                  {Array.isArray(car.usage) ? car.usage.join(", ") : car.usage}
                </p>

                <button
                  onClick={() => getLoadingExplanation(car)}
                  disabled={loadingExplanation}
                >
                  {loadingExplanation && selectedCar?.name === car.name
                    ? "Analyzing..."
                    : "Why Recommended?"}
                </button>
              </div>
            ))}
          </div>

          {selectedCar && aiExplanation && (
            <div className="ai-explanation">
              <h3>Why {selectedCar.name} is Recommended</h3>
              <div className="explanation-content">{aiExplanation}</div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;