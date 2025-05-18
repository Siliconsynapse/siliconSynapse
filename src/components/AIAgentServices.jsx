import { useState, useEffect, useRef } from 'react';
import './AIAgentCards.css';

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

  // Enhanced AI agents with detailed capabilities
  const aiAgents = [
    {
      icon: 'fa-pencil-alt',
      title: 'Content Creator',
      description: 'AI-powered content generator that creates engaging blog posts, articles, and marketing copy tailored to your brand voice.',
      features: [
        'SEO-optimized blog posts',
        'Marketing copy generation',
        'Email campaign content',
        'Social media captions'
      ],
      color: 'blue'
    },
    {
      icon: 'fa-file-alt',
      title: 'Resume ATS Optimizer',
      description: 'Enhance your resume\'s visibility and ranking in Applicant Tracking Systems with our AI-powered optimization tool.',
      features: [
        'Keyword optimization',
        'Format customization',
        'ATS compatibility check',
        'Industry-specific recommendations'
      ],
      color: 'teal'
    },
    {
      icon: 'fa-chart-line',
      title: 'Market Analyst',
      description: 'Advanced market analysis agent that provides actionable insights and forecasts based on real-time market data.',
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
      description: 'Intelligent virtual assistant that handles customer inquiries, resolves common issues, and maintains customer satisfaction.',
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
      description: 'AI coding partner that helps generate code, debug issues, and improve code quality across multiple programming languages.',
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
      description: 'Advanced translation agent that accurately translates content while preserving context, tone, and cultural nuances.',
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
      description: 'AI project management assistant that tracks progress, identifies potential issues, and helps teams meet deadlines.',
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
      description: 'Creative AI agent that generates images, graphics, and visual assets based on your requirements and brand guidelines.',
      features: [
        'Image generation',
        'Design customization',
        'Style adaptation',
        'Brand consistency'
      ],
      color: 'pink'
    },
    {
      icon: 'fa-search',
      title: 'Research Assistant',
      description: 'Comprehensive research agent that gathers, analyzes, and summarizes information from diverse sources on any topic.',
      features: [
        'Literature review',
        'Data gathering',
        'Source verification',
        'Summary generation'
      ],
      color: 'yellow'
    }
  ];

  return (
    <section id="ai-agents" className="py-5 agents-section" ref={agentContainerRef}>
      <div className="container position-relative">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3 gradient-heading">AI Agent Solutions</h2>
          <p className="lead text-muted">
            Discover our specialized AI agents designed to revolutionize your business operations and productivity
          </p>
        </div>
        
        <div className="row g-4 justify-content-center">
          {aiAgents.map((agent, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className={`agent-card ${agent.color} ${isVisible ? 'fade-in' : ''}`} style={{'--animation-order': index}}>
                <div className="agent-card-inner">
                  <div className="agent-card-front">
                    <div className="agent-icon-wrapper">
                      <i className={`fas ${agent.icon}`}></i>
                    </div>
                    <h3 className="agent-title">{agent.title}</h3>
                    <p className="agent-description">{agent.description}</p>
                  </div>
                  <div className="agent-card-back">
                    <h3 className="agent-title">Capabilities</h3>
                    <ul className="agent-features">
                      {agent.features.map((feature, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check-circle me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="btn btn-light agent-btn" 
                      onClick={() => onAgentClick && onAgentClick(agent.title)}
                    >
                      Get Started
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
