import { useState, useEffect, useRef } from 'react';
import './ServiceIcons.css';

const Services = ({ onServiceClick }) => {
  const serviceContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (serviceContainerRef.current) {
      observer.observe(serviceContainerRef.current);
    }

    return () => {
      if (serviceContainerRef.current) {
        observer.unobserve(serviceContainerRef.current);
      }
    };
  }, []);
  const services = [
    {
      icon: 'fa-network-wired',
      title: 'MCP Integration',
      description: 'Seamlessly integrate your systems with our advanced MCP solutions. We ensure smooth communication between different platforms and optimize your workflow.',
      features: [
        'Custom Integration Solutions',
        'API Development',
        'System Architecture',
        'Performance Optimization'
      ]
    },
    {
      icon: 'fa-code',
      title: 'Web Development',
      description: 'Create stunning, responsive websites and web applications that deliver exceptional user experiences. We build modern solutions that drive results.',
      features: [
        'Custom Web Applications',
        'E-commerce Solutions',
        'Progressive Web Apps',
        'Responsive Design'
      ]
    },
    {
      icon: 'fa-robot',
      title: 'AI Agents',
      description: 'Leverage the power of artificial intelligence with our custom AI solutions. We develop intelligent agents that automate tasks and enhance decision-making.',
      features: [
        'Custom AI Solutions',
        'Machine Learning Models',
        'Natural Language Processing',
        'Automation Systems'
      ]
    }
  ];
  return (
    <section id="services" className="py-5" ref={serviceContainerRef}>
      <div className="container position-relative">        {/* Decorative floating service icons have been removed */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Our Services</h2>
          <p className="lead text-muted">
            We provide cutting-edge solutions to help your business thrive in the digital age
          </p>
        </div>
        
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="service-card h-100 d-flex flex-column">
                <div className="mb-4">
                  <i className={`fas ${service.icon} service-icon`}></i>
                  <h3 className="h4 mb-3">{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                </div>
                <ul className="list-unstyled mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button className="btn btn-primary w-100" onClick={() => onServiceClick(service.title)}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 