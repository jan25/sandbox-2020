import React from "react";
import "./App.css";
import TopGrid from "./components/TopGrid";
import Numbers from "./components/Numbers";

function App() {
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <TopGrid />
      <Numbers />
    </div>
  );
}

export default App;
