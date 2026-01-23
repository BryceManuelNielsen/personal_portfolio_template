import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioData, Profile, Project, Skill } from '../types/Portfolio';
import type { PageConfig } from '../types/Builder';
import { portfolioData as initialData } from '../data/placeholderData';
import { defaultHomeConfig } from '../data/defaultPages';

interface PortfolioContextType {
  data: PortfolioData;
  pages: Record<string, PageConfig>;
  activeTemplate: string;
  updateProfile: (profile: Profile) => void;
  updateSkills: (skills: Skill[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  setTemplate: (templateId: string) => void;
  savePage: (pageId: string, config: PageConfig) => void;
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
  const pagesKey = `portfolio_pages_${instanceId}`;

  // Load initial state from local storage
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(dataKey);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [activeTemplate, setActiveTemplate] = useState<string>(() => {
    return localStorage.getItem(templateKey) || 'classic';
  });

  const [pages, setPages] = useState<Record<string, PageConfig>>(() => {
    const saved = localStorage.getItem(pagesKey);
    if (saved) {
      return JSON.parse(saved);
    }
    // Initial pages: Home
    return {
      'home': defaultHomeConfig
    };
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(dataKey, JSON.stringify(data));
  }, [data, dataKey]);

  useEffect(() => {
    localStorage.setItem(templateKey, activeTemplate);
  }, [activeTemplate, templateKey]);

  useEffect(() => {
    localStorage.setItem(pagesKey, JSON.stringify(pages));
  }, [pages, pagesKey]);

  const updateProfile = (profile: Profile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const updateSkills = (skills: Skill[]) => {
    setData(prev => ({ ...prev, skills }));
  };

  const addProject = (project: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, project] }));

    // Also initialize a default page config for this project?
    // For now, we rely on the generic template, but we could create a 'project-{id}' page here.
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

  const savePage = (pageId: string, config: PageConfig) => {
    setPages(prev => ({ ...prev, [pageId]: config }));
  };

  const resetData = () => {
      setData(initialData);
      setActiveTemplate('classic');
      setPages({ 'home': defaultHomeConfig });
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      pages,
      activeTemplate,
      updateProfile,
      updateSkills,
      addProject,
      updateProject,
      deleteProject,
      setTemplate,
      savePage,
      resetData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
