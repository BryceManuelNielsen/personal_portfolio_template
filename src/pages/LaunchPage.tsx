import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioManager } from '../context/PortfolioManagerContext';
import './LaunchPage.css';

const LaunchPage: React.FC = () => {
  const { instances, createInstance, deleteInstance, renameInstance } = usePortfolioManager();
  const navigate = useNavigate();

  const handleCreate = () => {
    const name = window.prompt("Enter a name for your new portfolio:");
    if (name && name.trim()) {
      const id = createInstance(name.trim());
      navigate(`/dashboard/${id}`);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      deleteInstance(id);
    }
  };

  const handleRename = (id: string, currentName: string) => {
    const newName = window.prompt("Enter new name:", currentName);
    if (newName && newName.trim() && newName !== currentName) {
      renameInstance(id, newName.trim());
    }
  };

  return (
    <div className="launch-container">
      <div className="launch-header">
        <h1>My Portfolios</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="fas fa-plus"></i> Create New
        </button>
      </div>

      <div className="launch-grid">
        {/* Create New Card */}
        <div className="portfolio-card create-card" onClick={handleCreate}>
          <div className="card-preview">
            <i className="fas fa-plus"></i>
          </div>
          <div className="card-content create-content">
            <h3 className="card-title">Create New Portfolio</h3>
            <p className="card-meta">Start from scratch with a new design</p>
          </div>
        </div>

        {/* Instance Cards */}
        {instances.map((instance) => (
          <div key={instance.id} className="portfolio-card">
            <div className="card-preview">
              <i className="fas fa-layer-group"></i>
            </div>
            <div className="card-content">
              <h3 className="card-title">
                {instance.name}
                <button
                  className="btn-icon"
                  onClick={(e) => { e.stopPropagation(); handleRename(instance.id, instance.name); }}
                  title="Rename"
                  style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}
                >
                  <i className="fas fa-pen" style={{ fontSize: '0.8rem' }}></i>
                </button>
              </h3>
              <p className="card-meta">
                Created: {new Date(instance.createdAt).toLocaleDateString()}
              </p>

              <div className="card-actions">
                <button className="btn btn-secondary" onClick={() => navigate(`/p/${instance.id}`)}>
                  <i className="fas fa-eye"></i> View
                </button>
                <button className="btn btn-primary" onClick={() => navigate(`/dashboard/${instance.id}`)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(instance.id, instance.name)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchPage;
