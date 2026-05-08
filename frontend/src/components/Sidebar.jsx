import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span style={{ color: 'var(--primary)' }}>Team</span>Task
      </div>
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FolderKanban size={20} />
          Projects
        </NavLink>
        <NavLink to="/tasks" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare size={20} />
          Tasks
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
