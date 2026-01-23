import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioMetadata } from '../types/Portfolio';
import { portfolioData as initialData } from '../data/placeholderData';

interface PortfolioManagerContextType {
  instances: PortfolioMetadata[];
  createInstance: (name: string) => string;
  deleteInstance: (id: string) => void;
  renameInstance: (id: string, name: string) => void;
}

const PortfolioManagerContext = createContext<PortfolioManagerContextType | undefined>(undefined);

export const usePortfolioManager = () => {
  const context = useContext(PortfolioManagerContext);
  if (!context) {
    throw new Error('usePortfolioManager must be used within a PortfolioManagerProvider');
  }
  return context;
};

export const PortfolioManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<PortfolioMetadata[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadInstances = () => {
      const savedRegistry = localStorage.getItem('portfolio_registry');
      if (savedRegistry) {
        setInstances(JSON.parse(savedRegistry));
      } else {
        // Migration Check
        const legacyData = localStorage.getItem('portfolioData');
        if (legacyData) {
          console.log('Migrating legacy portfolio data...');
          const legacyTemplate = localStorage.getItem('activeTemplate') || 'classic';
          const newId = crypto.randomUUID();
          const newMeta: PortfolioMetadata = {
            id: newId,
            name: 'My Portfolio',
            createdAt: Date.now(),
            lastModified: Date.now(),
          };

          // Save in new format
          localStorage.setItem(`portfolio_data_${newId}`, legacyData);
          localStorage.setItem(`portfolio_template_${newId}`, legacyTemplate);
          localStorage.setItem('portfolio_registry', JSON.stringify([newMeta]));

          // Cleanup legacy
          localStorage.removeItem('portfolioData');
          localStorage.removeItem('activeTemplate');

          setInstances([newMeta]);
        }
      }
      setIsInitialized(true);
    };

    loadInstances();
  }, []);

  const createInstance = (name: string) => {
    const newId = crypto.randomUUID();
    const newMeta: PortfolioMetadata = {
      id: newId,
      name,
      createdAt: Date.now(),
      lastModified: Date.now(),
    };

    const updatedInstances = [...instances, newMeta];
    setInstances(updatedInstances);
    localStorage.setItem('portfolio_registry', JSON.stringify(updatedInstances));

    // Initialize data for new instance
    localStorage.setItem(`portfolio_data_${newId}`, JSON.stringify(initialData));
    localStorage.setItem(`portfolio_template_${newId}`, 'classic');

    return newId;
  };

  const deleteInstance = (id: string) => {
    const updatedInstances = instances.filter(i => i.id !== id);
    setInstances(updatedInstances);
    localStorage.setItem('portfolio_registry', JSON.stringify(updatedInstances));

    // Cleanup data
    localStorage.removeItem(`portfolio_data_${id}`);
    localStorage.removeItem(`portfolio_template_${id}`);
  };

  const renameInstance = (id: string, name: string) => {
    const updatedInstances = instances.map(i =>
      i.id === id ? { ...i, name, lastModified: Date.now() } : i
    );
    setInstances(updatedInstances);
    localStorage.setItem('portfolio_registry', JSON.stringify(updatedInstances));
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <PortfolioManagerContext.Provider value={{ instances, createInstance, deleteInstance, renameInstance }}>
      {children}
    </PortfolioManagerContext.Provider>
  );
};
