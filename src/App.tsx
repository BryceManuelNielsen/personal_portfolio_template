import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { templates } from './templates/registry';
import type { TemplateId } from './templates/registry';

// Dashboard Components
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import ProfileEditor from './pages/Dashboard/ProfileEditor';
import ProjectsList from './pages/Dashboard/ProjectsList';
import ProjectForm from './pages/Dashboard/ProjectForm';
import TemplateGallery from './pages/Dashboard/TemplateGallery';
import TemplateGenerator from './pages/Dashboard/TemplateGenerator';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Dynamic Home Route
const HomeRoute = () => {
  const { data, activeTemplate } = usePortfolio();
  const templateId = (activeTemplate in templates ? activeTemplate : 'classic') as TemplateId;
  const TemplateComponent = templates[templateId].Home;
  return <TemplateComponent data={data} />;
};

// Dynamic Project Route
const ProjectRoute = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, activeTemplate } = usePortfolio();

  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Project not found</h2>
        <a href="/">Return Home</a>
      </div>
    );
  }

  const templateId = (activeTemplate in templates ? activeTemplate : 'classic') as TemplateId;
  const TemplateComponent = templates[templateId].ProjectDetail;

  return <TemplateComponent project={project} profile={data.profile} />;
};

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Portfolio Routes */}
          <Route path="/" element={<HomeRoute />} />
          <Route path="/project/:projectId" element={<ProjectRoute />} />

          {/* CMS / Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div style={{ padding: '20px' }}><h1>Welcome to your CMS</h1><p>Select an option from the sidebar to start editing.</p></div>} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:projectId" element={<ProjectForm />} />
            <Route path="templates" element={<TemplateGallery />} />
            <Route path="generator" element={<TemplateGenerator />} />
          </Route>

        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
