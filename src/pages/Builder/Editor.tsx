import React, { useState } from 'react';
import type { PageConfig, Block, BlockType } from '../../types/Builder';
import { DefaultBlocks } from '../../components/builder/registry';
import { PageRenderer } from '../../components/builder/PageRenderer';

interface BuilderEditorProps {
  initialConfig: PageConfig;
  onSave: (config: PageConfig) => void;
}

const BuilderEditor: React.FC<BuilderEditorProps> = ({ initialConfig, onSave }) => {
  const [config, setConfig] = useState<PageConfig>(initialConfig);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // --- Actions ---

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      ...DefaultBlocks[type] as any, // Clone default props
      content: { ...DefaultBlocks[type]?.content }, // Deep clone content
      style: { ...DefaultBlocks[type]?.style }      // Deep clone style
    };

    setConfig(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  const removeBlock = (id: string) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== id)
    }));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...config.blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setConfig(prev => ({ ...prev, blocks: newBlocks }));
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const updateBlockStyle = (id: string, styleKey: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? {
        ...b,
        style: { ...b.style, [styleKey]: value }
      } : b)
    }));
  };

  const updateBlockContent = (id: string, contentKey: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? {
        ...b,
        content: { ...b.content, [contentKey]: value }
      } : b)
    }));
  };

  const selectedBlock = config.blocks.find(b => b.id === selectedBlockId);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>

      {/* --- Left Sidebar: Structure & Tools --- */}
      <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '15px', overflowY: 'auto', background: '#f8f9fa' }}>
        <h3>Page Structure</h3>
        <div style={{ marginBottom: '20px' }}>
          {config.blocks.map((block, index) => (
            <div
              key={block.id}
              onClick={() => setSelectedBlockId(block.id)}
              style={{
                padding: '10px',
                margin: '5px 0',
                background: selectedBlockId === block.id ? '#e2e8f0' : 'white',
                border: selectedBlockId === block.id ? '1px solid #3182ce' : '1px solid #eee',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{block.label || block.type}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }} disabled={index === 0}>↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }} disabled={index === config.blocks.length - 1}>↓</button>
                <button onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} style={{ color: 'red' }}>×</button>
              </div>
            </div>
          ))}
        </div>

        <h3>Add Block</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {Object.keys(DefaultBlocks).map(type => (
            <button
              key={type}
              onClick={() => addBlock(type as BlockType)}
              style={{ padding: '8px', cursor: 'pointer', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {DefaultBlocks[type as BlockType].label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onSave(config)}
          style={{ marginTop: '20px', width: '100%', padding: '10px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Save Page
        </button>
      </div>

      {/* --- Center: Canvas --- */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', padding: '20px' }}>
        <div style={{ border: '1px dashed #ccc', minHeight: '100%' }}>
          <PageRenderer config={config} />
        </div>
      </div>

      {/* --- Right Sidebar: Properties --- */}
      <div style={{ width: '300px', borderLeft: '1px solid #ddd', padding: '15px', overflowY: 'auto', background: '#f8f9fa' }}>
        {selectedBlock ? (
          <>
            <h3>Edit Block: {selectedBlock.label}</h3>

            <div style={{ marginBottom: '20px' }}>
              <h4>Content</h4>
              {Object.keys(selectedBlock.content).map(key => (
                <div key={key} style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>{key}</label>
                  {key === 'text' || key === 'html' ? (
                     <textarea
                       value={selectedBlock.content[key]}
                       onChange={(e) => updateBlockContent(selectedBlock.id, key, e.target.value)}
                       style={{ width: '100%', minHeight: '80px' }}
                     />
                  ) : (
                    <input
                      type="text"
                      value={selectedBlock.content[key]}
                      onChange={(e) => updateBlockContent(selectedBlock.id, key, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4>Styles</h4>
              {['backgroundColor', 'color', 'padding', 'margin', 'textAlign', 'fontSize', 'height', 'width', 'borderRadius'].map(styleKey => (
                <div key={styleKey} style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>{styleKey}</label>
                  <input
                    type="text"
                    value={selectedBlock.style[styleKey] || ''}
                    onChange={(e) => updateBlockStyle(selectedBlock.id, styleKey, e.target.value)}
                    style={{ width: '100%' }}
                    placeholder="e.g. 20px or #fff"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>Select a block to edit its properties.</p>
        )}
      </div>

    </div>
  );
};

export default BuilderEditor;
