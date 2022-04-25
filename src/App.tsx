import React from "react";
import { Header, Pathfinding, Particles, Sorting, Home } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [pathfinding, setPathfinding] = React.useState<any>(null);

  React.useEffect(() => {
    const maxWidth = window.innerWidth - 60;
    const maxHeight = window.innerHeight - 100;

    let columns = Math.floor(maxWidth / 28.94);
    let rows = Math.floor(maxHeight / 28.94);

    columns = columns % 2 == 0 ? columns + 1 : columns;
    rows = rows % 2 == 0 ? rows + 1 : rows;

    setPathfinding({
      ...pathfinding,
      columns,
      rows,
    });
    const body: any = document.querySelector("body");
    body.style.minWidth = `${columns * 28.94 + 60}px`;
  }, []);

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
          element={pathfinding && <Pathfinding {...pathfinding} />}
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
