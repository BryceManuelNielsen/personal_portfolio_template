import React from 'react';
import { Link } from 'react-router-dom';
import type { Project, Profile } from '../../types/Portfolio';
import './Classic.css';

interface Props {
  project: Project;
  profile: Profile;
}

const ClassicProjectDetail: React.FC<Props> = ({ project, profile }) => {
  return (
    <div className="classic-template">
      <nav>
        <h1 className="basic_text">
          <Link to=".." style={{ color: 'inherit', textDecoration: 'none' }}>{profile.name}</Link>
        </h1>
        <ul className="nav-links">
          <li><Link to="../#projects">Back to Projects</Link></li>
          <li><Link to="../#contact">Hire Me</Link></li>
        </ul>
      </nav>

      <header className="project-header">
        <div>
          <h1>{project.title}</h1>
          <p className="subtitle">{project.subtitle}</p>
        </div>
      </header>

      <main className="content-wrapper">

        <aside className="project-sidebar">
          <div className="sidebar-block">
            <h4>Role</h4>
            <p>{project.role}</p>
          </div>
          <div className="sidebar-block">
            <h4>Timeline</h4>
            <p>{project.timeline}</p>
          </div>
          <div className="sidebar-block">
            <h4>Tools Used</h4>
            <div className="tool-tags">
              {project.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-block">
            {project.demoLink && (
              <a href={project.demoLink} className="btn primary full-width" style={{display: 'block', textAlign: 'center', marginBottom: '10px', padding: '10px', background: 'var(--primary-color)', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
                Live Demo <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {project.repoLink && (
              <a href={project.repoLink} className="btn secondary full-width" style={{display: 'block', textAlign: 'center', padding: '10px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', textDecoration: 'none', borderRadius: '5px'}}>
                <i className="fab fa-github"></i> Source Code
              </a>
            )}
          </div>
        </aside>

        <article className="project-main-content">
          <Link to=".." className="back-link"><i className="fas fa-chevron-left"></i> Back to Home</Link>

          <section className="text-block">
            <h2>Project Overview</h2>
            <p>{project.overview}</p>

            {project.challenges && project.challenges.length > 0 && (
              <>
                <h3>Key Constraints & Requirements</h3>
                <ul>
                  {project.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="text-block">
            <h2>The Solution</h2>
            <p>{project.solution}</p>
            {project.solutionSteps && (
              <ol>
                {project.solutionSteps.map((step, i) => (
                  <li key={i}>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {project.galleryImages && project.galleryImages.length > 0 && (
            <section className="image-gallery">
              {project.galleryImages.map((img, i) => (
                <div className="gallery-item" key={i}>
                  <img src={img.url} alt={img.caption} />
                  <p className="caption">{img.caption}</p>
                </div>
              ))}
            </section>
          )}

          <section className="text-block">
            <h2>Results & Impact</h2>
            {project.stats && (
              <div className="impact-stats">
                {project.stats.map((stat, i) => (
                  <div className="stat-item" key={i}>
                    <span className="stat-num">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
            <p>{project.results}</p>
          </section>
        </article>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} {profile.name}. Engineering Portfolio Template.</p>
      </footer>
    </div>
  );
};

export default ClassicProjectDetail;
