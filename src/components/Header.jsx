import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import "../CSS/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleNtr = () => {
    navigate("/nutrition-analysis");
  };
  const handleHome = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <header>
      <div id="HomeHeader">
        <h1>PerfectRecipe</h1>
        <div>
          <label htmlFor="check" id="menu" onClick={toggleMenu}>
            <CiMenuFries size="5vmin" color="#e70da2" />
          </label>
        </div>
        <ul className="desktop-menu">
          <li id="nav" onClick={handleHome}>
            Recipe Finder
          </li>
          <li id="nav" onClick={handleNtr}>
            Nutrition Analysis
          </li>
          <li id="nav">Blog</li>
        </ul>
      </div>
      <nav
        id="menuNav"
        className={`menuNav ${isMenuVisible ? "show" : "hide"}`}
      >
        <ul>
          <li id="nav" onClick={handleHome}>
            Recipe Finder
          </li>
          <li id="nav" onClick={handleNtr}>
            Nutrition Analysis
          </li>
          <li id="nav">Blog</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
