import { useState, useEffect, useRef } from 'react';
import './ServiceIcons.css';

const DynamicContent = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const techContainerRef = useRef(null);
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

  // Handle mouse movement for tech icons
  useEffect(() => {
    if (!techContainerRef.current || activeTab !== 'tech') return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = techContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMouse({ x, y });
    };
    
    techContainerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (techContainerRef.current) {
        techContainerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [activeTab, techContainerRef]);

  const projects = [
    {
      title: 'AI-Powered Analytics Platform',
      description: 'Built a comprehensive analytics platform using machine learning for a Fortune 500 company.',
      tech: ['React', 'Python', 'TensorFlow', 'AWS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'E-commerce Integration',
      description: 'Seamless integration of multiple e-commerce platforms with custom MCP solutions.',
      tech: ['Node.js', 'MongoDB', 'Docker', 'Kubernetes'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Smart Home Automation',
      description: 'Developed an AI-powered home automation system with voice control capabilities.',
      tech: ['Python', 'TensorFlow', 'React Native', 'IoT'],
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechCorp',
      content: 'SiliconSynapse transformed our business with their AI solutions. The results have been outstanding!',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, StartupX',
      content: 'Their web development team delivered beyond our expectations. Highly recommended!',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager, InnovateCo',
      content: 'The MCP integration was seamless and has significantly improved our workflow efficiency.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const techStack = [
    { name: 'Frontend', items: ['React', 'Vue.js', 'Angular', 'Next.js'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'Java', 'Go'] },
    { name: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI'] },
    { name: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'DigitalOcean'] }
  ];

  return (
    <section id="dynamic-content" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Our Work</h2>
          <p className="lead text-muted">
            Explore our latest projects, client testimonials, and technology stack
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="nav nav-pills justify-content-center" role="tablist">
              <button
                className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <i className="fas fa-project-diagram me-2"></i>
                Projects
              </button>
              <button
                className={`nav-link ${activeTab === 'testimonials' ? 'active' : ''}`}
                onClick={() => setActiveTab('testimonials')}
              >
                <i className="fas fa-quote-right me-2"></i>
                Testimonials
              </button>
              <button
                className={`nav-link ${activeTab === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                <i className="fas fa-code me-2"></i>
                Tech Stack
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className={`row g-4 ${isVisible ? 'fade-in' : ''}`}>
              {projects.map((project, index) => (
                <div key={index} className="col-md-4">
                  <div className="project-card h-100">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} className="img-fluid rounded-top" />
                    </div>
                    <div className="project-content p-4">
                      <h3 className="h5 mb-3">{project.title}</h3>
                      <p className="text-muted mb-3">{project.description}</p>
                      <div className="tech-tags">
                        {project.tech.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className={`row g-4 ${isVisible ? 'fade-in' : ''}`}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-md-4">
                  <div className="testimonial-card h-100">
                    <div className="testimonial-content p-4">
                      <div className="d-flex align-items-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="rounded-circle me-3"
                          width="60"
                          height="60"
                        />
                        <div>
                          <h4 className="h6 mb-1">{testimonial.name}</h4>
                          <p className="text-muted small mb-0">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="mb-0">{testimonial.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}          {/* Tech Stack Tab */}
          {activeTab === 'tech' && (
            <div className={`${isVisible ? 'fade-in' : ''}`}>
              <div className="row g-4 mb-5">
                {techStack.map((category, index) => (
                  <div key={index} className="col-md-3">
                    <div className="tech-card h-100">
                      <div className="tech-content p-4">
                        <h3 className="h5 mb-4">{category.name}</h3>
                        <ul className="list-unstyled mb-0">
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
                ))}              </div>                {/* Tech Stack Icons Float have been removed */}
              <div ref={techContainerRef} className="tech-visualization-container">
                <div className="text-center position-absolute start-0 end-0" style={{ top: '20px', zIndex: 2 }}>
                  <h3 className="text-white mb-0">Our Technology Ecosystem</h3>
                </div>
                {/* TechStackIconsFloat component has been removed */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicContent; 