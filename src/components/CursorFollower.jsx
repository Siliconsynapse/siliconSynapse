import React, { useState, useEffect, useRef } from 'react';

const icons = [
  'fa-react',
  'fa-node-js',
  'fa-python',
  'fa-aws',
  'fa-docker',
  'fa-brain',
  'fa-leaf',
  'fa-network-wired',
  'fa-robot',
];

function getRandomColor() {
  const colors = [
    '#3b82f6', // Primary blue
    '#10b981', // Primary green
    '#f8fafc', // Light text
    '#60a5fa', // Light blue
    '#34d399', // Light green
    '#ff9900', // AWS orange
    '#ffd43b', // Python yellow
    '#2496ed', // Docker blue
    '#ff6f00', // TensorFlow orange
    '#47a248', // Mongo green
    '#326ce5', // K8s blue
  ];
  if (Math.random() < 0.7) {
    return colors[Math.floor(Math.random() * colors.length)];
  } else {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  }
}

const CursorFollower = () => {
  const [positions, setPositions] = useState(
    icons.map((_, index) => ({
      left: 0,
      top: 0,
      delay: index * 0.08,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: getRandomColor(),
    }))
  );

  const animationFrameRef = useRef();
  const mousePositionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastUpdateTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animateIcons = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
      lastUpdateTimeRef.current = currentTime;

      setPositions(prevPositions =>
        prevPositions.map((pos, index) => {
          const distanceFromCursor = 36 + (index * 13); // Increasing distance for each icon
          const angle = (index * (360 / icons.length)) + (currentTime / 40) + (index * 17); // Rotating around cursor

          const targetX = mousePositionRef.current.x + Math.cos(angle * Math.PI / 180) * distanceFromCursor;
          const targetY = mousePositionRef.current.y + Math.sin(angle * Math.PI / 180) * distanceFromCursor;

          // Smooth follow with delay based on index
          const followSpeed = 3 - (pos.delay * 2);

          const newLeft = pos.left + (targetX - pos.left) * followSpeed * deltaTime;
          const newTop = pos.top + (targetY - pos.top) * followSpeed * deltaTime;

          // Slowly rotate the icon
          const newRotation = pos.rotation + (deltaTime * 30 * (index % 2 === 0 ? 1 : -1));

          return {
            ...pos,
            left: newLeft,
            top: newTop,
            rotation: newRotation,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animateIcons);
    };

    animationFrameRef.current = requestAnimationFrame(animateIcons);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [icons.length]);

  return (
    <div className="cursor-followers-container">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="cursor-follower-icon"
          style={{
            left: `${pos.left}px`,
            top: `${pos.top}px`,
            transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
            color: pos.color,
            transition: 'color 2s ease',
            position: 'fixed',
            zIndex: 9999,
            pointerEvents: 'none',
            opacity: 0.7,
            textShadow: '0 0 5px rgba(0,0,0,0.3)',
          }}
        >
          <i className={`fab ${icons[index]}`}></i>
        </div>
      ))}
      <style>{`
        .cursor-followers-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        .cursor-follower-icon {
          position: fixed;
          font-size: 1.5rem;
          transform-origin: center;
          will-change: transform, left, top;
          filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
          transition: color 3s ease;
        }
        .cursor-follower-icon i {
          display: block;
        }
        @media (max-width: 768px) {
          .cursor-followers-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CursorFollower; 