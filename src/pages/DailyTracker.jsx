import React, { useState } from 'react';
import Card from '../components/Card';
import { BookOpen, Target, FileText, Star, BrainCircuit, Activity } from 'lucide-react';
import './DailyTracker.css';

const DailyTracker = () => {
  const [formData, setFormData] = useState({
    theory: false,
    dpp: '',
    practiceSheets: '',
    pyqs: '',
    formulas: false,
    rating: 3,
    testAttempted: false,
    testName: '',
    testScore: '',
    testAccuracy: '',
    mistakes: '',
    improvement: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const Toggle = ({ name, label }) => (
    <div className="form-group-inline">
      <span className="form-label">{label}</span>
      <label className="toggle-switch">
        <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} />
        <span className="slider-round"></span>
      </label>
    </div>
  );

  return (
    <div className="app-container">
      <div className="tracker-header">
        <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Daily Log 📔</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Record your progress to build consistency. 🚀</p>
      </div>

      <div className="tracker-container">
        {/* Core Tasks */}
        <Card title="Core Execution 🎯" icon={Target}>
          <Toggle name="theory" label="Theory Revised 📖" />
          <Toggle name="formulas" label="Formula Revision 🧪" />
          
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">DPPs Solved (Count/Subject)</label>
            <input type="text" name="dpp" placeholder="e.g. Physics 1, Math 2" value={formData.dpp} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Practice Sheets Attempted</label>
            <input type="number" name="practiceSheets" placeholder="0" value={formData.practiceSheets} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="form-label">PYQs Practiced</label>
            <input type="number" name="pyqs" placeholder="0" value={formData.pyqs} onChange={handleChange} />
          </div>
        </Card>

        {/* Mock Test */}
        <Card title="Mock Test 📝" icon={Activity}>
          <Toggle name="testAttempted" label="Did you attempt a test today? 🤔" />
          
          {formData.testAttempted && (
            <div className="test-fields">
              <div className="form-group">
                <label className="form-label">Test Name</label>
                <input type="text" name="testName" placeholder="e.g. AITS Part 1" value={formData.testName} onChange={handleChange} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Score</label>
                  <input type="number" name="testScore" placeholder="e.g. 180" value={formData.testScore} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Accuracy (%)</label>
                  <input type="number" name="testAccuracy" placeholder="e.g. 85" value={formData.testAccuracy} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Reflection */}
        <Card title="Reflection 🧠" icon={BrainCircuit}>
          <div className="form-group">
            <label className="form-label">Study Rating ⭐</label>
            <div style={{ padding: '0.5rem 0' }}>
              <input type="range" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} />
            </div>
            <div className="rating-display">
              {formData.rating} <Star size={20} fill="var(--accent-gold)" color="var(--accent-gold)" style={{ verticalAlign: 'text-bottom' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mistakes Not to Repeat ⚠️</label>
            <textarea name="mistakes" rows="2" placeholder="Silly calculation errors, skipping tough questions..." value={formData.mistakes} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Today's Improvement 📈</label>
            <textarea name="improvement" rows="2" placeholder="I sat for 3 hours straight today." value={formData.improvement} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional) 📝</label>
            <textarea name="notes" rows="2" placeholder="Any additional thoughts..." value={formData.notes} onChange={handleChange}></textarea>
          </div>
        </Card>

        <button onClick={async () => {
          const module = await import('../utils/storage');
          const success = await module.saveDailyLog(formData);
          if(success) {
            alert('Daily log saved successfully! Start your momentum.');
            // Quick refresh hack for demo
            window.location.reload();
          } else {
            alert('Failed to save to Supabase. Make sure you have created the daily_logs table in SQL Editor.');
          }
        }} style={{
          background: 'linear-gradient(135deg, var(--accent-neon), var(--accent-blue))', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: 'var(--border-radius-md)', 
          fontWeight: 700,
          fontSize: '1.125rem',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
          marginTop: '0.5rem',
          cursor: 'pointer'
        }}>
          Save Daily Log
        </button>
      </div>

      <RecentLogs />
      <Footer />
    </div>
  );
};

const RecentLogs = () => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    const fetchLogs = async () => {
      const module = await import('../utils/storage');
      const data = await module.getDailyLogs();
      setLogs(data); // data is already descending from Supabase order
    };
    fetchLogs();
  }, []);

  if (logs.length === 0) {
    return (
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Past Logs ⏳</h3>
        <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>You haven't saved any daily logs yet.</p>
          <p style={{ marginTop: '0.5rem', color: 'var(--accent-neon)' }}>Start your journey today! 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Past Logs ⏳</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {logs.map((log, idx) => (
          <div key={idx} className="glass" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--accent-neon)' }}>{log.date}</span>
              <span style={{ color: 'var(--accent-gold)' }}>Rating: {log.rating}/5</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              DPPs: {log.dpp || 'None'} <br/>
              Theory Revised: {log.theory ? 'Yes' : 'No'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyTracker;
