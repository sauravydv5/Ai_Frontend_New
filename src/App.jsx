import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage/HomeContent";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
