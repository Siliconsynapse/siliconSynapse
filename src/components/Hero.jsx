import { useEffect, useRef, useState } from 'react';
import './HeroEnhanced.css';

const Hero = () => {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.7, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMouse({ x, y });
      heroRef.current.style.setProperty('--mouse-x', x);
      heroRef.current.style.setProperty('--mouse-y', y);
    };
    heroRef.current.addEventListener('mousemove', handleMouseMove);
    return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section" ref={heroRef} style={{ position: 'relative' }}>
      <div className="hero-background">
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
      </div>
      
      <div className="container section-content">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content fade-in">
            <div className="hero-badge mb-4">
              <span className="pulse"></span>
              Next-Gen AI Solutions
            </div>
            <h1 className="hero-title">
              <span className="text-gradient">Intelligent Agents</span> Powering Tomorrow's Innovation
            </h1>
            <p className="hero-subtitle">
              Unleash the potential of AI with our custom-built autonomous agents that transform 
              complex tasks into automated workflows. Revolutionize how your business operates.
            </p>
            <div className="d-flex gap-3 hero-buttons">
              <a href="#services" className="btn btn-primary btn-glow">
                Explore AI Agents
              </a>
              <a href="#contact" className="btn btn-outline-light">
                Deploy Your Agent
              </a>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block" style={{ position: 'relative', minHeight: 650 }}>
            <div className="float-animation hero-cards-container" style={{ overflow: 'visible', padding: '40px' }}>
              <div className="position-relative" style={{ height: '600px', width: '100%', overflow: 'visible' }}>
                <div className="position-absolute hero-card-wrapper" style={{ top: '5%', left: '5%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-brain service-icon"></i>
                    <h4>Cognitive Agents</h4>
                  </div>
                </div>
                <div className="position-absolute hero-card-wrapper" style={{ top: '32%', left: '55%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-robot service-icon"></i>
                    <h4>Task Automation</h4>
                  </div>
                </div>
                <div className="position-absolute hero-card-wrapper" style={{ top: '72%', left: '12%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-microchip service-icon"></i>
                    <h4>AI Integration</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 