import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [tasksRes, projectsRes] = await Promise.all([
        axios.get('/api/tasks', { headers }),
        axios.get('/api/projects', { headers })
      ]);
      
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      
      if (isAdmin) {
        const usersRes = await axios.get('/api/users', { headers });
        setUsers(usersRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks', { title, projectId, assigneeId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setProjectId('');
      setAssigneeId('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'TODO': return 'var(--text-muted)';
      case 'IN_PROGRESS': return 'var(--warning)';
      case 'DONE': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-4">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Tasks</h1>
      </div>

      {isAdmin && (
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            style={{ flex: 2 }}
          />
          <select value={projectId} onChange={e => setProjectId(e.target.value)} required style={{ flex: 1 }}>
            <option value="">Select Project</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} required style={{ flex: 1 }}>
            <option value="">Assign User</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
          </select>
          <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map(task => (
          <div key={task.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{task.title}</h4>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Project: {task.project?.name} | Assignee: {task.assignee?.name}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select 
                value={task.status} 
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                style={{ 
                  color: getStatusColor(task.status), 
                  fontWeight: 600, 
                  border: `1px solid ${getStatusColor(task.status)}`,
                  backgroundColor: 'var(--surface-light)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: `0 0 10px ${getStatusColor(task.status)}20`
                }}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks found.</p>}
      </div>
    </div>
  );
};

export default Tasks;
