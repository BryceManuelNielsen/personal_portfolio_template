import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioData, Profile, Project, Skill } from '../types/Portfolio';
import { portfolioData as initialData } from '../data/placeholderData';

interface PortfolioContextType {
  data: PortfolioData;
  activeTemplate: string;
  updateProfile: (profile: Profile) => void;
  updateSkills: (skills: Skill[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  setTemplate: (templateId: string) => void;
  resetData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
  instanceId: string;
}

export const PortfolioProvider: React.FC<ProviderProps> = ({ children, instanceId }) => {
  const dataKey = `portfolio_data_${instanceId}`;
  const templateKey = `portfolio_template_${instanceId}`;

  // Load initial state from local storage or fallback to placeholder
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(dataKey);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [activeTemplate, setActiveTemplate] = useState<string>(() => {
    return localStorage.getItem(templateKey) || 'classic';
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(dataKey, JSON.stringify(data));
  }, [data, dataKey]);

  useEffect(() => {
    localStorage.setItem(templateKey, activeTemplate);
  }, [activeTemplate, templateKey]);

  const updateProfile = (profile: Profile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const updateSkills = (skills: Skill[]) => {
    setData(prev => ({ ...prev, skills }));
  };

  const addProject = (project: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
  };

  const updateProject = (updatedProject: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    }));
  };

  const deleteProject = (projectId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const setTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
  };

  const resetData = () => {
      setData(initialData);
      setActiveTemplate('classic');
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      activeTemplate,
      updateProfile,
      updateSkills,
      addProject,
      updateProject,
      deleteProject,
      setTemplate,
      resetData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
