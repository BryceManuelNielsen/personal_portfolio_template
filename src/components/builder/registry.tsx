import React from 'react';
import type { Block, BlockType } from '../../../types/Builder';
import { HeroBlock, TextBlock, ImageBlock, CustomHtmlBlock, ContainerBlock } from './blocks/BasicBlocks';
import { ProjectGridBlock, SkillsBlock } from './blocks/PortfolioBlocks';

// Registry of all available block components
export const BlockRegistry: Record<BlockType, React.FC<any>> = {
  'hero': HeroBlock,
  'text': TextBlock,
  'image': ImageBlock,
  'project-grid': ProjectGridBlock,
  'skills': SkillsBlock,
  'contact': TextBlock, // Placeholder
  'spacer': ({ block }) => <div style={{ height: block.style.height || '20px' }} />,
  'container': ContainerBlock,
  'custom-html': CustomHtmlBlock
};

// Default props for new blocks (for the Drag & Drop picker)
export const DefaultBlocks: Record<BlockType, Partial<Block>> = {
  'hero': {
    type: 'hero',
    label: 'Hero Section',
    content: { title: 'Welcome', subtitle: 'This is a hero section', bgImage: '' },
    style: { backgroundColor: '#1e293b', color: 'white', padding: '60px 20px', textAlign: 'center' }
  },
  'text': {
    type: 'text',
    label: 'Text Block',
    content: { text: 'Lorem ipsum dolor sit amet.', tag: 'p' },
    style: { padding: '10px' }
  },
  'image': {
    type: 'image',
    label: 'Image',
    content: { src: 'https://via.placeholder.com/800x400', alt: 'Placeholder' },
    style: { borderRadius: '8px' }
  },
  'project-grid': {
    type: 'project-grid',
    label: 'Project Grid',
    content: {},
    style: { padding: '20px' }
  },
  'skills': {
    type: 'skills',
    label: 'Skills Cloud',
    content: {},
    style: { padding: '20px' }
  },
  'contact': {
    type: 'contact',
    label: 'Contact Info',
    content: { text: 'Contact Me' },
    style: { padding: '20px', textAlign: 'center' }
  },
  'spacer': {
    type: 'spacer',
    label: 'Spacer',
    content: {},
    style: { height: '50px' }
  },
  'container': {
    type: 'container',
    label: 'Container',
    content: {},
    style: { padding: '20px', border: '1px dashed #ccc' }
  },
  'custom-html': {
    type: 'custom-html',
    label: 'Custom HTML',
    content: { html: '<div>Custom HTML Content</div>' },
    style: {}
  }
};
