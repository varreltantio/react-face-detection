import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Exam from './Exam';
import { FaceProvider } from './FaceContext';

function App() {
  return (
    <Router>
      <FaceProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </FaceProvider>
    </Router>
  );
}

export default App;
