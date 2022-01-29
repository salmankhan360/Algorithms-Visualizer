import React from "react";
import { Pathfinding } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();
  React.useEffect(() => {
    console.log("nva");
    navigate(`/pathfinding${search}`);
  }, []);

  return (
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
  );
}

export default App;
