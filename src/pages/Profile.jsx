import React, { useState } from 'react';
import Card from '../components/Card';
import { User, Shield, GraduationCap } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Student',
    exam: 'JEE',
    platform: 'PW'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Real implementation would save to Context/Storage here
  };

  return (
    <div className="app-container">
      <div className="tracker-header">
        <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Profile View 👤</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Configure your identity and goals. 🎯</p>
      </div>

      <Card title="Student Identity 🎓" icon={User}>
        {isEditing ? (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Target Exam</label>
              <select value={profile.exam} onChange={(e) => setProfile({...profile, exam: e.target.value})}>
                <option value="JEE">JEE Main & Adv</option>
                <option value="NEET">NEET UG</option>
                <option value="UPSC">UPSC CSE</option>
                <option value="School">School / Boards</option>
                <option value="Olympiad">Olympiad</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Primary Coaching Platform</label>
              <select value={profile.platform} onChange={(e) => setProfile({...profile, platform: e.target.value})}>
                <option value="PW">Physics Wallah</option>
                <option value="Unacademy">Unacademy</option>
                <option value="BYJUS">BYJU'S</option>
                <option value="Allen">Allen</option>
                <option value="Self">Self Study</option>
              </select>
            </div>
            <button type="submit" style={{
              background: 'var(--accent-neon)', 
              color: 'black', 
              padding: '0.75rem', 
              borderRadius: 'var(--border-radius-sm)', 
              fontWeight: 600,
              marginTop: '0.5rem'
            }}>
              Save Changes
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: 600 }}>{profile.name}</h3>
                <p style={{ color: 'var(--accent-neon)', fontSize: '0.875rem' }}>Aspirant</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target Exam</span>
                <span style={{ color: 'white', fontWeight: 500 }}>{profile.exam}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Platform</span>
                <span style={{ color: 'white', fontWeight: 500 }}>{profile.platform}</span>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} style={{
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              padding: '0.75rem', 
              borderRadius: 'var(--border-radius-sm)', 
              fontWeight: 500
            }}>
              Edit Profile
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
