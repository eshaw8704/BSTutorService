import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentCreation from './components/StudentCreation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/student" element={<StudentCreation />} />
    </Routes>
  );
}

export default App;
