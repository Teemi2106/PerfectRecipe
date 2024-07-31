import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ntr.css";
import axios from "axios";

const NutritionAnalysis = () => {
  const [search, setSearch] = useState("");
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const appId = "8203eac6"; // Replace with your App ID
  const appKey = "49245e7d3036d95d70810ccc1cdad730"; // Replace with your App Key

  const handleNtr = () => {
    navigate("/nutrition-analysis");
  };

  const handleHome = () => {
    navigate("/");
  };

  const fetchNutritionData = async () => {
    setLoading(true);
    setError(null);
    setNutritionData(null);

    try {
      const response = await axios.post(
        `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`,
        {
          title: search,
          ingr: [search],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNutritionData(response.data);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setError("Failed to fetch nutrition data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nutritionData) {
      console.log(nutritionData);
    }
  }, [nutritionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchNutritionData();
    }
  };

  return (
    <div>
      <header id="HomeHeader">
        <h1>PerfectRecipe</h1>
        <ul className="desktop-menu">
          <li id="nav" onClick={handleHome}>
            Recipe Finder
          </li>
          <li id="nav" onClick={handleNtr}>
            Nutrition Analysis
          </li>
          <li id="nav">Blog</li>
        </ul>
      </header>

      <main id="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter ingredient or recipe"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Analyze</button>
        </form>
      </main>

      <main id="results">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {nutritionData && (
          <div className="nutrition-results">
            <h2>Nutrition Facts</h2>
            <h3>{search}</h3>
            <p>Calories: {nutritionData.calories}</p>
            <p>Fat: {nutritionData.totalNutrients.FAT.quantity}g</p>
            <p>
              Carbohydrates: {nutritionData.totalNutrients.CHOCDF.quantity}g
            </p>
            <p>Protein: {nutritionData.totalNutrients.PROCNT.quantity}g</p>
          </div>
        )}
      </main>

      <section>
        <h2
          style={{
            fontFamily: "monospace",
            fontWeight: "700",
            fontSize: "4vmin",
            textAlign: "center",
            color: "#f26dc8",
          }}
        >
          Calorie Counter
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            src="https://www.yeschat.ai/i/gpts-9t557fhq6j9-Calorie-Counter"
            width="90%"
            height="500"
            style={{ maxWidth: "100%", border: "none" }}
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default NutritionAnalysis;
