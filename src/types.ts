export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  results: string[];
  role: string;
  timeline: string;
  featured: boolean;
  highlightColor: string;
  imageUrl?: string;
  liveUrl?: string;
  codeUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  imageUrl?: string;
  verificationUrl?: string;
  associatedProjectId?: string; // links dynamically to a Project id
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'architecture';
  proficiency: number; // 1-100
  yearsOfExp: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatarUrl: string;
}

export interface QuoteRequest {
  projectType: string;
  complexity: string;
  timeline: string;
  features: string[];
  name: string;
  email: string;
  message: string;
}
