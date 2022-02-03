import React from "react";
import { Header, Pathfinding, Particles, Home } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();


  return (
    <div className="App">
      <Particles />
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={<Home/>}
        />
        <Route
          path={"/Pathfinding"}
          element={<Pathfinding columns={40} rows={20} />}
        />
        <Route
          path={"/sorting"}
          element={<Pathfinding columns={40} rows={20} />}
        />
      </Routes>
    </div>
  );
}

export default App;
