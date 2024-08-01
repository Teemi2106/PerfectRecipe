import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import NutritionAnalysis from "./Pages/NutritionAnalysis";
import Chatbot from "./Pages/Chatbot";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nutrition-analysis" element={<NutritionAnalysis />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
