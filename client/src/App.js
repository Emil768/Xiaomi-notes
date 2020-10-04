import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import "./App.scss";
import ModalInfo from "./components/ModalInfo";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Notes} />
    </div>
  );
}

export default App;
