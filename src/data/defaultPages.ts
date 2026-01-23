// Default layout for the "Classic" template, but represented as Blocks
// This allows migration from fixed template to editable blocks.
import type { PageConfig, Block } from '../types/Builder';

export const defaultHomeConfig: PageConfig = {
  id: 'home',
  name: 'Home Page',
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      label: 'Main Hero',
      content: {
        title: 'Welcome to My Portfolio',
        subtitle: 'Building digital products that solve real-world problems.'
      },
      style: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }
    },
    {
      id: 'text-1',
      type: 'text',
      label: 'About Title',
      content: { text: 'About Me', tag: 'h2' },
      style: { textAlign: 'center', margin: '40px 0 20px', fontSize: '2rem' }
    },
    {
      id: 'text-2',
      type: 'text',
      label: 'About Description',
      content: { text: 'I am a passionate engineer with a focus on web technologies...' },
      style: { maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }
    },
    {
      id: 'spacer-1',
      type: 'spacer',
      content: {},
      style: { height: '40px' }
    },
    {
      id: 'text-3',
      type: 'text',
      label: 'Projects Title',
      content: { text: 'My Projects', tag: 'h2' },
      style: { textAlign: 'center', margin: '0 0 40px', fontSize: '2rem' }
    },
    {
      id: 'projects-1',
      type: 'project-grid',
      label: 'Project Grid',
      content: {},
      style: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }
    },
    {
      id: 'spacer-2',
      type: 'spacer',
      content: {},
      style: { height: '60px' }
    },
    {
      id: 'text-4',
      type: 'text',
      label: 'Skills Title',
      content: { text: 'Technical Skills', tag: 'h2' },
      style: { textAlign: 'center', margin: '0 0 30px', fontSize: '2rem' }
    },
    {
      id: 'skills-1',
      type: 'skills',
      label: 'Skills Cloud',
      content: {},
      style: { maxWidth: '1000px', margin: '0 auto' }
    }
  ]
};

export const createDefaultProjectConfig = (id: string, name: string): PageConfig => ({
  id,
  name,
  blocks: [
    {
      id: crypto.randomUUID(),
      type: 'hero',
      label: 'Project Hero',
      content: { title: name, subtitle: 'Project Details', bgImage: '' },
      style: { backgroundColor: '#3182ce', color: 'white', padding: '60px 20px', textAlign: 'center' }
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'Description',
      content: { text: 'Add project details here...', tag: 'p' },
      style: { padding: '20px', maxWidth: '800px', margin: '0 auto' }
    }
  ]
});
