import { useState, useEffect, useRef } from 'react';
import './ResearchAssistant.css';
// Import ReactMarkdown for rendering markdown content
// Note: You need to install it with: npm install react-markdown
import ReactMarkdown from 'react-markdown';

// API base URL for the Research Assistant
const API_BASE_URL = 'https://researchagent-h71u.onrender.com';

const INITIAL_SYSTEM_MESSAGE = {
  id: 1,
  role: 'assistant',
  content:
    "Hello! I'm your Research Assistant AI.\nHow can I help you with your research today?"
};

const SUGGESTIONS = [
  'AI in healthcare',
  'Renewable energy advances',
  'Climate change mitigation',
  'Quantum computing applications',
  'Blockchain technology',
  'Machine learning ethics'
];

export default function ResearchAssistant() {
  // Create initial messages that will force scrolling
  const initialMessages = [
    INITIAL_SYSTEM_MESSAGE,
    // Add empty hidden messages to force scrollbar to appear
    ...Array(10).fill(0).map((_, i) => ({
      id: 1000 + i,
      role: 'hidden',
      content: ''
    }))
  ];
  
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [error, setError] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  /** Scroll to latest message */
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Force a second scroll after a slight delay (helps with some browsers)
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [messages, loading]);

  /** Focus input on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch API status on component mount
  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api-status`);
        if (!response.ok) throw new Error('Failed to fetch API status');
        const data = await response.json();
        setApiStatus(data);
      } catch (err) {
        console.error('Error fetching API status:', err);
        setError('Could not connect to Research Assistant API');
      }
    };
    
    fetchApiStatus();
  }, []);

  /* ------------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: draft };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: draft,
          conversation_id: conversationId,
          model: 'openai' // Default to OpenAI, could be made configurable
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Research Assistant');
      }

      const data = await response.json();
      
      // Save conversation ID for continuing the conversation
      if (data.conversation_id && !conversationId) {
        setConversationId(data.conversation_id);
      }

      // Extract assistant's message from the response
      const lastMessage = data.messages ? 
        data.messages[data.messages.length - 1] : 
        { role: 'assistant', content: 'I received your message but encountered an issue processing it.' };
      
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: lastMessage.content
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error communicating with Research Assistant:', err);
      setError('Failed to communicate with the Research Assistant. Please try again.');
      
      // Add error message to chat
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === 'Escape') setDraft('');
  };

  // Function to handle navigation back
  const handleGoBack = () => {
    // Use window.history to navigate back
    window.history.back();
  };

  return (
    <section className="ra__page">
      <div className="ra__card">
        <div className="ra__header">
          <button onClick={handleGoBack} className="ra__back-button">
            <i className="fas fa-arrow-left"></i>
            <span>Back</span>
          </button>
        </div>
        {error && (
          <div className="ra__error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        
        {/* ------------- message list ------------- */}
        <div className="ra__messages" ref={messagesContainerRef}>
          {messages.map(m => (
            <MessageBubble key={m.id} {...m} />
          ))}
          {loading && <TypingBubble />}
          <div ref={endRef} />
        </div>

        {/* ------------- input ------------- */}
        <form className="ra__inputBar" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="ra__input"
            placeholder="Ask me to research a topic…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="ra__sendBtn" type="submit" aria-label="Send">
            <i className="fas fa-paper-plane" />
          </button>
        </form>

        {/* ------------- suggested chips ------------- */}
        <div className="ra__chips">
          {SUGGESTIONS.map(t => (
            <button
              key={t}
              type="button"
              className="ra__chip"
              onClick={() => setDraft(`I need research on ${t}`)}
            >
              <i className="fas fa-lightbulb" />
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* --------------- tiny presentational helpers ---------------------- */
function MessageBubble({ role, content }) {
  // Handle hidden messages (used to force scrollbar)
  if (role === 'hidden') {
    return <div className="ra__row isHidden"></div>;
  }
  
  const isUser = role === 'user';
  
  return (
    <div className={`ra__row ${isUser ? 'isUser' : 'isBot'}`}>
      {!isUser && (
        <span className="ra__avatar">
          <i className="fas fa-search" />
        </span>
      )}
      <div className={`ra__bubble ${isUser ? 'userBubble' : 'botBubble'}`}>
        {isUser ? (
          // For user messages, simple text display
          <p>{content}</p>
        ) : (
          // For bot messages, render markdown
          <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="ra__row isBot">
      <span className="ra__avatar">
        <i className="fas fa-search" />
      </span>
      <div className="ra__bubble botBubble">
        <span className="ra__dots">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
  );
}