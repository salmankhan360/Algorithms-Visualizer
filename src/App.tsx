import React from "react";
import { Header, Pathfinding, Particles, Sorting } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <div className="App">
      {/* <Particles /> */}
      {/* <Header /> */}
      <Routes>
        <Route
          path={"/Pathfinding"}
          element={<Pathfinding columns={40} rows={20} />}
        />
        <Route path={"/"} element={<Sorting />} />
      </Routes>
    </div>
  );
}

export default App;
