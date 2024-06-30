// import Home from "./components/Home";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Results from "./components/Results";
import FullTable from "./components/FullTable";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Results />} />
          <Route path="/table" element={<FullTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
