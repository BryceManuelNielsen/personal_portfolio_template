import ClassicHome from './Classic/Home';
import ClassicProjectDetail from './Classic/ProjectDetail';
import ModernHome from './Modern/Home';
import ModernProjectDetail from './Modern/ProjectDetail';

export const templates = {
  classic: {
    name: 'Classic Corporate',
    description: 'A professional, detail-oriented layout perfect for engineering portfolios.',
    Home: ClassicHome,
    ProjectDetail: ClassicProjectDetail,
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
  },
  modern: {
    name: 'Modern Minimalist',
    description: 'Clean typography and generous whitespace for a contemporary look.',
    Home: ModernHome,
    ProjectDetail: ModernProjectDetail,
    thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=300&fit=crop'
  }
};

export type TemplateId = keyof typeof templates;
