import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import DynamicContent from './components/DynamicContent'
import Footer from './components/Footer'
import Login from './components/Login'
import Chatbot from './components/Chatbot'

function MainContent({ isAuthenticated, onServiceClick }) {
  return (
    <>
      <Hero />
      <Services onServiceClick={onServiceClick} />
      <DynamicContent />
      <Footer />
    </>
  )
}

// AppContent component that uses hooks inside Router context
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const navigate = useNavigate();

  // Handler for service click
  const handleServiceClick = (service) => {
    if (!isAuthenticated) {
      navigate('/login');
      setPendingService(service);
    } else {
      window.location.hash = '#contact';
    }
  };

  // Handler after login
  const handleAuth = () => {
    setIsAuthenticated(true);
    if (pendingService) {
      navigate('/');
      setTimeout(() => {
        window.location.hash = '#contact';
        setPendingService(null);
      }, 100);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/" element={<MainContent isAuthenticated={isAuthenticated} onServiceClick={handleServiceClick} />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
