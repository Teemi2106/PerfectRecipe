import React, { useEffect, useState } from "react";
import "../CSS/Homepage.css";
import axios from "axios";
import Spinner from "../components/spinner";
import Header from "../components/Header";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const appId = "6043d632";
  const appKey = "972241361c9c74c3a6f9ee4c2380b735";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const query = search;

      try {
        const response = await axios.get(`https://api.edamam.com/search`, {
          params: {
            q: query,
            app_id: appId,
            app_key: appKey,
          },
        });
        setDb(response.data.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your API credentials.");
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceFetch);
  }, [search]);

  return (
    <div id="canvas">
      <Header />

      <main id="search">
        <input
          type="text"
          placeholder="Search Food"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </main>

      <main id="results">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {db.length === 0 && !loading && (
          <p className="find">{search ? "Meal Not Found" : "Find A Meal!"}</p>
        )}

        {loading ? (
          <Spinner />
        ) : (
          db.map((item, index) => (
            <div key={index} className="recipe-item">
              <h2>{item.recipe.label}</h2>
              <img src={item.recipe.image} alt={item.recipe.label} />
              <a
                href={item.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </a>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Homepage;
