import React from 'react';
import { Link } from 'react-router-dom';
import type { PortfolioData } from '../../types/Portfolio';
import './Modern.css';

interface Props {
  data: PortfolioData;
}

const ModernHome: React.FC<Props> = ({ data }) => {
  const { profile, skills, projects } = data;

  return (
    <div className="modern-template">
      <header className="modern-header">
        <div className="modern-logo">{profile.name}</div>
        <nav className="modern-nav">
          <ul>
            <li><a href="#projects">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="modern-hero">
        <h1>{profile.tagline}</h1>
        <p>{profile.about[0]}</p>
      </section>

      <section id="projects" className="modern-grid">
        {projects.map((project) => (
          <Link to={`project/${project.id}`} key={project.id} className="modern-card">
            <img src={project.thumbnail} alt={project.title} className="modern-card-img" />
            <h3>{project.title}</h3>
            <p>{project.category} — {project.timeline}</p>
          </Link>
        ))}
      </section>

      <section id="about" className="modern-skills">
        <h2>Expertise</h2>
        <div className="modern-tags">
          {skills.map((skill, index) => (
            <span key={index} className="modern-tag">{skill.name}</span>
          ))}
        </div>
      </section>

      <footer id="contact" className="modern-footer">
        <div className="modern-social">
          {profile.socialLinks.map((link, index) => (
            <a href={link.url} key={index} target="_blank" rel="noopener noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </div>
  );
};

export default ModernHome;
