import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import TutorDashboard from './components/Frames/TutorDashboard.jsx';
import StudentDashboard from './components/Frames/StudentDashboard.jsx';
import Login from './components/Frames/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/tutor" element={<TutorDashboard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
