import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CheckByTitle from './components/fakenews/Checkbytitle';
import CategoryContainer from './components/fakenews/Category';
import FakeNewsHome from './components/fakenews/FakeNewsHome';
import Upload1 from './components/deepfake-videos/Upload1';
// import Upload2 from './components/deepfake-images/Upload2';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fakenews" element={<FakeNewsHome />} />
        <Route path="/checkbytitle" element={<CheckByTitle />} />
        <Route path="/category/:category" element={<CategoryContainer />} />
        <Route path="/deepfake-videos" element={<Upload1 />} />
        {/* <Route path="/deepfake-images" element={<Upload2 />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;