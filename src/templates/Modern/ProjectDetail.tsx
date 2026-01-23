import React from 'react';
import { Link } from 'react-router-dom';
import type { Project, Profile } from '../../types/Portfolio';
import './Modern.css';

interface Props {
  project: Project;
  profile: Profile;
}

const ModernProjectDetail: React.FC<Props> = ({ project, profile }) => {
  return (
    <div className="modern-template">
      <header className="modern-header">
        <div className="modern-logo"><Link to="/">{profile.name}</Link></div>
      </header>

      <main style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>{project.title}</h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '3rem' }}>{project.subtitle}</p>

        <img src={project.thumbnail} alt={project.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '3rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.5rem' }}>Role</h4>
              <p>{project.role}</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.5rem' }}>Timeline</h4>
              <p>{project.timeline}</p>
            </div>
             <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.5rem' }}>Stack</h4>
              <p>{project.tags.join(', ')}</p>
            </div>
          </div>

          <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h3>
            <p style={{ marginBottom: '2rem' }}>{project.overview}</p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Solution</h3>
            <p style={{ marginBottom: '2rem' }}>{project.solution}</p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Results</h3>
            <p>{project.results}</p>
          </div>
        </div>

        {project.galleryImages && project.galleryImages.length > 0 && (
           <div style={{ display: 'grid', gap: '2rem' }}>
              {project.galleryImages.map((img, i) => (
                <img key={i} src={img.url} alt={img.caption} style={{ width: '100%', borderRadius: '8px' }} />
              ))}
           </div>
        )}

      </main>

      <footer className="modern-footer">
        <Link to="/" style={{ borderBottom: '2px solid black', fontWeight: 600 }}>Back to Home</Link>
      </footer>
    </div>
  );
};

export default ModernProjectDetail;
