import React from "react";
import Algo from "./Algo";
import Command from "./Command";

import "./App.css";

function App() {
  return (
    <div className="container border">
      <header className="border">
        <h1>Algorithme Génétique</h1>
      </header>

      {/* <footer>
        <p>Copyrigth Théorisons</p>
      </footer> */}

      <div className="border row">
        <div className="border col-sm-6">
          <p>Display Pannel</p>
        </div>

        <div className="border col-sm-6">
          <p>Command pannel</p>
          <Command />
        </div>
      </div>
      <Algo />
    </div>
  );
}

export default App;
