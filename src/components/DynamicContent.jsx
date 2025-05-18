import { useState, useEffect, useRef } from 'react';
import './ServiceIcons.css';

const DynamicContent = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('dynamic-content');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const caseStudies = [
    {
      title: 'AI-Powered Business Intelligence',
      client: 'Global Finance Corp',
      description: 'Deployed intelligent agents that analyzed 5+ years of financial data, resulting in a 32% increase in operational efficiency and $2.4M in cost savings.',
      outcome: 'ROI in just 3 months',
      tech: ['Cognitive Analysis', 'Predictive Forecasting', 'Automated Reporting'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Customer Support Transformation',
      client: 'E-Commerce Leader',
      description: 'Implemented a network of support agents handling 10,000+ daily inquiries with 94% resolution rate, reducing response times by 78%.',
      outcome: 'Customer satisfaction increased by 48%',
      tech: ['Natural Language Processing', 'Sentiment Analysis', 'Multi-platform Integration'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Supply Chain Optimization',
      client: 'Manufacturing Pioneer',
      description: 'Created autonomous agents that coordinated logistics, inventory management, and demand forecasting across 12 facilities globally.',
      outcome: 'Reduced inventory costs by 27%',
      tech: ['Predictive Analytics', 'Real-time Monitoring', 'Autonomous Decision Making'],
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, Global Finance Corp',
      content: "SiliconSynapse's AI agents revolutionized how we process financial data. We're now making decisions in minutes that used to take weeks.",
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Innovation, RetailTech',
      content: 'The autonomous agents deployed by Silicon Synapse have completely transformed our customer service operations. Our team now focuses on strategy while the AI handles execution.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Director, LogisticsMaster',
      content: "Implementing Silicon Synapse's intelligent agents into our supply chain has been game-changing. We've cut costs while improving delivery times by 40%.",
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const capabilities = [
    { 
      name: 'Intelligence Core', 
      icon: 'fa-brain',
      items: [
        'Natural Language Processing',
        'Computer Vision',
        'Reinforcement Learning',
        'Adaptive Decision Making'
      ]
    },
    { 
      name: 'Connectivity', 
      icon: 'fa-network-wired',
      items: [
        'API Integration',
        'Webhook Processing',
        'Database Synchronization',
        'IoT Compatibility'
      ]
    },
    { 
      name: 'Deployment', 
      icon: 'fa-cloud',
      items: [
        'Cloud Native',
        'On-premise Solutions', 
        'Edge Deployment',
        'Hybrid Architecture'
      ]
    },
    { 
      name: 'Security', 
      icon: 'fa-shield-alt',
      items: [
        'End-to-end Encryption',
        'Access Control',
        'Audit Logging',
        'Compliance Management'
      ]
    }
  ];

  return (
    <section id="dynamic-content" className="py-5 dynamic-content-section" ref={contentRef}>
      <div className="section-background">
        <div className="gradient-sphere gradient-sphere-blue" style={{ top: '40%', left: '-150px' }}></div>
        <div className="gradient-sphere gradient-sphere-green" style={{ top: '-100px', right: '30%' }}></div>
        <div className="gradient-sphere gradient-sphere-purple" style={{ bottom: '-100px', right: '10%' }}></div>
      </div>
      
      <div className="container section-content">
        <div className="text-center mb-5">
          <span className="orbit-badge mb-2">Results that matter</span>
          <h2 className="display-4 fw-bold mb-3">AI Excellence in Action</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Discover how our intelligent agents are delivering transformative results 
            for businesses across industries
          </p>
        </div>

        {/* Tab Navigation with improved styling */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="nav-tabs-container">
              <div className="nav nav-pills justify-content-center tab-navigation" role="tablist">
                <button
                  className={`nav-link ${activeTab === 'case-studies' ? 'active' : ''}`}
                  onClick={() => setActiveTab('case-studies')}
                >
                  <i className="fas fa-briefcase me-2"></i>
                  Case Studies
                </button>
                <button
                  className={`nav-link ${activeTab === 'testimonials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('testimonials')}
                >
                  <i className="fas fa-quote-right me-2"></i>
                  Success Stories
                </button>
                <button
                  className={`nav-link ${activeTab === 'capabilities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('capabilities')}
                >
                  <i className="fas fa-brain me-2"></i>
                  Agent Capabilities
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content with improved layouts */}
        <div className="tab-content">
          {/* Case Studies Tab */}
          {activeTab === 'case-studies' && (
            <div className={`row g-4 ${isVisible ? 'fade-in' : ''}`}>
              {caseStudies.map((study, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="case-study-card h-100">
                    <div className="case-study-image">
                      <img src={study.image} alt={study.title} className="img-fluid" />
                      <div className="client-badge">{study.client}</div>
                    </div>
                    <div className="case-study-content p-4">
                      <h3 className="h4 mb-3">{study.title}</h3>
                      <p className="text-muted mb-3">{study.description}</p>
                      <div className="outcome-badge mb-4">
                        <i className="fas fa-chart-line me-2"></i>
                        {study.outcome}
                      </div>
                      <h4 className="h6 mb-2">Technologies Applied</h4>
                      <div className="tech-tags">
                        {study.tech.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonials Tab with improved design */}
          {activeTab === 'testimonials' && (
            <div className={`row g-4 ${isVisible ? 'fade-in' : ''}`}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="testimonial-card h-100">
                    <div className="testimonial-quote-mark">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <div className="testimonial-content p-4">
                      <p className="testimonial-text mb-4">{testimonial.content}</p>
                      <div className="testimonial-author d-flex align-items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="testimonial-avatar rounded-circle"
                          width="60" height="60"
                        />
                        <div className="ms-3">
                          <h4 className="h5 mb-1">{testimonial.name}</h4>
                          <p className="text-muted mb-0">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Capabilities Tab with better organization */}
          {activeTab === 'capabilities' && (
            <div className={`${isVisible ? 'fade-in' : ''}`}>
              <div className="row g-4 mb-5">
                {capabilities.map((category, index) => (
                  <div key={index} className="col-lg-3 col-md-6">
                    <div className="capability-card h-100">
                      <div className="capability-icon">
                        <i className={`fas ${category.icon}`}></i>
                      </div>
                      <div className="capability-content p-4">
                        <h3 className="h4 mb-4">{category.name}</h3>
                        <ul className="capability-list">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="mb-3">
                              <i className="fas fa-check-circle text-primary me-2"></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-5 pt-4">
          <a href="#contact" className="btn btn-lg btn-primary btn-glow">
            Deploy Agents for Your Business
            <i className="fas fa-arrow-right ms-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DynamicContent; 