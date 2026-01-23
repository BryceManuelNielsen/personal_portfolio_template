import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ClassicHome from './templates/Classic/Home';
import ClassicProjectDetail from './templates/Classic/ProjectDetail';
import { portfolioData } from './data/placeholderData';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper to find project by ID
const ProjectRoute = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = portfolioData.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Project not found</h2>
        <a href="/">Return Home</a>
      </div>
    );
  }

  return <ClassicProjectDetail project={project} profile={portfolioData.profile} />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ClassicHome data={portfolioData} />} />
        <Route path="/project/:projectId" element={<ProjectRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
