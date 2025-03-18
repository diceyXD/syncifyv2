import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Auth Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Marks from './pages/Marks';
import Placement from './pages/Placement';
import Skills from './pages/Skills';
import Feedback from './pages/Feedback';
import Landing from './pages/Landing';

// Theme Provider
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // Set isAuthenticated to true by default for development
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen w-full bg-[var(--dark-bg)] text-[var(--dark-text)] transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="attendance" />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="marks" element={<Marks />} />
              <Route path="placement" element={<Placement />} />
              <Route path="skills" element={<Skills />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
