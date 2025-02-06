import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CheckByTitle from './components/fakenews/Checkbytitle';
import CategoryContainer from './components/fakenews/Category';
import FakeNewsHome from './components/fakenews/FakeNewsHome';
import Upload from './components/deepfake/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fakenews" element={<FakeNewsHome />} />
        <Route path="/checkbytitle" element={<CheckByTitle />} />
        <Route path="/category/:category" element={<CategoryContainer />} />
        <Route path="/deepfake" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;