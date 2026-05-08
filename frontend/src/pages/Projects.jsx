import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/projects`, { name, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-4">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Projects</h1>
      </div>

      {isAdmin && (
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Project Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ flex: 1 }}
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            style={{ flex: 2 }}
          />
          <button type="submit" className="btn btn-primary">Create Project</button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map(project => (
          <div key={project.id} className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {project.description || 'No description provided.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                {project.owner?.name}
              </span>
              <span style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', padding: '0.25rem 0.5rem', borderRadius: '4px', color: 'var(--text-main)' }}>
                {project.tasks?.length || 0} Tasks
              </span>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No projects found.</p>}
      </div>
    </div>
  );
};

export default Projects;
