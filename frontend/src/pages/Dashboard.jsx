import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Clock, ListTodo, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="page-content">Loading...</div>;

  const statCards = [
    { title: 'Total Tasks', value: stats.totalTasks, icon: <ListTodo size={24} color="var(--primary)" /> },
    { title: 'In Progress', value: stats.inProgressTasks, icon: <Clock size={24} color="var(--warning)" /> },
    { title: 'Completed', value: stats.completedTasks, icon: <CheckCircle2 size={24} color="var(--success)" /> },
    { title: 'Overdue', value: stats.overdueTasks, icon: <AlertTriangle size={24} color="var(--danger)" /> },
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((card, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--surface-light)', 
              border: '1px solid var(--border)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {card.icon}
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{card.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
