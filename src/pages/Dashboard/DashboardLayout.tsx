import React from 'react';
import { NavLink, Outlet, Link, useParams } from 'react-router-dom';
import './Dashboard.css';

const DashboardLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Portfolio CMS</h2>
        <nav className="dashboard-nav">
          <NavLink to={`/dashboard/${id}`} end className={({ isActive }) => isActive ? 'active' : ''}>
            Overview
          </NavLink>

          <div className="nav-section-header">Content</div>
          <NavLink to={`/dashboard/${id}/profile`} className={({ isActive }) => isActive ? 'active' : ''}>
            Edit Profile
          </NavLink>
          <NavLink to={`/dashboard/${id}/projects`} className={({ isActive }) => isActive ? 'active' : ''}>
            Manage Projects
          </NavLink>

          <div className="nav-section-header">Design</div>
          <NavLink to={`/dashboard/${id}/builder`} className={({ isActive }) => isActive ? 'active' : ''}>
            Page Builder <span className="beta-tag">New</span>
          </NavLink>
          <NavLink to={`/dashboard/${id}/components`} className={({ isActive }) => isActive ? 'active' : ''}>
            Component Library
          </NavLink>
          <NavLink to={`/dashboard/${id}/templates`} className={({ isActive }) => isActive ? 'active' : ''}>
            Theme Gallery
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
          <Link to={`/p/${id}`} target="_blank" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
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
