import React from 'react';

const Footer = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem 1rem 4rem 1rem', // Extra bottom padding to clear the BottomNav
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      opacity: 0.8,
      marginTop: 'auto'
    }}>
      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Developed by Anurag 💻</p>
      <p>Want to develop a premium website?</p>
      <p>Contact: <a href="mailto:anuragkumar36474@gmail.com" style={{ color: 'var(--accent-neon)', textDecoration: 'none' }}>anuragkumar36474@gmail.com</a></p>
    </div>
  );
};

export default Footer;
