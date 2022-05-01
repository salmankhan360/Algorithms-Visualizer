import React from "react";
import { Header, Pathfinding, Particles, Sorting, Home } from "./components";
import { Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={
            <>
              {" "}
              <Particles />
              <Home />
            </>
          }
        />
        <Route
          path={"/Pathfinding"}
          element={<Pathfinding  />}
        />
        <Route
          path={"/sorting"}
          element={
            <>
              <Particles />
              <Sorting />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
