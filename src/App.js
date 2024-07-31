import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import NutritionAnalysis from "./Pages/NutritionAnalysis";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nutrition-analysis" element={<NutritionAnalysis />} />
      </Routes>
    </div>
  );
}

export default App;
