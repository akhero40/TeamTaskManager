import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticleNetwork from '../components/ParticleNetwork';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { email, password, name, role: 'ADMIN' }; // Defaulting to ADMIN for demo purposes
      
      const res = await axios.post(`${API_URL}${endpoint}`, payload);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        setIsLogin(true);
        setError('Registration successful. Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <ParticleNetwork>
      <div className="card" style={{ width: '400px', textAlign: 'center', zIndex: 100 }}>
        <h2 style={{ marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.5rem' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {isLogin ? 'Sign in to access your dashboard' : 'Join the Team Task Manager'}
        </p>

        {error && (
          <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </ParticleNetwork>
  );
};

export default Auth;
