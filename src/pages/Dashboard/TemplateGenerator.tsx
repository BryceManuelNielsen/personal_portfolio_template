import React, { useState } from 'react';

const TemplateGenerator: React.FC = () => {
  const [name, setName] = useState('MyNewTheme');

  const cssBoilerplate = `/* ${name}.css */
.theme-${name.toLowerCase()} {
  font-family: sans-serif;
  color: #333;
}
`;

  const componentBoilerplate = `// ${name}Home.tsx
import React from 'react';
import { PortfolioData } from '../../types/Portfolio';
import './${name}.css';

interface Props {
  data: PortfolioData;
}

const ${name}Home: React.FC<Props> = ({ data }) => {
  return (
    <div className="theme-${name.toLowerCase()}">
      <h1>{data.profile.name}</h1>
      <p>{data.profile.tagline}</p>
      {/* Add your custom layout here */}
    </div>
  );
};

export default ${name}Home;
`;

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Template Generator</h1>
      <p style={{ marginBottom: '30px', color: '#64748b' }}>
        Want to build your own design? Give it a name, and we'll generate the starter code for you.
      </p>

      <div className="dashboard-card">
        <div className="form-group">
          <label>Theme Name (PascalCase)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DarkFuturistic"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>1. Create CSS File</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px' }}>src/templates/{name}/{name}.css</p>
          <textarea
            readOnly
            value={cssBoilerplate}
            style={{ width: '100%', height: '300px', fontFamily: 'monospace', padding: '10px', background: '#1e293b', color: '#a5b4fc', border: 'none', borderRadius: '4px' }}
          />
        </div>
        <div>
          <h3>2. Create Component File</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px' }}>src/templates/{name}/Home.tsx</p>
          <textarea
            readOnly
            value={componentBoilerplate}
            style={{ width: '100%', height: '300px', fontFamily: 'monospace', padding: '10px', background: '#1e293b', color: '#a5b4fc', border: 'none', borderRadius: '4px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;
