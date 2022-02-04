import React from "react";
import { Header, Pathfinding, Particles, Sorting, Home } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();

<<<<<<< HEAD

=======
>>>>>>> 894b63baac33aedee9b1a55515bc4b4835f76543
  return (
    <div className="App">
      <Particles />
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/Pathfinding"}
          element={<Pathfinding columns={35} rows={15} />}
        />
        <Route path={"/"} element={<Sorting />} />
      </Routes>
    </div>
  );
}

export default App;
