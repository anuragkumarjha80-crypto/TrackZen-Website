import React from 'react';
import Card from '../components/Card';
import { Flame, TrendingUp, Award, Calendar, BarChart as BarChartIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    import('../utils/storage').then(module => {
      module.getDailyLogs().then(data => {
        if (data && data.length > 0) {
          setLogs(data);
        }
      });
    });
  }, []);

  const currentStreak = logs.length;
  const topPercent = logs.length > 5 ? 'Top 5%' : 'Top 50%';
  const avgRating = logs.length > 0 ? (logs.reduce((acc, curr) => acc + (curr.rating || 0), 0) / logs.length).toFixed(1) : '0';
  const totalTasks = logs.filter(l => l.pyqs || l.practiceSheets || l.theory).length;

  const chartData = logs.length > 0 ? [...logs].reverse().slice(-7).map(log => ({
    day: log.date.slice(5),
    hours: (log.practiceSheets || 0) * 0.5 + (log.theory ? 1.5 : 0),
    rating: log.rating || 0
  })) : [{ day: 'Empty', hours: 0, rating: 0 }];
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
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{currentStreak} Days</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Streak</span>
        </div>
        <div className="glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Award size={32} color="var(--accent-gold)" style={{ marginBottom: '0.5rem', filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{topPercent}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Accuracy Rank</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass" style={{ padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Avg Study Rating</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-neon)' }}>{avgRating} / 5</span>
        </div>
        <div className="glass" style={{ padding: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Total Tasks Finished</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-blue)' }}>{totalTasks} Tasks</span>
        </div>
      </div>

      <Card title="Study Consistency 📈" icon={TrendingUp} className="mb-4">
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Hours studied per day (This Week)</p>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
          {Array.from({ length: 28 }).map((_, i) => {
            // Simplified heatmap logic: color if there is a log for today (or roughly matched)
            const logFound = logs[logs.length - 1 - i]; // Reverse chronological proxy
            let color = 'rgba(255, 255, 255, 0.05)';
            if (logFound) {
              if (logFound.rating >= 4) color = 'var(--accent-neon)';
              else if (logFound.rating === 3) color = 'rgba(16, 185, 129, 0.6)';
              else color = 'rgba(16, 185, 129, 0.3)';
            }
            
            return (
              <div key={i} style={{
                width: '12px', height: '12px', borderRadius: '3px',
                backgroundColor: color,
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} title={logFound ? `Rating: ${logFound.rating}` : `No Log`} />
            )
          })}
        </div>
      </Card>
      
    </div>
  );
};

export default Analytics;
