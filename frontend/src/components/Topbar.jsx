import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user.name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--surface)', padding: '0 0.5rem', borderRadius: '12px' }}>
            {user.role}
          </span>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
