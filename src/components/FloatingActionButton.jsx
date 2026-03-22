import React from 'react';
import { Plus } from 'lucide-react';
import './FloatingActionButton.css';

const FloatingActionButton = ({ onClick }) => {
  return (
    <div className="fab-container">
      <button className="fab-button" onClick={onClick} aria-label="Quick Add">
        <Plus className="fab-icon" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
