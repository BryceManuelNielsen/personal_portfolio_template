import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Link } from 'react-router-dom';

const ProjectsList: React.FC = () => {
  const { data, deleteProject } = usePortfolio();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Manage Projects</h1>
        <Link to="/dashboard/projects/new" className="btn btn-primary">+ Add New Project</Link>
      </div>

      <div className="dashboard-card" style={{ padding: 0 }}>
        {data.projects.map(project => (
          <div key={project.id} className="project-list-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={project.thumbnail} alt="" style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: 0 }}>{project.title}</h4>
                <small style={{ color: '#64748b' }}>{project.category}</small>
              </div>
            </div>
            <div className="flex-row">
              <Link to={`/dashboard/projects/edit/${project.id}`} className="btn btn-secondary" style={{ fontSize: '0.9rem', textDecoration: 'none' }}>Edit</Link>
              <button className="btn btn-danger" onClick={() => handleDelete(project.id)} style={{ fontSize: '0.9rem' }}>Delete</button>
            </div>
          </div>
        ))}
        {data.projects.length === 0 && (
           <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
             No projects found. Create one to get started!
           </div>
        )}
      </div>
    </div>
  );
};

export const ProjectEditor: React.FC = () => {
   // This is a simplified editor for the demo
   // Ideally this would be a large form with all fields
   usePortfolio();
   // Logic to handle Add vs Edit would go here...

   return (
     <div>
       <h1>Project Editor</h1>
       <p>For this MVP, please use the generic placeholder data or implement the full form.</p>
       <Link to="/dashboard/projects">Back to List</Link>
     </div>
   );
};

export default ProjectsList;
