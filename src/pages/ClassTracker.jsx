import React, { useState } from 'react';
import Card from '../components/Card';
import { BookOpen, Video, CheckCircle, Clock } from 'lucide-react';

const ClassTracker = () => {
  const [classes, setClasses] = useState([]);

  const [newClass, setNewClass] = useState({
    subject: '',
    type: 'Live',
    duration: '',
    status: 'Pending'
  });

  const handleAddClass = (e) => {
    e.preventDefault();
    if(newClass.subject) {
      setClasses([...classes, { ...newClass, id: Date.now() }]);
      setNewClass({ subject: '', type: 'Live', duration: '', status: 'Pending' });
    }
  };

  return (
    <div className="app-container">
      <div className="tracker-header">
        <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Class Tracker 🏫</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Log your lectures and stay on schedule. 📅</p>
      </div>

      <Card title="Log New Class ✏️" icon={BookOpen} className="mb-4">
        <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Subject</label>
            <input type="text" placeholder="e.g. Organic Chemistry" value={newClass.subject} onChange={(e) => setNewClass({...newClass, subject: e.target.value})} required />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label">Type</label>
              <select value={newClass.type} onChange={(e) => setNewClass({...newClass, type: e.target.value})}>
                <option value="Live">Live</option>
                <option value="Recorded">Recorded</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label">Duration</label>
              <input type="text" placeholder="e.g. 2 hrs" value={newClass.duration} onChange={(e) => setNewClass({...newClass, duration: e.target.value})} />
            </div>
          </div>
          
          <button type="submit" style={{
            background: 'var(--accent-blue)', 
            color: 'white', 
            padding: '0.75rem', 
            borderRadius: 'var(--border-radius-sm)', 
            fontWeight: 600,
            marginTop: '0.5rem'
          }}>
            Add Class
          </button>
        </form>
      </Card>

      <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.125rem', color: 'var(--text-primary)' }}>Today's Classes 📚</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '2rem' }}>
        {classes.map(cls => (
          <div key={cls.id} className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{cls.subject}</h4>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Video size={14} /> {cls.type}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {cls.duration}</span>
              </div>
            </div>
            <div>
              {cls.status === 'Completed' ? 
                <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                  <CheckCircle size={24} color="var(--accent-neon)" /> 
                  <button onClick={() => setClasses(classes.filter(c => c.id !== cls.id))} style={{ background: 'transparent', color: 'var(--accent-danger)', padding: 0, border: 'none', cursor: 'pointer' }}>🗑️</button>
                </div> : 
                <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                  <button onClick={() => setClasses(classes.map(c => c.id === cls.id ? {...c, status: 'Completed'} : c))} 
                    style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-full)', color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Mark Done
                  </button>
                  <button onClick={() => setClasses(classes.filter(c => c.id !== cls.id))} style={{ background: 'transparent', color: 'var(--accent-danger)', padding: 0, border: 'none', cursor: 'pointer' }}>🗑️</button>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassTracker;
