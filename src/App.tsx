import React from "react";
import "./App.css";
import { ProjectListScreent } from "./screens/project-list";
import { TsReactTest } from "./screens/project-list/useArray";

function App() {
  return (
    <div className="App">
      {/* <TsReactTest /> */}
      <ProjectListScreent />
    </div>
  );
}

export default App;
