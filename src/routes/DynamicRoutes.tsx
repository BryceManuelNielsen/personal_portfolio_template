import { usePortfolio } from '../context/PortfolioContext';
import { templates } from '../templates/registry';
import type { TemplateId } from '../templates/registry';

export const HomeRoute = () => {
  const { data, activeTemplate } = usePortfolio();

  // Safe fallback if activeTemplate is invalid
  const templateId = (activeTemplate in templates ? activeTemplate : 'classic') as TemplateId;
  const TemplateComponent = templates[templateId].Home;

  return <TemplateComponent data={data} />;
};

export const ProjectRoute = () => {
    // This needs to be dynamically imported inside the component to use hooks
    // But for cleaner architecture, we'll let the specific component handle it or pass props
    // The previous implementation of ProjectRoute in App.tsx handled the ID lookup.
    // We should move that logic here or keep it in App.tsx but using Context.
    return null;
};
