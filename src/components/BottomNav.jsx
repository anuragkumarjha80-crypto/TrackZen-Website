import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, BarChart2, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Tracker', icon: Home },
    { path: '/classes', label: 'Classes', icon: Compass },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-nav-container">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `bottom-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="bottom-nav-icon" />
            <span>{item.label}</span>
            <div className="active-indicator" />
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
