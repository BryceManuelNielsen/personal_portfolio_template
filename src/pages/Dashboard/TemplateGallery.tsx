import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { templates } from '../../templates/registry';

const TemplateGallery: React.FC = () => {
  const { activeTemplate, setTemplate } = usePortfolio();

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Template Gallery</h1>
      <p style={{ marginBottom: '30px', color: '#64748b' }}>
        Choose a design for your portfolio. This change happens immediately.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {Object.entries(templates).map(([id, t]) => (
          <div key={id} className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '200px', overflow: 'hidden', background: '#e2e8f0' }}>
               <img src={t.thumbnail} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '5px' }}>{t.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '15px' }}>{t.description}</p>

              <button
                className={`btn ${activeTemplate === id ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%' }}
                onClick={() => setTemplate(id)}
                disabled={activeTemplate === id}
              >
                {activeTemplate === id ? 'Current Active' : 'Select Theme'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
