import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AIAgentServices from './components/AIAgentServices'
import TechOrbit from './components/TechOrbit'
import DynamicContent from './components/DynamicContent'
import Footer from './components/Footer'
import Login from './components/Login'
import Chatbot from './components/Chatbot'

function MainContent({ isAuthenticated, onServiceClick }) {
  return (
    <>
      <Hero />
      <AIAgentServices onAgentClick={onServiceClick} />
      <TechOrbit />
      <DynamicContent />
      <Footer />
    </>
  )
}

// AppContent component that uses hooks inside Router context
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const navigate = useNavigate();

  // Handler for service click
  const handleServiceClick = (service) => {
    // Set the selected agent and show the modal
    setSelectedAgent(service);
    setShowComingSoonModal(true);
    // Store service info if needed for future reference
    setPendingService(service);
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
      
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="modal-backdrop" onClick={() => setShowComingSoonModal(false)}>
          <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedAgent} Agent</h2>
              <button className="close-btn" onClick={() => setShowComingSoonModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="coming-soon-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Coming Soon!</h3>
              <p>We're currently developing this exciting AI agent. Stay tuned for updates!</p>
              <div className="progress mb-3">
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated" 
                  role="progressbar" 
                  style={{
                    width: "65%", 
                    background: "linear-gradient(45deg, #3b82f6, #10b981)",
                    backgroundSize: "200% 200%",
                    animation: "progress-animation 2s ease infinite"
                  }} 
                  aria-valuenow="65" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="development-status">Development status: 65% complete</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowComingSoonModal(false)}>Got it!</button>
            </div>
          </div>
        </div>
      )}
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
