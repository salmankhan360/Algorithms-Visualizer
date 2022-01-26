import React from "react";
import Pathfinding from "./Visualizers/Pathfinding/Pathfinding";
function App() {
  return (
    <div className="App">
      <Pathfinding columns={40} rows={20} />
    </div>
  );
}

export default App;
