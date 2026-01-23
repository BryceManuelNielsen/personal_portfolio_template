export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // FontAwesome class, e.g., "fab fa-github"
}

export interface Skill {
  name: string;
  icon: string; // FontAwesome class
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string; // e.g. "Software / SolidWorks"
  thumbnail: string;
  tags: string[]; // For the "Tools Used" section
  role: string;
  timeline: string;
  demoLink?: string;
  repoLink?: string;

  // Content Sections
  overview: string;
  challenges?: string[]; // List of constraints/challenges
  solution: string; // Main text describing the solution
  solutionSteps?: { title: string; description: string }[]; // Optional detailed steps
  results: string; // Text for results
  stats?: ProjectStat[]; // Optional stats boxes

  // Gallery
  galleryImages: { url: string; caption: string }[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[]; // Array of paragraphs
  avatar: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

export interface PortfolioMetadata {
  id: string;
  name: string;
  createdAt: number;
  lastModified: number;
}
