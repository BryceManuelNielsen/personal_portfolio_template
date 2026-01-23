import React from 'react';
import { Link } from 'react-router-dom';
import type { PortfolioData } from '../../types/Portfolio';
import './Classic.css';

interface Props {
  data: PortfolioData;
}

const ClassicHome: React.FC<Props> = ({ data }) => {
  const { profile, skills, projects } = data;

  return (
    <div className="classic-template">
      <nav>
        <h1 className="basic_text">{profile.name}</h1>
        <ul className="nav-links">
          <li><a href="#about">About Me</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
          {/* Resume link removed as per request to clean up */}
        </ul>
      </nav>

      <header className="hero" style={{ background: `linear-gradient(rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1350&q=80')`, backgroundSize: 'cover' }}>
        <h1 className="basic_text">Hi, I'm {profile.name.split(' ')[0]}</h1>
        <p className="basic_text">{profile.tagline}</p>
      </header>

      <section id="about" className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-flex-container">
          <div className="about-photo">
            <img src={profile.avatar} alt={`${profile.name} Photo`} />
          </div>

          <div className="about-text">
            {profile.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="container">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <img src={project.thumbnail} alt={project.title} className="project-img" />
              <div className="project-content">
                <span className="project-tag">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <Link to={`project/${project.id}`} className="details-link">
                  View Project Details <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="container">
        <h2 className="section-title">Technical Stack</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-badge" key={index}>
              <i className={skill.icon}></i> {skill.name}
            </div>
          ))}
        </div>
      </section>

      <footer id="contact">
        <h3>Let's Connect</h3>
        <p>Open for collaborations and engineering opportunities.</p>
        <div className="social-links">
          {profile.socialLinks.map((link, index) => (
            <a href={link.url} key={index} target="_blank" rel="noopener noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} {profile.name}. Engineering Portfolio Template.</p>
      </footer>
    </div>
  );
};

export default ClassicHome;
