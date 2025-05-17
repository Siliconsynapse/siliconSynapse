import { useState, useEffect, useRef } from 'react';

const techs = [
  { name: 'React', icon: 'fab fa-react', color: '#61dafb', info: 'Modern frontend library' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#8cc84b', info: 'Backend JavaScript runtime' },
  { name: 'Python', icon: 'fab fa-python', color: '#ffd43b', info: 'Versatile programming language' },
  { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900', info: 'Cloud infrastructure' },
  { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed', info: 'Containerization platform' },
  { name: 'TensorFlow', icon: 'fas fa-brain', color: '#ff6f00', info: 'Machine learning framework' },
  { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248', info: 'NoSQL database' },
  { name: 'Kubernetes', icon: 'fas fa-network-wired', color: '#326ce5', info: 'Container orchestration' },
  { name: 'OpenAI', icon: 'fas fa-robot', color: '#10b981', info: 'AI and language models' },
];

// Each icon gets a random offset (angle, radius) from the cursor
function getRandomOffsets() {
  return techs.map(() => ({
    angle: Math.random() * 2 * Math.PI,
    radius: 90 + Math.random() * 70 // px, min 90, max 160
  }));
}

const TechStackIconsFloat = ({ style, mouse }) => {
  const [hovered, setHovered] = useState(null);
  const [offsets, setOffsets] = useState(getRandomOffsets());
  const [positions, setPositions] = useState(
    techs.map(() => ({ x: 0, y: 0 }))
  );
  const requestRef = useRef();
  const lastMouse = useRef(mouse);

  // When mouse moves a lot, randomize offsets for more organic effect
  useEffect(() => {
    if (!mouse) return;
    const dx = Math.abs((mouse.x || 0) - (lastMouse.current.x || 0));
    const dy = Math.abs((mouse.y || 0) - (lastMouse.current.y || 0));
    if (dx > 0.03 || dy > 0.03) {
      setOffsets(getRandomOffsets());
    }
    lastMouse.current = mouse;
  }, [mouse]);

  // Animate icons toward their target positions
  useEffect(() => {
    let running = true;
    function animate() {
      setPositions((prev) => {
        // Center: follow mouse or default center
        const cx = mouse && mouse.x != null ? mouse.x : 0.7;
        const cy = mouse && mouse.y != null ? mouse.y : 0.5;
        // Container size (assume 100% of parent, 500px tall)
        const baseX = cx * 1000; // px
        const baseY = cy * 500; // px
        return techs.map((_, i) => {
          // Each icon gets its own random offset
          const { angle, radius } = offsets[i];
          const targetX = baseX + radius * Math.cos(angle);
          const targetY = baseY + radius * Math.sin(angle);
          // Smoothly animate toward target
          const lerp = (a, b, t) => a + (b - a) * 0.18;
          return {
            x: lerp(prev[i].x, targetX, 1),
            y: lerp(prev[i].y, targetY, 1)
          };
        });
      });
      if (running) requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(requestRef.current);
    };
  }, [mouse, offsets]);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', ...style, zIndex: 10 }}>
      {techs.map((tech, i) => (
        <div
          key={tech.name}
          className="float-animation"
          style={{
            position: 'absolute',
            left: positions[i].x,
            top: positions[i].y,
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: hovered === i ? 'linear-gradient(45deg, #3b82f6, #10b981)' : 'rgba(255,255,255,0.07)',
            color: hovered === i ? 'white' : tech.color,
            boxShadow: hovered === i ? '0 4px 16px #10b98155' : '0 2px 8px #0f172a55',
            cursor: 'pointer',
            border: hovered === i ? '2px solid #10b981' : '2px solid transparent',
            transition: 'all 0.2s',
            zIndex: hovered === i ? 2 : 1,
            pointerEvents: 'auto',
            fontSize: 28,
            filter: hovered === i ? 'brightness(1.2)' : 'blur(0px)',
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          title={tech.name}
        >
          <i className={`${tech.icon}`}></i>
          {/* Tooltip */}
          {hovered === i && (
            <div style={{
              position: 'absolute',
              top: 56,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15,23,42,0.98)',
              color: '#e2e8f0',
              padding: '8px 16px',
              borderRadius: 12,
              boxShadow: '0 2px 8px #10b98133',
              whiteSpace: 'nowrap',
              fontSize: 15,
              zIndex: 10
            }}>
              <strong>{tech.name}</strong>: {tech.info}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechStackIconsFloat; 