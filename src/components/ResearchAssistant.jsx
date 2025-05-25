import { useState, useEffect, useRef } from 'react';
import './ResearchAssistant.css';

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
  const [messages, setMessages] = useState([INITIAL_SYSTEM_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  /** Scroll to latest message */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /** Focus input on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* ------------------------------------------------------------------ */
  const handleSubmit = e => {
    e.preventDefault();
    if (!draft.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: draft };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');
    setLoading(true);

    /* Simulate network call */
    setTimeout(() => {
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I'll research “${draft}” for you.\n\nBased on the latest academic literature:\n• The topic has seen significant development in recent years.\n• Key innovations include advanced methodologies and cross-disciplinary approaches.\n• Current challenges remain in implementation and scaling.\n\nWould you like me to provide more specific information about any aspect?`
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 1500);
  };

  const handleKey = e => {
    if (e.key === 'Escape') setDraft('');
  };

  return (
    <section className="ra__page">
      <div className="ra__card">
        {/* ------------- message list ------------- */}
        <div className="ra__messages">
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
  const isUser = role === 'user';
  /* convert line-breaks to <br> for basic formatting */
  const html = content.replace(/\n/g, '<br>');
  return (
    <div className={`ra__row ${isUser ? 'isUser' : 'isBot'}`}>
      {!isUser && (
        <span className="ra__avatar">
          <i className="fas fa-search" />
        </span>
      )}
      <p
        className={`ra__bubble ${isUser ? 'userBubble' : 'botBubble'}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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