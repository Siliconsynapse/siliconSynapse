import React from 'react';

const Logo = ({ size = 'default', className = '', isScrolled = false }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: '0.9rem' };
      case 'large':
        return { width: 60, height: 60, fontSize: '1.5rem' };
      default:
        return { width: 42, height: 42, fontSize: '1.2rem' };
    }
  };

  const dimensions = getSize();
  
  // Determine which logo version to show based on scroll state
  const showCompactLogo = isScrolled || size === 'small';

  return (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <div
        className="logo-icon"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Cursor-inspired Logo */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          
          {/* Main Shape */}
          <path 
            d="M20 20 L80 20 L80 80 L20 80 Z" 
            fill="url(#logoGradient)"
            strokeLinejoin="round"
            className="main-shape"
          />
          
          {/* Cut-out triangle */}
          <path 
            d="M40 50 L60 30 L60 70 Z" 
            fill="#0f172a"
            className="cut-out"
          />
        </svg>
      </div>
      
      {/* Text that shows/hides based on scroll */}
      <div
        style={{
          opacity: showCompactLogo ? 0 : 1,
          maxWidth: showCompactLogo ? 0 : '200px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease'
        }}
      >
        <span
          style={{
            fontSize: dimensions.fontSize,
            fontWeight: '600',
            background: 'linear-gradient(to right, #3b82f6, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}
        >
          SiliconSynapse
        </span>
      </div>
      
      <style>
        {`
          .logo-icon:hover .main-shape {
            filter: brightness(1.1);
          }
          
          .logo-icon:hover .cut-out {
            transform: scale(1.05);
            transform-origin: center;
            transition: transform 0.3s ease;
          }
          
          @media (max-width: 768px) {
            .logo-container > div:last-child {
              opacity: 0;
              max-width: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Logo; 