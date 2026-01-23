import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import BuilderEditor from './Editor';
import { defaultHomeConfig, createDefaultProjectConfig } from '../../data/defaultPages';
import type { PageConfig } from '../../types/Builder';

const BuilderWrapper: React.FC = () => {
  const { pages, savePage, data } = usePortfolio();
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [currentConfig, setCurrentConfig] = useState<PageConfig | null>(null);

  // Load config when selection changes or pages update
  useEffect(() => {
    let config = pages[selectedPageId];

    if (!config) {
      if (selectedPageId === 'home') {
        config = defaultHomeConfig;
      } else if (selectedPageId.startsWith('project-')) {
        const projectId = selectedPageId.replace('project-', '');
        const project = data.projects.find(p => p.id === projectId);
        const projectName = project ? project.title : 'Unknown Project';
        config = createDefaultProjectConfig(selectedPageId, projectName);
      }
    }

    if (config) {
      setCurrentConfig(config);
    }
  }, [selectedPageId, pages, data.projects]);

  const handleSave = (newConfig: PageConfig) => {
    savePage(selectedPageId, newConfig);
    alert('Page saved!');
  };

  if (!currentConfig) return <div>Loading...</div>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', background: '#f8f9fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Editing Page:</label>
        <select
          value={selectedPageId}
          onChange={(e) => setSelectedPageId(e.target.value)}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="home">Home Page</option>
          <optgroup label="Projects">
            {data.projects.map(p => (
              <option key={p.id} value={`project-${p.id}`}>{p.title}</option>
            ))}
          </optgroup>
        </select>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <BuilderEditor
          key={selectedPageId} // Force re-mount on page change
          initialConfig={currentConfig}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default BuilderWrapper;
