import React from 'react';
import type { PageConfig, Block } from '../../types/Builder';
import { BlockRegistry } from '../../components/builder/registry';

interface PageRendererProps {
  config: PageConfig;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ config }) => {
  return (
    <div style={config.globalStyles as React.CSSProperties}>
      {config.blocks.map((block) => {
        const Component = BlockRegistry[block.type];
        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }
        return <Component key={block.id} block={block} />;
      })}
    </div>
  );
};
