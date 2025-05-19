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
        {/* Brain Circuit Logo SVG */}
        <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="256" cy="256" r="240" fill="url(#gradient-bg)" />
          <g filter="url(#glow)">
            <path d="M256 120C256 120 320 160 320 256C320 352 256 392 256 392" stroke="white" strokeWidth="16" strokeLinecap="round"/>
            <path d="M192 160C192 160 224 200 224 256C224 312 192 352 192 352" stroke="white" strokeWidth="16" strokeLinecap="round"/>
            <path d="M320 160C320 160 288 200 288 256C288 312 320 352 320 352" stroke="white" strokeWidth="16" strokeLinecap="round"/>
            <circle cx="256" cy="256" r="24" fill="white"/>
            <circle cx="224" cy="256" r="16" fill="white"/>
            <circle cx="288" cy="256" r="16" fill="white"/>
            <circle cx="256" cy="120" r="16" fill="white"/>
            <circle cx="256" cy="392" r="16" fill="white"/>
            <circle cx="192" cy="160" r="16" fill="white"/>
            <circle cx="192" cy="352" r="16" fill="white"/>
            <circle cx="320" cy="160" r="16" fill="white"/>
            <circle cx="320" cy="352" r="16" fill="white"/>
          </g>
          <defs>
            <linearGradient id="gradient-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#10B981"/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
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
          .logo-icon:hover svg circle {
            filter: brightness(1.1);
          }
          .logo-icon:hover svg g {
            filter: drop-shadow(0 0 8px #3b82f6);
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