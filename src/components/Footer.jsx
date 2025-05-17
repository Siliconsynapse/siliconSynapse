import { useState, useEffect, useRef } from 'react';
import './ServiceIcons.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef(null);
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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Reset subscription status after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialStats = [
    { icon: 'fa-github', count: '2.5k+', label: 'Repositories' },
    { icon: 'fa-linkedin', count: '10k+', label: 'Connections' },
    { icon: 'fa-twitter', count: '15k+', label: 'Followers' }
  ];

  const quickLinks = [
    { name: 'Services', icon: 'fa-cogs', href: '#services' },
    { name: 'About Us', icon: 'fa-info-circle', href: '#about' },
    { name: 'Contact', icon: 'fa-envelope', href: '#contact' },
    { name: 'Blog', icon: 'fa-blog', href: '#blog' },
    { name: 'Careers', icon: 'fa-briefcase', href: '#careers' },
    { name: 'Privacy', icon: 'fa-shield-alt', href: '#privacy' }
  ];
  return (
    <footer ref={footerRef} className="py-5 mt-5 border-top border-secondary position-relative">      {/* Decorative floating icons have been removed */}
      <div className="container">
        {/* Newsletter Section */}
        <div className="row mb-5">
          <div className="col-lg-6 mx-auto text-center">
            <div className="newsletter-card p-4 rounded-4">
              <h3 className="h4 mb-3">Stay Updated</h3>
              <p className="text-muted mb-4">
                Subscribe to our newsletter for the latest tech insights and updates
              </p>
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control custom-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  {subscribed ? (
                    <span><i className="fas fa-check me-2"></i>Subscribed!</span>
                  ) : (
                    <span><i className="fas fa-paper-plane me-2"></i>Subscribe</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Stats */}
        <div className="row mb-5">
          {socialStats.map((stat, index) => (
            <div key={index} className="col-md-4 text-center">
              <div className="social-stat-card p-4 rounded-4">
                <i className={`fab ${stat.icon} fa-2x mb-3 text-primary`}></i>
                <h4 className="h3 mb-2">{stat.count}</h4>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <h3 className="h4 mb-4">SiliconSynapse</h3>
            <p className="text-muted mb-4">
              Transforming ideas into digital reality. We specialize in MCP integration,
              web development, and AI solutions to help your business thrive.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon-link">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="social-icon-link">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="social-icon-link">
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a href="#" className="social-icon-link">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-4">
            <h3 className="h4 mb-4">Quick Links</h3>
            <div className="row">
              {quickLinks.map((link, index) => (
                <div key={index} className="col-6 mb-3">
                  <a href={link.href} className="quick-link-item">
                    <i className={`fas ${link.icon} me-2 text-primary`}></i>
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-4">
            <h3 className="h4 mb-4">Contact Us</h3>
            <ul className="list-unstyled text-muted">
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-envelope me-3 text-primary"></i>
                <div>
                  <div>contact@siliconsynapse.com</div>
                  <small className="text-muted">24/7 Support</small>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-phone me-3 text-primary"></i>
                <div>
                  <div>+1 (555) 123-4567</div>
                  <small className="text-muted">Mon-Fri, 9am-6pm</small>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-3 text-primary"></i>
                <div>
                  <div>123 Tech Street</div>
                  <small className="text-muted">Silicon Valley, CA</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-muted">
              © {new Date().getFullYear()} SiliconSynapse. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-muted small">Privacy Policy</a>
              <a href="#" className="text-muted small">Terms of Service</a>
              <a href="#" className="text-muted small">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 