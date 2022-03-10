import React from "react";
import { Header, Pathfinding, Particles, Sorting, Home } from "./components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [pathfinding, setPathfinding] = React.useState<any>(null);

  React.useEffect(() => {
    const maxRows = 20;
    const maxCols = 55;

    const maxWidth = window.innerWidth - 200;
    const maxHeight = window.innerHeight - 300;

    // const columns = maxWidth / 31 > maxCols ? maxCols : maxWidth / 31;
    // const rows = maxHeight / 31 > maxRows ? maxRows : maxHeight / 31;
    const columns = maxWidth/ 26
    const rows = maxHeight/ 26

    console.log({ columns, rows });
    setPathfinding({
      ...pathfinding,
      columns,
      rows,
    });
    const body: any = document.querySelector("body");
    body.style.minWidth = `${columns * 26 + 200}px`;
  }, []);

  return (
    <div className="App">
      <Particles />
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/Pathfinding"}
          element={pathfinding && <Pathfinding {...pathfinding} />}
        />
        <Route path={"/sorting"} element={<Sorting />} />
      </Routes>
    </div>
  );
}

export default App;
