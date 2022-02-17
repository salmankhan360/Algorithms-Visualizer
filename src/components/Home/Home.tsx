import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.scss";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1 className="typing">Welcome, I'm Rehman</h1>
      <h2>
        <span
          style={{ fontWeight: 300, transition: "all 300ms ease-in-out" }}
          className="fade-In-left"
        >
          Algorithms
        </span>{" "}
        <span className="glitch fade-In-Bottom" data-text="Visualizer">
          Visualizer
        </span>
      </h2>
      <div>
        <p className="bottom-top">Pick a type of alogrithms to get started !</p>
      </div>
      <div className="algorithms-wrapper">
        <div className="algorithms">
          <div onClick={() => navigate("/sorting")}>Sorting</div>
          <div onClick={() => navigate("/pathfinding")}>Pathfinding</div>
        </div>
      </div>
    </div>
  );
}
