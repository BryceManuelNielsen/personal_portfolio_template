// Defines the structure for the Visual Builder

export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'project-grid'
  | 'skills'
  | 'contact'
  | 'spacer'
  | 'container' // For grouping other blocks
  | 'custom-html';

export interface BlockStyle {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  fontSize?: string;
  fontWeight?: string;
  // Allows for any other CSS property
  [key: string]: string | undefined;
}

export interface Block {
  id: string;
  type: BlockType;
  label?: string; // User-friendly name for the layer list

  // Content Props (specific to the block type)
  content: {
    text?: string;
    title?: string;
    subtitle?: string;
    src?: string;
    alt?: string;
    items?: any[]; // For lists/skills
    html?: string; // For custom HTML block
    [key: string]: any;
  };

  // Visual Styles
  style: BlockStyle;

  // For container blocks (recursive)
  children?: Block[];
}

export interface PageConfig {
  id: string; // 'home' or 'project-{id}'
  name: string;
  blocks: Block[];
  globalStyles?: BlockStyle; // Page-level overrides
}

// "Saved Component" (User created template)
export interface SavedComponent {
  id: string;
  name: string;
  block: Block; // The root block of the saved component
}
