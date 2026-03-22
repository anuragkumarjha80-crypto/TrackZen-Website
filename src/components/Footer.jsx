import React from 'react';

const Footer = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem 1rem',
      paddingBottom: '6rem', // clear bottom nav
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      marginTop: 'auto'
    }}>
      <div className="glass" style={{ padding: '1rem', display: 'inline-block', borderRadius: 'var(--border-radius-md)' }}>
        <p style={{ marginBottom: '0.25rem' }}>
          Developed by <span style={{ color: 'var(--accent-neon)', fontWeight: 'bold' }}>Anurag Kumar</span>
        </p>
        <p>
          Contact to develop a website: <br/>
          <a href="mailto:insecurebeings@gmail.com" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>insecurebeings@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
