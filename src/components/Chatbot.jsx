import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

// Bot avatar as an inline SVG component
const BotAvatar = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Robot head - rounded square */}
    <rect width="40" height="40" rx="12" fill="#1E3A8A" x="5" y="2" />
    
    {/* Robot face - lighter blue */}
    <rect x="8" y="10" width="34" height="24" rx="10" fill="#3B82F6" />
    
    {/* Robot eyes - cute and friendly */}
    <circle cx="17" cy="20" r="4" fill="white" />
    <circle cx="33" cy="20" r="4" fill="white" />
    <circle cx="17" cy="19" r="2" fill="#111827" />
    <circle cx="33" cy="19" r="2" fill="#111827" />
    
    {/* Cute smile */}
    <path d="M17 30 Q25 35 33 30" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    
    {/* Antenna with heart shape */}
    <rect x="23" y="1" width="4" height="6" rx="2" fill="#10B981" />
    <circle cx="25" cy="0" r="3" fill="#F472B6" />
    
    {/* Robot ears/side parts */}
    <rect x="1" y="15" width="4" height="12" rx="2" fill="#3B82F6" />
    <rect x="45" y="15" width="4" height="12" rx="2" fill="#3B82F6" />
    
    {/* Bottom indicator lights - cute detail */}
    <circle cx="18" cy="40" r="2" fill="#10B981" />
    <circle cx="25" cy="40" r="2" fill="#F472B6" />
    <circle cx="32" cy="40" r="2" fill="#10B981" />
  </svg>
);

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
  
  // Keep track of conversation history for the API
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Update conversation history when messages change
  useEffect(() => {
    // Convert our UI messages to the format needed for the API
    const apiMessages = messages.map(msg => ({
      role: msg.from === 'user' ? 'user' : 'agent',
      content: msg.text
    }));
    
    setConversationHistory(apiMessages);
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    
    // Update UI with user message
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTyping(true);
    
    // Convert current messages to API format (excluding the message we just added)
    const currentHistory = messages.map(msg => ({
      role: msg.from === 'user' ? 'user' : 'agent',
      content: msg.text
    }));
    
    try {
      // Call the API service with the current message and conversation history
      const botResponse = await sendChatMessage(input, currentHistory);
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: botResponse }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: "Sorry, I'm having trouble responding right now. Please try again later." }
      ]);
    } finally {
      setTyping(false);
    }
  };

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
              background: '#111827',
              border: 'none',
              borderRadius: '50%',
              width: 70,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
              padding: '0'
            }}
            onClick={() => setOpen(true)}
            aria-label="Open AI Assistant chatbot"
          >
            <div style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}>
              <BotAvatar size={48} />
            </div>
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
            background: 'rgba(17,24,39,0.95)'
          }}>
            <span className="fw-bold" style={{ 
              color: 'white',
              display: 'flex',
              alignItems: 'center', 
              gap: '10px'
            }}>
              <BotAvatar size={26} />
              AI Assistant
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
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '1rem', 
            background: 'rgba(30,41,59,0.95)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#3b82f6 rgba(255,255,255,0.1)',
            minHeight: '300px',
            maxHeight: '60vh'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 12,
                animation: 'fadeIn 0.3s ease'
              }}>
                {msg.from === 'bot' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    marginRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-end'
                  }}>
                    <BotAvatar size={30} />
                  </div>
                )}
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
                  width: '30px',
                  height: '30px',
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end'
                }}>
                  <BotAvatar size={30} />
                </div>
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
              <i className="fas fa-paper-plane"></i>
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