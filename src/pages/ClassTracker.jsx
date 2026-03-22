import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { BookOpen, Video, CheckCircle, Clock, Calendar } from 'lucide-react';
import { saveClasses, getClasses } from '../utils/storage';

const ClassTracker = () => {
  const [classes, setClasses] = useState([]);

  const [newClass, setNewClass] = useState({
    subject: '',
    type: 'Live',
    duration: '',
    status: 'Pending'
  });

  // Load saved classes on mount
  useEffect(() => {
    const saved = getClasses();
    if (saved && saved.length > 0) {
      setClasses(saved);
    }
  }, []);

  // Persist classes whenever they change
  const updateClasses = (newClasses) => {
    setClasses(newClasses);
    saveClasses(newClasses);
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if(newClass.subject) {
      const classEntry = {
        ...newClass,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
      };
      updateClasses([...classes, classEntry]);
      setNewClass({ subject: '', type: 'Live', duration: '', status: 'Pending' });
    }
  };

  const handleMarkDone = (id) => {
    updateClasses(classes.map(c => c.id === id ? {...c, status: 'Completed'} : c));
  };

  const handleDelete = (id) => {
    updateClasses(classes.filter(c => c.id !== id));
  };

  // Group classes by date
  const groupedClasses = classes.reduce((acc, cls) => {
    const dateKey = cls.date || 'Unknown';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(cls);
    return acc;
  }, {});

  const formatDateLabel = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (dateStr === today) return '📅 Today';
    if (dateStr === yesterday) return '📅 Yesterday';
    // Format as readable date
    try {
      return '📅 ' + new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch {
      return '📅 ' + dateStr;
    }
  };

  // Sort dates descending (most recent first)
  const sortedDates = Object.keys(groupedClasses).sort((a, b) => b.localeCompare(a));

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

      {sortedDates.length > 0 ? (
        sortedDates.map(dateKey => (
          <div key={dateKey} style={{ marginTop: '1rem' }}>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--accent-neon)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {formatDateLabel(dateKey)}
              <span style={{
                fontSize: '0.75rem',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                color: 'var(--accent-neon)'
              }}>
                {groupedClasses[dateKey].length} class{groupedClasses[dateKey].length > 1 ? 'es' : ''}
              </span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {groupedClasses[dateKey].map(cls => (
                <div key={cls.id} className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{cls.subject}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Video size={14} /> {cls.type}</span>
                      {cls.duration && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {cls.duration}</span>}
                    </div>
                  </div>
                  <div>
                    {cls.status === 'Completed' ? 
                      <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                        <CheckCircle size={24} color="var(--accent-neon)" /> 
                        <button onClick={() => handleDelete(cls.id)} style={{ background: 'transparent', color: 'var(--accent-danger)', padding: 0, border: 'none', cursor: 'pointer' }}>🗑️</button>
                      </div> : 
                      <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                        <button onClick={() => handleMarkDone(cls.id)} 
                          style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-full)', color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}>
                          Mark Done
                        </button>
                        <button onClick={() => handleDelete(cls.id)} style={{ background: 'transparent', color: 'var(--accent-danger)', padding: 0, border: 'none', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Your Classes 📚</h3>
          <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>No classes logged yet. Add your first class above! 🚀</p>
          </div>
        </div>
      )}

      <div style={{ paddingBottom: '5rem' }} />
    </div>
  );
};

export default ClassTracker;
