import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  FunctionProfilePage,
  ClassProfilePage,
  Parent,
  VueParent
} from "./profile";

import "./styles.css";

function App() {
  const [state, setState] = useState(1);
  console.log("render:");
  return (
    <div className="App">
      <button
        onClick={() => {
          setState(x => x + 1);
        }}
      >
        double
      </button>
      <div>state:{state}</div>
      <FunctionProfilePage user={state} />
      <ClassProfilePage user={state} />

      <VueParent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
