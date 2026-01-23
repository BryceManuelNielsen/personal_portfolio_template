import React from 'react';
import type { Block } from '../../../types/Builder';

interface BlockProps {
  block: Block;
}

export const HeroBlock: React.FC<BlockProps> = ({ block }) => {
  const { title, subtitle, bgImage } = block.content;

  const combinedStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '300px',
    padding: '40px 20px',
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: bgImage ? 'white' : 'inherit',
    ...block.style as React.CSSProperties
  };

  return (
    <div style={combinedStyle}>
      {title && <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{title}</h1>}
      {subtitle && <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{subtitle}</p>}
    </div>
  );
};

export const TextBlock: React.FC<BlockProps> = ({ block }) => {
  const { text, tag = 'p' } = block.content;
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag style={{ ...block.style as React.CSSProperties }}>
      {text}
    </Tag>
  );
};

export const ImageBlock: React.FC<BlockProps> = ({ block }) => {
  const { src, alt } = block.content;

  return (
    <img
      src={src}
      alt={alt || ''}
      style={{ maxWidth: '100%', height: 'auto', ...block.style as React.CSSProperties }}
    />
  );
};

export const CustomHtmlBlock: React.FC<BlockProps> = ({ block }) => {
  const { html } = block.content;
  return (
    <div
      style={block.style as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  );
};

// Container for nesting
export const ContainerBlock: React.FC<BlockProps & { children: React.ReactNode }> = ({ block, children }) => {
  return (
    <div style={{ ...block.style as React.CSSProperties }}>
      {children}
    </div>
  );
};
