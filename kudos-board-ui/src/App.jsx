import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import BoardPage from "./Components/BoardPage/BoardPage";
//add header and footer for later

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
