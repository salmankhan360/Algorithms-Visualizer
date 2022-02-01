import React from "react";
import { Header, Pathfinding, Particles } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();

  React.useEffect(() => {
    console.log("nva");
    navigate(`/pathfinding${search}`);
  }, []);

  return (
    <div className="App">
      <Particles />
      <Header />
      <Routes>
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
