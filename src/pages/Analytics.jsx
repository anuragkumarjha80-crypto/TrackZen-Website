import React from 'react';
import Card from '../components/Card';
import { Flame, TrendingUp, Award, Calendar, BarChart as BarChartIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';

const dummyData = [
  { day: 'Mon', hours: 2.5, rating: 3 },
  { day: 'Tue', hours: 3.8, rating: 4 },
  { day: 'Wed', hours: 4.2, rating: 4 },
  { day: 'Thu', hours: 3.0, rating: 3 },
  { day: 'Fri', hours: 5.1, rating: 5 },
  { day: 'Sat', hours: 6.5, rating: 5 },
  { day: 'Sun', hours: 4.8, rating: 4 },
];

const Analytics = () => {
  return (
    <div className="app-container">
      <div className="tracker-header">
        <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Analytics 📊</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Visualize your journey to the top. 🏔️</p>
      </div>

      {/* Streak and Summary metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div className="glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Flame size={32} color="var(--accent-danger)" style={{ marginBottom: '0.5rem', filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>12 Days</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Streak</span>
        </div>
        <div className="glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Award size={32} color="var(--accent-gold)" style={{ marginBottom: '0.5rem', filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Top 5%</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Accuracy Rank</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass" style={{ padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Avg Study Rating</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-neon)' }}>4.2 / 5</span>
        </div>
        <div className="glass" style={{ padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Total Tests</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-blue)' }}>8 Taken</span>
        </div>
      </div>

      <Card title="Study Consistency 📈" icon={TrendingUp} className="mb-4">
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Hours studied per day (This Week)</p>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dummyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-neon)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent-neon)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'white' }}
                itemStyle={{ color: 'var(--accent-neon)' }}
              />
              <Area type="monotone" dataKey="hours" stroke="var(--accent-neon)" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Calendar Heatmap 🔥" icon={Calendar}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          {/* Simple simulated heatmap using colored dots */}
          {Array.from({ length: 28 }).map((_, i) => {
            const intensity = Math.random();
            let color = 'rgba(255, 255, 255, 0.05)';
            if (intensity > 0.8) color = 'var(--accent-neon)';
            else if (intensity > 0.5) color = 'rgba(16, 185, 129, 0.6)';
            else if (intensity > 0.2) color = 'rgba(16, 185, 129, 0.3)';
            
            return (
              <div key={i} style={{
                width: '12px', height: '12px', borderRadius: '3px',
                backgroundColor: color,
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} title={`Day ${i+1}`} />
            )
          })}
        </div>
      </Card>
      
      <Footer />
    </div>
  );
};

export default Analytics;
