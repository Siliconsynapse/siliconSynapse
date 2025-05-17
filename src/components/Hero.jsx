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
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content fade-in">
            <h1 className="hero-title">
              Transforming Ideas into Digital Reality
            </h1>
            <p className="hero-subtitle">
              Tell us a problem, and we'll find the perfect solution for you.
              We specialize in MCP integration, web development, and AI agents.
            </p>
            <div className="d-flex gap-3">
              <a href="#services" className="btn btn-primary">
                Explore Services
              </a>
              <a href="#contact" className="btn btn-outline-light">
                Get in Touch
              </a>
            </div>
          </div>          <div className="col-lg-6 d-none d-lg-block" style={{ position: 'relative', minHeight: 500 }}>
            <div className="float-animation">
              <div className="position-relative" style={{ height: '500px' }}>                <div className="position-absolute" style={{ top: '5%', left: '5%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-robot service-icon"></i>
                    <h4>AI Solutions</h4>
                  </div>
                </div>
                <div className="position-absolute" style={{ top: '38%', left: '55%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-code service-icon"></i>
                    <h4>Web Development</h4>
                  </div>
                </div>                <div className="position-absolute" style={{ top: '72%', left: '20%' }}>
                  <div className="service-card p-4">
                    <i className="fas fa-network-wired service-icon"></i>
                    <h4>MCP Integration</h4>
                  </div>
                </div>
                {/* Floating Tech Icons have been removed and repurposed elsewhere */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 