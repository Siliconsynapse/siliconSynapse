import { useState, useRef, useEffect } from 'react';

const botGreetings = [
  "Hi there! 👋 How can I help you today?",
  "Welcome to SiliconSynapse! Ask me anything about our services.",
  "Need help? I'm here to assist you!"
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: botGreetings[Math.floor(Math.random() * botGreetings.length)] }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: getBotReply(input) }
      ]);
      setTyping(false);
    }, 1200);
  };

  function getBotReply(userInput) {
    const lower = userInput.toLowerCase();
    if (lower.includes('service') || lower.includes('offer')) return "We offer MCP integration, web development, and AI solutions!";
    if (lower.includes('contact')) return "You can contact us via the form below or email contact@siliconsynapse.com.";
    if (lower.includes('price') || lower.includes('cost')) return "Pricing depends on your needs. Let's discuss your project!";
    if (lower.includes('ai')) return "Our AI solutions automate tasks and enhance decision-making.";
    if (lower.includes('hello') || lower.includes('hi')) return "Hello! How can I assist you today?";
    return "I'm here to help! Ask me anything about our services or company.";
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      <div
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1200,
        }}
      >
        {!open && (
          <button
            className="shadow-lg"
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #10b981)',
              border: 'none',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 40,
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(59,130,246,0.2)'
            }}
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
          >
            <i className="fa-solid fa-robot" style={{color: 'white', fontSize: 40}}></i>
          </button>
        )}
      </div>
      {/* Chatbot Window */}
      {open && (
        <div
          className="shadow-lg fade-in"
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 340,
            maxWidth: '90vw',
            background: 'rgba(15,23,42,0.98)',
            borderRadius: 18,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(59,130,246,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ 
            padding: '1rem', 
            borderBottom: '1px solid rgba(255,255,255,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'rgba(59,130,246,0.1)'
          }}>
            <span className="fw-bold" style={{ color: '#3b82f6' }}>
              <i className="fa-solid fa-robot me-2"></i>SiliconBot
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#cbd5e1', 
                fontSize: 20, 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '4px 8px',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'none'}
              aria-label="Close chatbot"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '1rem', 
            background: 'rgba(30,41,59,0.95)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#3b82f6 rgba(255,255,255,0.1)'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 12,
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  background: msg.from === 'user' ? 'linear-gradient(45deg, #3b82f6, #10b981)' : 'rgba(255,255,255,0.08)',
                  color: msg.from === 'user' ? 'white' : '#cbd5e1',
                  borderRadius: 16,
                  padding: '10px 16px',
                  maxWidth: '80%',
                  fontSize: 15,
                  boxShadow: msg.from === 'user' ? '0 2px 8px rgba(59,130,246,0.2)' : 'none',
                  border: msg.from === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                marginBottom: 12,
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  borderRadius: 16,
                  padding: '10px 16px',
                  fontSize: 15,
                  fontStyle: 'italic',
                  maxWidth: '80%',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span className="typing-dots">Typing</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
          <form onSubmit={handleSend} style={{ 
            display: 'flex', 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            background: 'rgba(15,23,42,0.98)',
            borderRadius: '0 0 18px 18px',
            padding: '12px',
            gap: '8px'
          }}>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ 
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#e2e8f0',
                borderRadius: '12px',
                padding: '10px 16px'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                borderRadius: '12px',
                padding: '10px 16px',
                background: 'linear-gradient(45deg, #3b82f6, #10b981)',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
      <style>{`
        .typing-dots::after {
          content: '...';
          animation: blink 1.5s steps(4) infinite;
        }
        @keyframes blink {
          0% { content: '.'; }
          25% { content: '..'; }
          50% { content: '...'; }
          75% { content: '....'; }
          100% { content: '.'; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Chatbot; 