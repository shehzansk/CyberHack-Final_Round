import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CheckByTitle from './components/Checkbytitle';
import CategoryContainer from './components/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkbytitle" element={<CheckByTitle />} />
        <Route path="/category/:category" element={<CategoryContainer />} />
      </Routes>
    </Router>
  );
}

export default App;