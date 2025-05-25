import { useState, useEffect, useRef } from 'react';
import './AIAgentCards.css';
import './AIAgentCardsHoverFix.css';

const AIAgentServices = ({ onAgentClick }) => {
  const agentContainerRef = useRef(null);
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

    if (agentContainerRef.current) {
      observer.observe(agentContainerRef.current);
    }

    return () => {
      if (agentContainerRef.current) {
        observer.unobserve(agentContainerRef.current);
      }
    };
  }, []);

  // Available AI agents that we offer
  const aiAgents = [
    {
      icon: 'fa-pencil-alt',
      title: 'Content Creator',
      description: 'Access our content creation agent to generate engaging blog posts, articles, and marketing copy for your brand.',
      features: [
        'SEO-optimized blog posts',
        'Marketing copy generation',
        'Email campaign content',
        'Social media captions'
      ],
      color: 'blue'
    },
    {
      icon: 'fa-search',
      title: 'Research Assistant',
      description: 'Accelerate your research with our comprehensive research agent that gathers, analyzes, and summarizes information.',
      features: [
        'Literature review',
        'Data gathering',
        'Source verification',
        'Summary generation'
      ],
      color: 'yellow'
    },
    {
      icon: 'fa-chart-line',
      title: 'Market Analyst',
      description: 'Leverage our market analysis agent to gain actionable insights and forecasts based on real-time market data.',
      features: [
        'Trend forecasting',
        'Competitive analysis',
        'Investment recommendations',
        'Industry reports'
      ],
      color: 'purple'
    },
    {
      icon: 'fa-comments',
      title: 'Customer Support Bot',
      description: 'Deploy our intelligent virtual assistant to handle customer inquiries, resolve issues, and enhance customer satisfaction.',
      features: [
        '24/7 automated support',
        'Multi-language capabilities',
        'Ticket creation & routing',
        'Personalized responses'
      ],
      color: 'green'
    },
    {
      icon: 'fa-code',
      title: 'Code Assistant',
      description: 'Boost your development team with our AI coding assistant to generate code, debug issues, and improve code quality.',
      features: [
        'Code generation',
        'Bug detection',
        'Code optimization',
        'Documentation assistance'
      ],
      color: 'indigo'
    },
    {
      icon: 'fa-language',
      title: 'Language Translator',
      description: 'Access our advanced translation agent for accurately translating content while preserving context, tone, and cultural nuances.',
      features: [
        'Real-time translation',
        'Document translation',
        'Cultural adaptation',
        '100+ languages supported'
      ],
      color: 'orange'
    },
    {
      icon: 'fa-tasks',
      title: 'Project Manager',
      description: 'Optimize your workflow with our AI project management assistant to track progress, identify issues, and meet deadlines.',
      features: [
        'Task scheduling',
        'Resource allocation',
        'Progress monitoring',
        'Risk identification'
      ],
      color: 'red'
    },
    {
      icon: 'fa-images',
      title: 'Visual Designer',
      description: 'Create professional visual assets with our AI design agent that generates images and graphics based on your requirements.',
      features: [
        'Image generation',
        'Design customization',
        'Style adaptation',
        'Brand consistency'
      ],
      color: 'pink'
    },
    {
      icon: 'fa-file-alt',
      title: 'Resume ATS Optimizer',
      description: 'Improve your resume\'s performance through our ATS Optimizer agent, designed to increase visibility with hiring managers.',
      features: [
        'Keyword optimization',
        'Format customization',
        'ATS compatibility check',
        'Industry-specific recommendations'
      ],
      color: 'teal'
    }
  ];

  return (
    <section id="ai-agents" className="py-5 agents-section" ref={agentContainerRef} style={{ overflow: 'visible' }}>
      <div className="section-background">
        <div className="gradient-sphere gradient-sphere-purple" style={{ top: '-100px', right: '10%' }}></div>
        <div className="gradient-sphere gradient-sphere-green" style={{ bottom: '5%', left: '-100px' }}></div>
        <div className="gradient-sphere gradient-sphere-blue" style={{ bottom: '40%', right: '20%' }}></div>
      </div>
      
      <div className="container position-relative section-content" style={{ overflow: 'visible' }}>
        <div className="text-center mb-5 reveal-text">
          <span className="orbit-badge mb-3">Our AI Solutions</span>
          <h2 className="display-4 fw-bold mb-3 gradient-heading">AI Agents</h2>
          <p className="lead text-muted">
            Discover our marketplace of powerful AI agents ready to be deployed for your business needs
          </p>
        </div>
        
        <div className="row g-4 justify-content-center" style={{ padding: '5px', overflow: 'visible' }}>
          {aiAgents.map((agent, index) => (
            <div 
              key={index} 
              className="col-md-6 col-lg-4 mb-4"
              style={{ padding: '10px', overflow: 'visible' }}
            >
              <div 
                className={`modern-agent-card ${agent.color} ${isVisible ? 'fade-in' : ''}`} 
                style={{'--animation-order': index}}
              >
                <div className="agent-glow"></div>
                <div className="agent-icon-container">
                  <div className="agent-icon-wrapper">
                    <i className={`fas ${agent.icon}`}></i>
                  </div>
                </div>
                
                <div className="agent-content">
                  <h3 className="agent-title">{agent.title}</h3>
                  <p className="agent-description">{agent.description}</p>
                  
                  <h4 className="agent-subtitle">Features</h4>
                  <ul className="agent-features">
                    {agent.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="check-icon-container">
                          <i className="fas fa-check-circle"></i>
                        </span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center mt-4">
                    <button 
                      className="btn btn-primary btn-glow action-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAgentClick && onAgentClick(agent.title);
                      }}
                    >
                      <span>Try Agent</span>
                      <i className="fas fa-rocket ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAgentServices;
