import React from "react";
import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Page404 } from "./pages";
import { ScrollToTop } from "./components";

export default function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}
