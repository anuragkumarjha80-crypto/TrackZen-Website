import React from 'react';
import './Card.css';

const Card = ({ title, icon: Icon, children, className = '' }) => {
  return (
    <div className={`zen-card ${className}`}>
      {title && (
        <h3 className="zen-card-title">
          {Icon && <Icon size={20} className="text-gradient" style={{color: 'var(--accent-neon)'}} />}
          {title}
        </h3>
      )}
      <div className="zen-card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
