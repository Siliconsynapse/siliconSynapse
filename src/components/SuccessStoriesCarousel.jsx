import { useState, useEffect, useRef } from 'react';

const stories = [
  {
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'John Carter',
    company: 'TechNova',
    testimonial: 'SiliconSynapse delivered our AI project on time and exceeded expectations. Our efficiency improved by 40%!',
    stats: 'Efficiency +40%'
  },
  {
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Priya Singh',
    company: 'RetailX',
    testimonial: 'The MCP integration was seamless. Our systems now talk to each other and our team is happier than ever.',
    stats: 'Downtime -90%'
  },
  {
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'Alex Kim',
    company: 'FinEdge',
    testimonial: 'Web development with SiliconSynapse was a breeze. Our new site loads in under a second!',
    stats: 'Load Time <1s'
  }
];

const SuccessStoriesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + stories.length) % stories.length);
  const next = () => setCurrent((prev) => (prev + 1) % stories.length);

  return (
    <section className="py-5" style={{ background: 'rgba(15,23,42,0.97)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#3b82f6' }}>Success Stories</h2>
          <p className="lead text-muted">See how we've helped clients achieve amazing results</p>
        </div>
        <div className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: 320 }}>
          {/* Carousel Slide */}
          <div className="carousel-slide p-4 rounded-4 shadow-lg fade-in" style={{ background: 'rgba(30,41,59,0.95)', maxWidth: 540, width: '100%', minHeight: 260, transition: 'all 0.5s' }}>
            <div className="d-flex align-items-center mb-3">
              <img src={stories[current].image} alt={stories[current].name} className="rounded-circle me-3" width={64} height={64} style={{ border: '3px solid #3b82f6' }} />
              <div>
                <h4 className="mb-0" style={{ color: '#e2e8f0' }}>{stories[current].name}</h4>
                <div className="text-primary small fw-semibold">{stories[current].company}</div>
              </div>
            </div>
            <p className="mb-3" style={{ color: '#cbd5e1', fontSize: 18, fontStyle: 'italic' }}>
              <i className="fas fa-quote-left me-2 text-primary"></i>
              {stories[current].testimonial}
            </p>
            <div className="d-flex align-items-center gap-2 mt-2">
              <i className="fas fa-chart-line text-success"></i>
              <span className="fw-bold text-success">{stories[current].stats}</span>
            </div>
          </div>
          {/* Navigation */}
          <button className="btn btn-outline-light position-absolute top-50 start-0 translate-middle-y" style={{ zIndex: 2 }} onClick={prev} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y" style={{ zIndex: 2 }} onClick={next} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        {/* Dots */}
        <div className="d-flex justify-content-center mt-4 gap-2">
          {stories.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${current === idx ? 'active' : ''}`}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: current === idx ? 'linear-gradient(45deg, #3b82f6, #10b981)' : '#334155',
                border: 'none',
                transition: 'background 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => goTo(idx)}
              aria-label={`Go to story ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel; 