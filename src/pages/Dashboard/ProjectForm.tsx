import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types/Portfolio';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProjectForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data, addProject, updateProject } = usePortfolio();

  const [project, setProject] = useState<Project>({
    id: '',
    title: '',
    subtitle: '',
    category: '',
    thumbnail: '',
    tags: [],
    role: '',
    timeline: '',
    overview: '',
    solution: '',
    results: '',
    galleryImages: []
  });

  useEffect(() => {
    if (projectId) {
      const found = data.projects.find(p => p.id === projectId);
      if (found) setProject(found);
    } else {
        // Generate a random ID for new projects
        setProject(p => ({ ...p, id: `project-${Date.now()}` }));
    }
  }, [projectId, data.projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProject({ ...project, tags: e.target.value.split(',').map(t => t.trim()) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectId) {
      updateProject(project);
    } else {
      addProject(project);
    }
    navigate('/dashboard/projects');
  };

  return (
    <div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
         <Link to="/dashboard/projects" style={{ textDecoration: 'none', color: '#64748b' }}>&larr; Back</Link>
         <h1>{projectId ? 'Edit Project' : 'New Project'}</h1>
       </div>

       <form onSubmit={handleSubmit} className="dashboard-card">
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={project.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Subtitle (Short Description)</label>
            <input name="subtitle" value={project.subtitle} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
                <label>Category</label>
                <input name="category" value={project.category} onChange={handleChange} placeholder="e.g. Web Dev" />
            </div>
            <div className="form-group">
                <label>Timeline</label>
                <input name="timeline" value={project.timeline} onChange={handleChange} placeholder="e.g. Winter 2024" />
            </div>
          </div>

          <div className="form-group">
            <label>Thumbnail URL</label>
            <input name="thumbnail" value={project.thumbnail} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input name="tags" value={project.tags.join(', ')} onChange={handleTagsChange} />
          </div>

          <div className="form-group">
            <label>Overview</label>
            <textarea name="overview" value={project.overview} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Solution</label>
            <textarea name="solution" value={project.solution} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Results</label>
            <textarea name="results" value={project.results} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">{projectId ? 'Update Project' : 'Create Project'}</button>
       </form>
    </div>
  );
};

export default ProjectForm;
