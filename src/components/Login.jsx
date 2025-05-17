import { useState } from 'react';

const Login = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Simulate authentication
    setTimeout(() => {
      onAuth(true);
    }, 500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow-lg" style={{ minWidth: 350, background: 'rgba(30,41,59,0.95)', borderRadius: 16 }}>
        <h2 className="mb-3 text-center fw-bold" style={{ color: '#3b82f6' }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control custom-input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control custom-input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger py-1 px-2 mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100 mb-2">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <div className="text-center">
          <button className="btn btn-link text-primary p-0" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 