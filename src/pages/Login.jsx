import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e, isSignUp) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // For demonstration, we allow simulation if Supabase is not configured yet.
      if (supabase.supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
        setTimeout(() => {
          onLogin({ id: 1, email });
          setLoading(false);
        }, 800);
        return;
      }

      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      const { data, error: authError } = result;

      if (authError) throw authError;

      if (data.user) {
        onLogin(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 0 }}>
      <div className="glass" style={{ width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Strevix</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Log in to continue your journey.</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email</label>
            <input 
              type="email" 
              placeholder="student@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {error && <div style={{ color: 'var(--accent-danger)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              onClick={(e) => handleAuth(e, false)}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, var(--accent-neon), var(--accent-blue))',
                color: 'white',
                padding: '0.875rem',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: 600,
                flex: 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              Log In
            </button>
            <button 
              onClick={(e) => handleAuth(e, true)}
              disabled={loading}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '0.875rem',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: 600,
                flex: 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
