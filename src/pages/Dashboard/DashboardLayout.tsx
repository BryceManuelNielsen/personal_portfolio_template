import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import './Dashboard.css';

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Portfolio CMS</h2>
        <nav className="dashboard-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            Edit Profile
          </NavLink>
          <NavLink to="/dashboard/projects" className={({ isActive }) => isActive ? 'active' : ''}>
            Manage Projects
          </NavLink>
          <NavLink to="/dashboard/templates" className={({ isActive }) => isActive ? 'active' : ''}>
            Template Gallery
          </NavLink>
          <NavLink to="/dashboard/generator" className={({ isActive }) => isActive ? 'active' : ''}>
            Template Generator
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
          <Link to="/" target="_blank" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            View Site <i className="fas fa-external-link-alt"></i>
          </Link>
        </div>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
