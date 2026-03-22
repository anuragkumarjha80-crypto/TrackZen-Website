import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './utils/supabase'
import BottomNav from './components/BottomNav'
import FloatingActionButton from './components/FloatingActionButton'
import DailyTracker from './pages/DailyTracker'
import ClassTracker from './pages/ClassTracker'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore existing session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary, #0f172a)',
        color: 'white',
        fontSize: '1.25rem',
        fontFamily: 'inherit'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40,
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid var(--accent-neon, #10b981)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          Loading...
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DailyTracker />} />
        <Route path="/classes" element={<ClassTracker />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <FloatingActionButton onClick={() => console.log('Action')} />
      <Footer />
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
