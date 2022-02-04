import React from 'react';
import HomePng from "../../../assets/Home.png";
import TargetPng from "../../../assets/target_PNG8.png";

export default function NodeInfo() {
  return <div className="nodesLabels">
  <div className="start">
    <img src={HomePng} /> Start Node
  </div>
  <div className="unvisited">
    <span></span> UnVisited Node
  </div>
  <div className="visited">
    <span></span>Visited Node
  </div>
  <div className="shortestpath">
    <span></span>Shortest-path Node
  </div>
  <div className="wall">
    <span></span>Wall
  </div>
  <div className="finish">
    {" "}
    <img src={TargetPng} />
    Target Node
  </div>
</div>;
}
