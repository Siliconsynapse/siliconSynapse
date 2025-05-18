import { useEffect, useRef, useState } from 'react';
import './TechOrbit.css';

const TechOrbit = () => {
  const orbitRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (orbitRef.current) {
      observer.observe(orbitRef.current);
    }

    return () => {
      if (orbitRef.current) {
        observer.unobserve(orbitRef.current);
      }
    };
  }, []);

  // Enhanced tech stack with categories and detailed information using Font Awesome icons
  const techCategories = [
    {
      name: "AI Models",
      description: "Advanced neural networks powering our agents",
      color: "#3b82f6",
      icon: "fa-brain",
      technologies: [
        { name: "GPT-4", icon: "fa-robot", color: "#10a37f" },
        { name: "Claude 3", icon: "fa-comment-dots", color: "#8e44ad" }, 
        { name: "LLaMA 3", icon: "fa-dragon", color: "#e74c3c" },
        { name: "Mistral", icon: "fa-wind", color: "#3498db" }
      ]
    },
    {
      name: "Frameworks",
      description: "Development tools for agent orchestration",
      color: "#10b981",
      icon: "fa-layer-group",
      technologies: [
        { name: "LangChain", icon: "fa-link", color: "#2ecc71" },
        { name: "AutoGen", icon: "fa-cogs", color: "#f39c12" },
        { name: "CrewAI", icon: "fa-users-cog", color: "#1abc9c" },
        { name: "Semantic Kernel", icon: "fa-atom", color: "#9b59b6" }
      ]
    },
    {
      name: "Vector DBs",
      description: "Semantic information retrieval systems",
      color: "#8b5cf6",
      icon: "fa-database",
      technologies: [
        { name: "Pinecone", icon: "fa-sitemap", color: "#e67e22" },
        { name: "Chroma", icon: "fa-palette", color: "#16a085" },
        { name: "Milvus", icon: "fa-vector-square", color: "#3498db" },
        { name: "Qdrant", icon: "fa-cube", color: "#2c3e50" }
      ]
    },
    {
      name: "Infrastructure",
      description: "Cloud platforms for deployment",
      color: "#ec4899",
      icon: "fa-cloud",
      technologies: [
        { name: "AWS", icon: "fa-server", color: "#f1c40f" },
        { name: "GCP", icon: "fa-cloud-upload-alt", color: "#3498db" },
        { name: "Azure", icon: "fa-cloud-rain", color: "#0078d4" },
        { name: "Vercel", icon: "fa-bolt", color: "#2d3748" }
      ]
    }
  ];

  return (
    <section id="tech-orbit" className="py-5 tech-orbit-section" ref={orbitRef}>
      <div className="orbit-background">
        <div className="particle-grid"></div>
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
      </div>

      <div className="container position-relative">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="tech-stack-headline">
              <span className="tech-badge">INNOVATION HUB</span>
              <h2 className="tech-headline">Powered by Advanced AI Technologies</h2>
              <p className="tech-subtitle">
                Our AI agents leverage cutting-edge technologies in a seamless infrastructure designed for intelligence, scale, and security.
              </p>
            </div>
          </div>
        </div>

        <div className={`tech-showcase ${isVisible ? 'tech-visible' : ''}`}>
          <div className="tech-categories">
            {techCategories.map((category, index) => (
              <div 
                key={index}
                className={`tech-category ${activeIndex === index ? 'active' : ''}`}
                style={{ '--category-color': category.color }}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              >
                <div className="category-icon">
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <div className="category-info">
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
                </div>
                
                <div className={`tech-detail ${activeIndex === index ? 'expanded' : ''}`}>
                  <div className="tech-grid">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="tech-card" style={{ '--delay': `${techIndex * 0.1}s` }}>
                        <div className="tech-logo" style={{ color: tech.color }}>
                          <i className={`fas ${tech.icon}`}></i>
                        </div>
                        <div className="tech-name">{tech.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{ 
                  '--size': `${Math.random() * 10 + 5}px`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--duration': `${Math.random() * 20 + 10}s`,
                  '--delay': `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="tech-decoration">
            <div className="glow-ring"></div>
            <div className="pulse-circle"></div>
            <div className="orbit-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechOrbit; 