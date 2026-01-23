import React from 'react';
import type { Block } from '../../../types/Builder';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Link } from 'react-router-dom';

interface BlockProps {
  block: Block;
}

export const ProjectGridBlock: React.FC<BlockProps> = ({ block }) => {
  const { data } = usePortfolio();

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    ...block.style as React.CSSProperties
  };

  return (
    <div style={gridStyle}>
      {data.projects.map((project) => (
        <div key={project.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', background: 'white' }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{project.category}</p>
            <Link
              to={`project/${project.id}`}
              style={{ display: 'inline-block', marginTop: '10px', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkillsBlock: React.FC<BlockProps> = ({ block }) => {
  const { data } = usePortfolio();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    ...block.style as React.CSSProperties
  };

  return (
    <div style={containerStyle}>
      {data.skills.map((skill, index) => (
        <div key={index} style={{
          background: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className={skill.icon}></i> {skill.name}
        </div>
      ))}
    </div>
  );
};
